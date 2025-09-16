import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { FateOsClient } from '@/db/prisma';
import { stripe } from '@/db/stripe';
import { generatePaymentConfirmationEmail } from '../graphql/src/helper/emialTemplatte';
import { UseSendEmail } from '../graphql/src/helper/sendMail';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

// Register webhook endpoint (only in production)
const registerHook = async () => {
  try {
    // Fetch all event destinations (webhooks)
    const existingHooks = await stripe.v2.core.eventDestinations.list();

    // Check if a webhook with the same URL already exists
    existingHooks.data.map((e) => console.log(e.webhook_endpoint));

    if (existingHooks.data.length > 0) {
      console.log('Webhook already exists. Skipping creation.');
      return;
    }

    await stripe.v2.core.eventDestinations.create({
      name: 'FateOS',
      description: 'FateOS webhooks',
      type: 'webhook_endpoint',
      event_payload: 'snapshot',
      enabled_events: ['checkout.session.completed'],
      webhook_endpoint: {
        url: `${process.env.SERVER_URL}/api/webhook/`,
      },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

if (process.env?.NODE_ENV?.toLowerCase() === 'production') {
  registerHook();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();

    const sig = req.headers.get('stripe-signature');

    if (!sig) {
      return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Handle checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Handle payment mode (one-time payments) - this matches the payment.ts resolver
      if (session.mode === 'payment' && session.customer_email) {
        const metadata = session.metadata;
        const userId = metadata?.user_id;
        const years = metadata?.years ? parseInt(metadata.years) : 0;
        const shine = metadata?.shine === 'shine';

        if (!userId) {
          console.error('Missing user_id in session metadata');
          return NextResponse.json({ received: true });
        }

        // Find the user
        const user = await FateOsClient.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
          },
        });

        if (!user) {
          console.error('User not found:', userId);
          return NextResponse.json({ received: true });
        }

        // Check if payment history already exists for this session (to prevent duplicates)
        const existingHistory = await FateOsClient.payment_history.findFirst({
          where: {
            stripe_session_id: session.id,
          },
        });

        let paymentHistory;

        if (!existingHistory) {
          // Create payment history record only if it doesn't exist
          paymentHistory = await FateOsClient.payment_history.create({
            data: {
              user_id: userId,
              paid_amount: session.amount_total ? session.amount_total / 100 : 0,
              year_count: years,
              stripe_session_id: session.id,
            },
          });

          if (!paymentHistory) {
            console.error('Failed to create payment history');
            return NextResponse.json({ received: true });
          }
        } else {
          paymentHistory = existingHistory;
        }

        // Get payment intent details for receipt
        let receiptUrl = '';
        let recipientName = '';

        if (session.payment_intent) {
          try {
            const paymentIntent = await stripe.paymentIntents.retrieve(
              session.payment_intent as string
            );

            if (paymentIntent.latest_charge) {
              const charge = await stripe.charges.retrieve(paymentIntent.latest_charge as string);
              receiptUrl = charge.receipt_url || '';
              recipientName = charge.billing_details.name || '';
            }
          } catch (error) {
            console.error('Error retrieving payment details:', error);
          }
        }

        // Send confirmation email
        try {
          await UseSendEmail({
            email: user.email,
            message: 'Payment completed successfully',
            subject: 'Payment Confirmation - FateOS',
            template: generatePaymentConfirmationEmail({
              hosted_invoice_url: receiptUrl,
              recipientName: recipientName || `${user.first_name} ${user.last_name}`,
              payment_plan: shine ? 'Change Fate (60 years)' : `${years} years`,
              paymentAmount: session.amount_total
                ? `$${(session.amount_total / 100).toFixed(2)}`
                : undefined,
              paymentDate: new Date().toLocaleDateString(),
            }),
          });
        } catch (emailError) {
          console.error('Error sending confirmation email:', emailError);
        }

        console.log('Payment processed successfully for user:', userId);
      }
    }

    // Note: Subscription-related events (invoice.payment_succeeded, invoice.payment_failed)
    // are not handled as the current schema only supports one-time payments via payment_history table

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
