// import { FateOsClient } from "../../db/prisma";
// import { AppContext } from "../../types";
// import { GraphQLError } from "graphql";
// import {
//   CouponApplyArg,
//   IdParams,
//   SessionArg,
//   SingleSubscriptionArg,
//   verifyPaymentArg,
// } from "../../types/req";

// import { SUBSCRIPTION_CONFIG } from "../../config";
// import { $Enums } from "@prisma/client";
// import { stripe } from "../../db/stripe";

// const YOUR_DOMAIN = process.env.CLIENT_ORIGIN;

// const acceptedCurrency = ["usd", "gbp"];

// /**
//  * ** Create stripe session for purchase **
//  */
// const createSessionForSubscription = async (
//   _: any,
//   arg: SessionArg,
//   cont: AppContext
// ) => {
//   try {
//     const { subscriptionId, currency, freeTrial, annually, couponId } = arg;

//     if (!cont.account?.account) {
//       return {
//         success: false,
//         message: "Unable to find user, try again",
//       };
//     }
//     const findCurrentUser = await FateOsClient.user.findUnique({
//       where: { id: cont.account?.account.id },
//       select: {
//         purchased_subscription: {
//           select: {
//             id: true,
//           },
//         },
//       },
//     });

//     if (!findCurrentUser) {
//       return {
//         success: false,
//         message: "Unable to find user, try again",
//       };
//     }

//     if (!acceptedCurrency.includes(currency)) {
//       return {
//         success: false,
//         message: "Currency is required. usd or gbp are accepted",
//       };
//     }
//     const subResult = await FateOsClient.subscriptions.findUnique({
//       select: {
//         id: true,
//         usd_amount: true,
//         gbp_amount: true,
//         subscription_plan: true,
//         created_at: true,
//         subscription_name: true,
//       },
//       where: { id: subscriptionId },
//     });

//     if (!subResult) {
//       return {
//         success: false,
//         message: "Unable to find subscription",
//       };
//     }

//     if (couponId) {
//       const findCoupon = await stripe.coupons.retrieve(couponId);
//       if (!findCoupon) {
//         return {
//           success: false,
//           message: `The coupon or promotional code you entered is either invalid or has expired.`,
//         };
//       }
//       if (!findCoupon.valid) {
//         return {
//           success: false,
//           message: `The coupon or promotional code you entered is either invalid or has expired.`,
//         };
//       }
//       const findIsSubscriptionAvailableFor =
//         await FateOsClient.coupon_for_subscription.findMany({
//           where: { coupon_id: findCoupon.id },
//         });

//       if (!findIsSubscriptionAvailableFor?.length) {
//         return {
//           success: false,
//           message: `The coupon or promotional code you entered is either invalid or has expired.`,
//         };
//       }

//       const isAvailable = findIsSubscriptionAvailableFor.find(
//         (e) => e.subscription_id === subscriptionId
//       );

//       if (!isAvailable) {
//         return {
//           success: false,
//           message: `This coupon or promotional code is either not applicable to the selected plan or may have expired.`,
//         };
//       }
//     }

//     if (subResult.subscription_plan === "LIFE_TIME") {
//       const priceId = await stripe.prices.create({
//         currency: currency,
//         unit_amount:
//           currency === "usd"
//             ? subResult.usd_amount * 100
//             : subResult.gbp_amount * 100, // £15.00

//         product_data: { name: subResult.subscription_name },
//       });

//       const session = await stripe.checkout.sessions.create({
//         ui_mode: "embedded",
//         line_items: [
//           {
//             price: priceId.id,
//             quantity: 1,
//           },
//         ],
//         discounts: couponId
//           ? [
//               {
//                 coupon: couponId, // Coupon only applies to initial payment
//               },
//             ]
//           : undefined,
//         mode: "payment",
//         return_url: `${YOUR_DOMAIN}/payment/success/?session_id={CHECKOUT_SESSION_ID}`,
//         customer_email: cont.account?.account.email,
//         metadata: {
//           subscription_id: subResult.id,
//           user_id: cont?.account?.account.id,
//           session_id: "{CHECKOUT_SESSION_ID}",
//         },
//       });
//       return {
//         success: true,
//         message: "Getting lifetime subscription successfully",
//         result: session.client_secret,
//       };
//     }

