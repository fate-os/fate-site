import { AppContext } from '../../types';
import { GraphQLError } from 'graphql';
import { AdminCouponArg, IdParams } from '../../types/req';

import { stripe } from '@/db/stripe';

const adminCouponList = async (_: any, arg: any, cont: AppContext) => {
  try {
    if (!cont.account?.account) {
      return {
        success: false,
        message: 'Unable to find user, try again',
      };
    }

    const coupons = await stripe.coupons.list({});

    return {
      message: 'Getting coupons success',
      success: true,
      result: coupons.data,
    };
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

const addAdminCoupon = async (_: any, arg: AdminCouponArg, cont: AppContext) => {
  try {
    if (!cont.account?.account) {
      return {
        success: false,
        message: 'Unable to find user, try again',
      };
    }

    const { name, percentOff, limit } = arg;

    if (!name || !percentOff) {
      return {
        message: 'Please fill the inputs',
        success: false,
      };
    }

    // Create coupon with duration: "once"
    const coupon = await stripe.coupons.create({
      name: name,
      percent_off: percentOff,
      duration: 'once', // Applies only to first invoice
      max_redemptions: limit === 0 ? undefined : limit,
    });

    if (!coupon) {
      return {
        message: 'Unable to create coupon',
        success: false,
      };
    }

    return {
      message: 'Successfully coupon created',
      success: true,
    };
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

const deleteCoupon = async (_: any, arg: IdParams, cont: AppContext) => {
  try {
    if (!cont.account?.account) {
      return {
        success: false,
        message: 'Unable to find user, try again',
      };
    }
    const { id } = arg;

    if (!id) {
      return {
        success: false,
        message: `Id is required`,
      };
    }

    const coupon = await stripe.coupons.retrieve(id);
    if (!coupon) {
      return {
        success: false,
        message: `No coupon found, try again.`,
      };
    }

    const deleteCoupon = await stripe.coupons.del(id);
    if (!deleteCoupon) {
      return {
        success: false,
        message: `Unable to delete coupon, try again.`,
      };
    }

    return {
      success: true,
      message: `Coupon deleted successfully`,
    };
  } catch (error: any) {
    console.log(error);
    throw new GraphQLError('Unable to delete coupon, ' + error.message);
  }
};

const resolver = {
  Query: {
    adminCouponList: adminCouponList,
  },
  Mutation: {
    createCoupon: addAdminCoupon,
    deleteCoupon: deleteCoupon,
  },
};

export default resolver;

// ----------------------------------------------------------------------------
