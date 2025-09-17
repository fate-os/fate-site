import { AppContext } from '../../types';
import { GraphQLError } from 'graphql';
import { CouponApplyArg, SessionArg, VerifyPaymentArg } from '../../types/req';
import { FateOsClient } from '@/db/prisma';
import { stripe } from '@/db/stripe';
import { CONFIG } from '@/config-global';
import moment from 'moment';

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
          is_credit_used: false,
          used_date: null,
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
      select: {
        id: true,
        paid_amount: true,
        year_count: true,
        is_credit_used: true,
        used_date: true,
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
          is_credit_used: paymentHistory.is_credit_used,
          used_date: paymentHistory.used_date?.toISOString(),
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
        is_credit_used: false,
        used_date: null,
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

const getPaymentHistory = async (_: any, __: any, cont: AppContext) => {
  try {
    if (!cont.account?.account) {
      return {
        success: false,
        message: 'Unable to find user, please log in and try again',
      };
    }

    const paymentHistory = await FateOsClient.payment_history.findMany({
      where: {
        user_id: cont.account.account.id,
      },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
          },
        },
        fate_quote: {
          select: {
            id: true,
            year_count: true,
            date: true,
            gender: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return {
      success: true,
      message: 'Payment history retrieved successfully',
      result: paymentHistory,
    };
  } catch (error: any) {
    console.error('Unexpected error in getPaymentHistory:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
};

const checkHasPurchaseHistory = async (_: any, __: any, cont: AppContext) => {
  try {
    if (!cont.account?.account) {
      return {
        success: false,
        message: 'Unable to find user, please log in and try again',
      };
    }

    const paymentHistory = await FateOsClient.payment_history.findMany({
      where: {
        user_id: cont.account.account.id,
      },
      select: {
        paid_amount: true,
      },
    });

    const hasPurchaseHistory = paymentHistory.length > 0;
    const totalPurchases = paymentHistory.length;
    const totalAmount = paymentHistory.reduce((sum, payment) => sum + payment.paid_amount, 0);

    return {
      success: true,
      message: 'Purchase history check completed',
      result: {
        has_purchase_history: hasPurchaseHistory,
        total_purchases: totalPurchases,
        total_amount: totalAmount,
      },
    };
  } catch (error: any) {
    console.error('Unexpected error in checkHasPurchaseHistory:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
};

const markCreditUsed = async (
  _: any,
  args: { history_id: string; used_date: string },
  context: AppContext
) => {
  try {
    const { history_id, used_date } = args;

    if (!context.account?.account) {
      return {
        success: false,
        message: 'Unable to find user, please log in and try again',
      };
    }

    if (!history_id) {
      return {
        success: false,
        message: 'History ID is required',
      };
    }

    if (!used_date) {
      return {
        success: false,
        message: 'Used date is required',
      };
    }

    // Verify that the payment history belongs to the current user
    const paymentHistory = await FateOsClient.payment_history.findFirst({
      where: {
        id: history_id,
        user_id: context.account.account.id,
      },
    });

    if (!paymentHistory) {
      return {
        success: false,
        message: 'Payment history not found or does not belong to current user',
      };
    }

    // Update the payment history to mark credit as used
    // Only update if not already used or if it's the same date
    const currentUsedDate = paymentHistory.used_date;
    const newUsedDate = new Date(used_date);

    // If already used and it's the same date, don't update
    if (
      paymentHistory.is_credit_used &&
      currentUsedDate &&
      moment(currentUsedDate).isSame(moment(newUsedDate), 'second')
    ) {
      // Already used for this exact time, no need to update
      return {
        success: true,
        message: 'Credit already marked as used for this time',
      };
    }

    await FateOsClient.payment_history.update({
      where: {
        id: history_id,
      },
      data: {
        is_credit_used: true,
        used_date: newUsedDate,
      },
    });

    return {
      success: true,
      message: 'Credit marked as used successfully',
    };
  } catch (error: any) {
    console.error('Error in markCreditUsed:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
};

const resolver = {
  Query: {
    createSession: createSessionForSubscription,
    verifyPayment: verifyPaymentBySession,
    checkUserPurchase,
    paymentHistory: getPaymentHistory,
    hasPurchaseHistory: checkHasPurchaseHistory,
  },
  Mutation: {
    applyCoupon: applyCouponCode,
    markCreditUsed,
  },
};

export default resolver;
