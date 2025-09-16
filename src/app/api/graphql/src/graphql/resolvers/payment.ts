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
    const { years, shine } = arg;

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

    // const findFateQuote = await FateOsClient.quote_parameter.findFirst({
    //   select: {
    //     id: true,
    //   },
    //   where: { shine: shine ? 'up' : undefined },
    // });
    const create_coupon = await stripe.coupons.create({
      percent_off: 100,
      duration: 'once', // Applies only to first invoice
      max_redemptions: 2,
    });
    const priceId = await stripe.prices.create({
      currency: 'usd',
      unit_amount: years * 100 * 100,
      product_data: { name: shine ? 'Change fate' : `${years} years` },
    });

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price: priceId.id,
          quantity: 1,
        },
      ],
      discounts: [{ coupon: create_coupon.id }],

      mode: 'payment',
      return_url: `${YOUR_DOMAIN}/payment/success/?session_id={CHECKOUT_SESSION_ID}`,
      customer_email: cont.account?.account.email,
      metadata: {
        user_id: cont?.account?.account.id,
        session_id: '{CHECKOUT_SESSION_ID}',
        years: shine ? 60 : years,
        shine: shine ? 'shine' : '',
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

    if (!session) {
      return {
        success: false,
        message: 'False',
        result: {
          status: 'fail',
        },
      };
    }

    const metadata = session.metadata;

    // Check if payment history already exists for this session
    const existingHistory = await FateOsClient.payment_history.findFirst({
      where: {
        stripe_session_id: session.id,
      },
    });

    console.log(existingHistory, 'existingHistory');

    if (!existingHistory) {
      return {
        success: false,
        message: 'False',
        result: {
          status: 'error',
        },
      };
    }

    return {
      success: true,
      message: 'Getting payment status',
      result: {
        status: session.payment_status,
        amount: session?.amount_total ? session?.amount_total / 100 : 0,
        history_id: existingHistory.id,
      },
    };
  } catch (error: any) {
    console.log(error);
    throw new GraphQLError(error.message);
  }
};

const checkUserPurchase = async (
  _: any,
  arg: { years: number; shine: boolean },
  cont: AppContext
) => {
  try {
    const { years, shine } = arg;

    if (!cont.account?.account) {
      return {
        success: false,
        message: 'Unable to find user, try again',
      };
    }

    // Calculate the expected amount based on years and shine
    const expectedAmount = shine ? 45 * 100 : years * 100;

    // Find payment history for this user with matching amount and shine logic
    const paymentHistory = await FateOsClient.payment_history.findFirst({
      where: {
        user_id: cont.account.account.id,
        paid_amount: expectedAmount,
        year_count: shine ? 60 : years,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    if (paymentHistory) {
      return {
        success: true,
        message: 'User has purchased this package',
        result: {
          has_purchased: true,
          history_id: paymentHistory.id,
          paid_amount: paymentHistory.paid_amount,
          year_count: paymentHistory.year_count,
        },
      };
    }

    return {
      success: true,
      message: 'User has not purchased this package',
      result: {
        has_purchased: false,
        history_id: null,
        paid_amount: 0,
        year_count: 0,
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
    checkUserPurchase,
  },
};

export default resolver;
