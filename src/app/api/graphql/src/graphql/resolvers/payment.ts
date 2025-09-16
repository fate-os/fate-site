import { AppContext } from '../../types';
import { GraphQLError } from 'graphql';
import { CouponApplyArg, SessionArg, VerifyPaymentArg } from '../../types/req';
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
    const { years, shine, couponId } = arg;

    // Validate input parameters
    if (!years || years <= 0 || years > 100) {
      return {
        success: false,
        message: 'Invalid years parameter. Must be between 1 and 100.',
      };
    }

    if (typeof shine !== 'boolean') {
      return {
        success: false,
        message: 'Invalid shine parameter. Must be a boolean value.',
      };
    }

    if (!cont.account?.account) {
      return {
        success: false,
        message: 'Unable to find user, please log in and try again',
      };
    }

    if (couponId) {
      const findCoupon = await stripe.coupons.retrieve(couponId);
      if (!findCoupon) {
        return {
          success: false,
          message: `The coupon or promotional code you entered is either invalid or has expired.`,
        };
      }
      if (!findCoupon.valid) {
        return {
          success: false,
          message: `The coupon or promotional code you entered is either invalid or has expired.`,
        };
      }
    }

    const findCurrentUser = await FateOsClient.user.findUnique({
      where: { id: cont.account?.account.id },
    });

    if (!findCurrentUser) {
      return {
        success: false,
        message: 'User not found. Please try logging in again.',
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
      discounts: couponId
        ? [
            {
              coupon: couponId, // Coupon only applies to initial payment
            },
          ]
        : undefined,

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
      message: 'Payment session created successfully',
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
    console.error('Unexpected error in createSessionForSubscription:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
};

const verifyPaymentBySession = async (_: any, arg: VerifyPaymentArg, cont: AppContext) => {
  try {
    const { sessionId } = arg;

    // Validate input parameters
    if (!sessionId || typeof sessionId !== 'string') {
      return {
        success: false,
        message: 'Valid session ID is required',
      };
    }

    if (!cont.account?.account) {
      return {
        success: false,
        message: 'Unable to find user, please log in and try again',
      };
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent'],
    });

    if (!session) {
      return {
        success: false,
        message: 'Payment session not found',
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

    if (!existingHistory) {
      return {
        success: false,
        message: 'Payment verification failed. Please contact support.',
        result: {
          status: 'error',
        },
      };
    }

    return {
      success: true,
      message: 'Payment status retrieved successfully',
      result: {
        status: session.payment_status,
        amount: session?.amount_total ? session?.amount_total / 100 : 0,
        history_id: existingHistory.id,
      },
    };
  } catch (error: any) {
    console.error('Unexpected error in verifyPaymentBySession:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
};

const checkUserPurchase = async (
  _: any,
  arg: { years: number; shine: boolean },
  cont: AppContext
) => {
  try {
    const { years, shine } = arg;

    // Validate input parameters
    if (!years || years <= 0 || years > 100) {
      return {
        success: false,
        message: 'Invalid years parameter. Must be between 1 and 100.',
      };
    }

    if (typeof shine !== 'boolean') {
      return {
        success: false,
        message: 'Invalid shine parameter. Must be a boolean value.',
      };
    }

    if (!cont.account?.account) {
      return {
        success: false,
        message: 'Unable to find user, please log in and try again',
      };
    }

    // Check if user is super admin - if so, bypass purchase requirement
    if (cont.account.account.super_admin === true) {
      return {
        success: true,
        message: 'Super admin access granted',
        result: {
          has_purchased: true,
          history_id: 'admin-bypass',
          paid_amount: 0,
          year_count: shine ? 60 : years,
        },
      };
    }

    // Find payment history for this user with matching amount and shine logic
    const paymentHistory = await FateOsClient.payment_history.findFirst({
      where: {
        user_id: cont.account.account.id,

        year_count: shine ? 60 : years,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    // console.log(
    //   await FateOsClient.payment_history.findMany({
    //     where: {
    //       user_id: cont.account.account.id,
    //     },
    //     orderBy: {
    //       created_at: 'desc',
    //     },
    //   })
    // );

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
    console.error('Unexpected error in checkUserPurchase:', error);

    // Return a user-friendly error instead of throwing
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
};
const applyCouponCode = async (_: any, arg: CouponApplyArg, cont: AppContext) => {
  try {
    if (!cont.account?.account) {
      return {
        success: false,
        message: 'Unable to find user, try again',
      };
    }
    const { code } = arg;

    if (!code) {
      return {
        success: false,
        message: `code is required`,
      };
    }

    const coupons = await stripe.coupons.list();

    if (!coupons?.data.length) {
      return {
        success: false,
        message: `The coupon or promotional code you entered is either invalid or has expired.`,
      };
    }

    const findCoupon = coupons.data.find((e) => e.name === code);

    if (!findCoupon) {
      return {
        success: false,
        message: `The coupon or promotional code you entered is either invalid or has expired.`,
      };
    }
    if (!findCoupon.valid) {
      return {
        success: false,
        message: `The coupon or promotional code you entered is either invalid or has expired.`,
      };
    }

    return {
      success: true,
      message: `The coupon has been successfully applied to your plan`,
      coupon: findCoupon,
    };
  } catch (error: any) {
    console.log(error);
    throw new GraphQLError('Unable to delete coupon, ' + error.message);
  }
};

const resolver = {
  Query: {
    createSession: createSessionForSubscription,
    verifyPayment: verifyPaymentBySession,
    checkUserPurchase,
  },
  Mutation: {
    applyCoupon: applyCouponCode,
  },
};

export default resolver;
