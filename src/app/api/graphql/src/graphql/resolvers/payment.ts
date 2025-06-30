import { AppContext } from '../../types';
import { GraphQLError } from 'graphql';
import { SessionArg, VerifyPaymentArg } from '../../types/req';
import { FateOsClient } from '@/db/prisma';
import { stripe } from '@/db/stripe';
import { CONFIG } from '@/config-global';

const YOUR_DOMAIN = CONFIG.site.assetURL;

const acceptedCurrency = ['usd'];

/**
 * ** Create stripe session for purchase **
 */
const createSessionForSubscription = async (_: any, arg: SessionArg, cont: AppContext) => {
  try {
    const { years } = arg;

    if (!cont.account?.account) {
      return {
        success: false,
        message: 'Unable to find user, try again',
      };
    }
    const findCurrentUser = await FateOsClient.user.findUnique({
      where: { id: cont.account?.account.id },
    });

    if (!findCurrentUser) {
      return {
        success: false,
        message: 'Unable to find user, try again',
      };
    }

    // const subResult = await FateOsClient.subscriptions.findUnique({
    //   select: {
    //     id: true,
    //     usd_amount: true,
    //     gbp_amount: true,
    //     subscription_plan: true,
    //     created_at: true,
    //     subscription_name: true,
    //   },
    //   where: { id: subscriptionId },
    // });

    // if (!subResult) {
    //   return {
    //     success: false,
    //     message: "Unable to find subscription",
    //   };
    // }

    const priceId = await stripe.prices.create({
      currency: 'usd',
      unit_amount: years * 100 * 100,
      product_data: { name: `${years} years` },
    });

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price: priceId.id,
          quantity: 1,
        },
      ],

      mode: 'payment',
      return_url: `${YOUR_DOMAIN}/payment/success/?session_id={CHECKOUT_SESSION_ID}`,
      customer_email: cont.account?.account.email,
      metadata: {
        user_id: cont?.account?.account.id,
        session_id: '{CHECKOUT_SESSION_ID}',
      },
    });
    return {
      success: true,
      message: 'Getting lifetime subscription successfully',
      result: session.client_secret,
    };

    // // Update with Stripe session and subscription IDs
    // await FateOsClient.purchased_subscription.update({
    //   where: { id: findCurrentUser.purchased_subscription?.id },
    //   data: {
    //     session_id: session.id,
    //     subscription_status: "pending",
    //   },
    // });
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

const verifyPaymentBySession = async (_: any, arg: VerifyPaymentArg, cont: AppContext) => {
  try {
    const { sessionId } = arg;

    if (!cont.account?.account) {
      return {
        success: false,
        message: 'Unable to find user, try again',
      };
    }
    if (!sessionId) {
      return {
        success: false,
        message: 'Session is required',
      };
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent'],
    });

    return {
      success: true,
      message: 'Getting payment status',
      result: {
        status: session.payment_status,
        amount: session?.amount_total ? session?.amount_total / 100 : 0,
        currency: session.currency,
      },
    };
  } catch (error: any) {
    console.log(error);
    throw new GraphQLError(error.message);
  }
};

const resolver = {
  Query: {
    createSession: createSessionForSubscription,
    verifyPayment: verifyPaymentBySession,
  },
};

export default resolver;