//     if (
//       freeTrial &&
//       subResult.subscription_plan !== $Enums.SubscriptionPlan.PREMIUM
//     ) {
//       return {
//         success: false,
//         message: "The free trial is only available for Pro plan",
//       };
//     }

//     const priceUsd = annually
//       ? subResult.usd_amount * SUBSCRIPTION_CONFIG.month_count_for_annual
//       : subResult.usd_amount;
//     const priceGbp = annually
//       ? subResult.gbp_amount * SUBSCRIPTION_CONFIG.month_count_for_annual
//       : subResult.gbp_amount;

//     const priceId = await stripe.prices.create({
//       currency: currency,
//       unit_amount:
//         currency === "usd"
//           ? Math.round(Number(priceUsd.toFixed(2)) * 100)
//           : Math.round(Number(priceGbp.toFixed(2)) * 100),
//       recurring: {
//         interval: annually ? "year" : "month",
//         usage_type: "licensed", // For seat-based pricing
//       },
//       product_data: { name: subResult.subscription_name },
//     });

//     const session = await stripe.checkout.sessions.create({
//       ui_mode: "embedded",
//       line_items: [
//         {
//           price: priceId.id,
//           quantity: 1,
//         },
//       ],
//       mode: "subscription",
//       return_url: `${YOUR_DOMAIN}/payment/success/?session_id={CHECKOUT_SESSION_ID}`,

//       customer_email: cont.account?.account.email,
//       metadata: {
//         subscription_id: subResult.id,
//         has_trial: freeTrial ? "true" : "false",
//       },
//       subscription_data: {
//         metadata: {
//           subscription_id: subResult.id,
//           user_id: cont?.account?.account.id,
//           session_id: "{CHECKOUT_SESSION_ID}",
//         },
//         trial_period_days: freeTrial ? 7 : undefined,
//         trial_settings: freeTrial
//           ? {
//               end_behavior: {
//                 missing_payment_method: "cancel",
//               },
//             }
//           : undefined,
//       },
//       discounts: couponId
//         ? [
//             {
//               coupon: couponId, // Coupon only applies to initial payment
//             },
//           ]
//         : undefined,
//       payment_method_collection: "always",
//     });

//     // Update with Stripe session and subscription IDs
//     await FateOsClient.purchased_subscription.update({
//       where: { id: findCurrentUser.purchased_subscription?.id },
//       data: {
//         session_id: session.id,
//         subscription_status: "pending",
//       },
//     });

//     return {
//       success: true,
//       message: "Getting single subscription successfully",
//       result: session.client_secret,
//     };
//   } catch (error: any) {
//     throw new GraphQLError(error.message);
//   }
// };

// /**
//  * ** For get the single subscription details **
//  */
// const singleSubscriptionById = async (
//   _: any,
//   arg: SingleSubscriptionArg,
//   cont: AppContext
// ) => {
//   try {
//     const { id, currency } = arg;

//     if (!cont.account?.account) {
//       return {
//         success: false,
//         message: "Unable to find user, try again",
//       };
//     }

//     const currentSub = await FateOsClient.user.findUnique({
//       where: { id: cont.account?.account.id },
//       select: { purchased_subscription: { select: { subscription_id: true } } },
//     });
//     const subResult = await FateOsClient.subscriptions.findUnique({
//       select: {
//         id: true,
//         usd_amount: true,
//         gbp_amount: true,
//         subscription_plan: true,
//         created_at: true,
//         subscription_name: true,
//       },
//       where: { id: id },
//     });

//     if (!subResult) {
//       return {
//         success: false,
//         message: "Unable to find subscription",
//       };
//     }

//     if (currentSub?.purchased_subscription?.subscription_id === subResult.id) {
//       throw new GraphQLError("You already purchased the plan");
//     }

//     // if (subResult.subscription_plan === "LIFE_TIME") {
//     //   const priceId = await stripe.prices.create({
//     //     currency: currency,
//     //     unit_amount:
//     //       currency === "usd"
//     //         ? subResult.usd_amount * 100
//     //         : subResult.gbp_amount * 100, // £15.00

//     //     product_data: { name: subResult.subscription_name },
//     //   });

//     //   const session = await stripe.checkout.sessions.create({
//     //     ui_mode: "embedded",
//     //     line_items: [
//     //       {
//     //         price: priceId.id,
//     //         quantity: 1,
//     //       },
//     //     ],
//     //     mode: "payment",
//     //     return_url: `${YOUR_DOMAIN}/payment/success/?session_id={CHECKOUT_SESSION_ID}`,
//     //     customer_email: cont.account?.account.email,
//     //     metadata: { subscription_id: subResult.id },
//     //   });

//     //   return {
//     //     success: true,
//     //     message: "Getting lifetime subscription successfully",
//     //     clientSecret: session.client_secret,
//     //     subscription: subResult,
//     //   };
//     // }

//     return {
//       success: true,
//       message: "Getting single subscription successfully",
//       subscription: subResult,
//       // clientSecret: session.client_secret,
//     };
//   } catch (error: any) {
//     console.log(error);
//     throw new GraphQLError(error.message);
//   }
// };
// const verifyPaymentBySession = async (
//   _: any,
//   arg: verifyPaymentArg,
//   cont: AppContext
// ) => {
//   try {
//     const { sessionId } = arg;

//     if (!cont.account?.account) {
//       return {
//         success: false,
//         message: "Unable to find user, try again",
//       };
//     }
//     if (!sessionId) {
//       return {
//         success: false,
//         message: "Session is required",
//       };
//     }

//     const session = await stripe.checkout.sessions.retrieve(sessionId, {
//       expand: ["payment_intent"],
//     });

//     return {
//       success: true,
//       message: "Getting payment status",
//       result: {
//         status: session.payment_status,
//         amount: session?.amount_total ? session?.amount_total / 100 : 0,
//         currency: session.currency,
//       },
//     };
//   } catch (error: any) {
//     console.log(error);
//     throw new GraphQLError(error.message);
//   }
// };

// const applyCouponCode = async (
//   _: any,
//   arg: CouponApplyArg,
//   cont: AppContext
// ) => {
//   try {
//     if (!cont.account?.account) {
//       return {
//         success: false,
//         message: "Unable to find user, try again",
//       };
//     }
//     const { code, subscriptionId } = arg;

//     if (!code || !subscriptionId) {
//       return {
//         success: false,
//         message: `code is required`,
//       };
//     }

//     const coupons = await stripe.coupons.list();

//     if (!coupons?.data.length) {
//       return {
//         success: false,
//         message: `The coupon or promotional code you entered is either invalid or has expired.`,
//       };
//     }

//     const findCoupon = coupons.data.find((e) => e.name === code);

//     if (!findCoupon) {
//       return {
//         success: false,
//         message: `The coupon or promotional code you entered is either invalid or has expired.`,
//       };
//     }
//     if (!findCoupon.valid) {
//       return {
//         success: false,
//         message: `The coupon or promotional code you entered is either invalid or has expired.`,
//       };
//     }

//     const findIsSubscriptionAvailableFor =
//       await FateOsClient.coupon_for_subscription.findMany({
//         where: { coupon_id: findCoupon.id },
//       });

//     if (!findIsSubscriptionAvailableFor?.length) {
//       return {
//         success: false,
//         message: `The coupon or promotional code you entered is either invalid or has expired.`,
//       };
//     }

//     const isAvailable = findIsSubscriptionAvailableFor.find(
//       (e) => e.subscription_id === subscriptionId
//     );

//     if (!isAvailable) {
//       return {
//         success: false,
//         message: `This coupon or promotional code is either not applicable to the selected plan or may have expired.`,
//       };
//     }

//     return {
//       success: true,
//       message: `The coupon has been successfully applied to your plan`,
//       coupon: findCoupon,
//     };
//   } catch (error: any) {
//     console.log(error);
//     throw new GraphQLError("Unable to delete coupon, " + error.message);
//   }
// };

// const resolver = {
//   Query: {
//     subscriptionById: singleSubscriptionById,
//     createSession: createSessionForSubscription,
//     verifyPayment: verifyPaymentBySession,
//   },
//   Mutation: {
//     applyCoupon: applyCouponCode,
//   },
// };

// export default resolver;
