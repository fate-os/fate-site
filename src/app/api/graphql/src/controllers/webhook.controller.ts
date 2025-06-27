// import express, { Request, Response } from "express";
// import bodyParser from "body-parser";
// import Stripe from "stripe";
// import { config } from "dotenv";
// import {
//   generateFailedSubscriptionEmail,
//   generateFreeTrialStartedEmail,
//   generatePastDueCancellationEmail,
//   generatePastDueSubscriptionEmail,
//   generateSubscriptionEmail,
// } from "../helper/emialTemplatte";
// import { FateOsClient } from "../db/prisma";
// import { UseSendEmail } from "../helper/sendMail";
// import moment from "moment";

// // dotenv config
// config();

// const app = express();
// const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: "2025-02-24.acacia",
// });

// const registerHook = async () => {
//   try {
//     // Fetch all event destinations (webhooks)
//     const existingHooks = await stripe.v2.core.eventDestinations.list();

//     // Check if a webhook with the same URL already exists

//     existingHooks.data.map((e) => console.log(e.webhook_endpoint));

//     if (existingHooks.data.length > 0) {
//       console.log("Webhook already exists. Skipping creation.");
//       return;
//     }

//     await stripe.v2.core.eventDestinations.create({
//       name: "Innerstate ",
//       description: "Innerstate webhooks",
//       type: "webhook_endpoint",
//       event_payload: "snapshot",
//       enabled_events: [
//         "checkout.session.completed",
//         "invoice.payment_succeeded",
//         "invoice.payment_failed",
//         "customer.subscription.deleted",
//         "customer.subscription.updated",
//         "customer.subscription.created",
//       ],
//       webhook_endpoint: {
//         url: `${process.env.SERVER_URL}/webhook`,
//       },
//     });
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

// if (process.env?.NODE_ENV?.toLowerCase() === "production") {
//   registerHook();
// }

// app.post(
//   "/webhook",
//   bodyParser.raw({ type: "application/json" }),

//   async (req: Request, res: Response) => {
//     const sig = req.headers["stripe-signature"];
//     let event: Stripe.Event;

//     try {
//       event = stripe.webhooks.constructEvent(
//         req.body,
//         sig as string,
//         webhookSecret
//       );
//     } catch (err: any) {
//       console.error("Webhook signature verification failed:", err.message);
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object;
//       if (session.mode === "subscription") {
//         await FateOsClient.purchased_subscription.updateMany({
//           where: {
//             session_id: session.id,
//             stripe_sub_id: null,
//           },
//           data: {
//             subscription_status: "active",
//           },
//         });
//       }

//       if (session.customer_email) {
//         const subscriptionId = session?.metadata?.subscription_id;

//         if (!subscriptionId) {
//           return;
//         }

//         const thatCustomer = await FateOsClient.user.findUnique({
//           where: { email: session.customer_email },
//           select: {
//             id: true,
//             first_name: true,
//             last_name: true,
//             email: true,
//             purchased_subscription_id: true,
//             purchased_subscription: {
//               select: {
//                 created_at: true,
//                 id: true,
//                 session_id: true,
//                 subscription: {
//                   select: {
//                     subscription_name: true,
//                     subscription_plan: true,
//                     id: true,
//                   },
//                 },
//               },
//             },
//           },
//         });

//         if (!thatCustomer) {
//           return;
//         }

//         const findSubscription = await FateOsClient.subscriptions.findUnique({
//           where: { id: subscriptionId },
//         });

//         if (!findSubscription) {
//           return;
//         }

//         if (!thatCustomer.purchased_subscription_id) {
//           return;
//         }

//         if (findSubscription.subscription_plan === "LIFE_TIME") {
//           const paymentIntentId = event.data.object.payment_intent;

//           if (paymentIntentId) {
//             const paymentIntent = await stripe.paymentIntents.retrieve(
//               paymentIntentId as string
//             );

//             if (paymentIntent) {
//               const latestChargeId = paymentIntent.latest_charge;

//               const charge = await stripe.charges.retrieve(
//                 latestChargeId as string
//               );

//               await FateOsClient.billing_log.create({
//                 data: {
//                   amount: session.amount_total || 0,
//                   billing_month: new Date(),
//                   subscription_id: findSubscription?.id,
//                   user_id: thatCustomer.id,
//                   status: session.status,
//                   currency: session.currency,
//                   invoice_url: charge.receipt_url || "",
//                   invoice_number: charge.receipt_number,
//                   session_id: session.id,
//                   summery: `${findSubscription.subscription_name?.toLowerCase()} purchased`,
//                 },
//               });

//               await UseSendEmail({
//                 email: thatCustomer.email,
//                 message: "Payment completed",
//                 subject: "Payment completed",
//                 template: generateSubscriptionEmail({
//                   hosted_invoice_url: charge.receipt_url || "",
//                   recipientName: charge.billing_details.name || "",
//                   subscription_plan:
//                     findSubscription?.subscription_name as string,
//                 }),
//               });
//             }
//           } else {
//             await FateOsClient.billing_log.create({
//               data: {
//                 amount: session.amount_total || 0,
//                 billing_month: new Date(),
//                 subscription_id: findSubscription?.id,
//                 user_id: thatCustomer.id,
//                 status: session.status,
//                 currency: session.currency,
//                 invoice_url: "",
//                 invoice_number: null,
//                 session_id: session.id,
//                 summery: `${findSubscription.subscription_name?.toLowerCase()} purchased`,
//               },
//             });

//             await UseSendEmail({
//               email: thatCustomer.email,
//               message: "Payment completed",
//               subject: "Payment completed",
//               template: generateSubscriptionEmail({
//                 hosted_invoice_url: "",
//                 recipientName: "",
//                 subscription_plan:
//                   findSubscription?.subscription_name as string,
//               }),
//             });
//           }
//         }

//         // ** Cancel the subscription if previous exist
//         const _current_sub = thatCustomer?.purchased_subscription?.subscription;
//         const isPaid =
//           _current_sub?.subscription_plan === "BASIC" ||
//           _current_sub?.subscription_plan === "PREMIUM";

//         if (isPaid && thatCustomer?.purchased_subscription?.session_id) {
//           const session = await stripe.checkout.sessions.retrieve(
//             thatCustomer.purchased_subscription.session_id,
//             {
//               expand: ["subscription"],
//             }
//           );

//           // if (!session.subscription) {
//           //   return {
//           //     success: false,
//           //     message: "Subscription not found, ask for manual refund",
//           //   };
//           // }

//           //   // Get the subscription
//           const stripeSubscription = await stripe.subscriptions.retrieve(
//             (session.subscription as Stripe.Subscription).id as string,
//             { expand: ["latest_invoice.payment_intent"] }
//           );

//           // if (!stripeSubscription) {
//           //   return {
//           //     success: false,
//           //     message: "Subscription not found, ask for manual refund",
//           //   };
//           // }

//           // 3. Cancel the current Subscription
//           await stripe.subscriptions.cancel(stripeSubscription.id);
//         }

//         const createPurchased =
//           await FateOsClient.purchased_subscription.update({
//             data: {
//               subscription_id: findSubscription.id,
//               session_id: session.id,
//               subscription_status: session.status,
//             },
//             where: { id: thatCustomer.purchased_subscription_id },
//           });

//         if (!createPurchased) {
//           return;
//         }

//         await FateOsClient.user.update({
//           where: { id: thatCustomer.id },
//           data: { purchased_subscription_id: createPurchased.id },
//         });
//       }
//     }

//     if (event.type === "invoice.payment_succeeded") {
//       const invoice = event.data.object;

//       const subscriptionId =
//         invoice?.subscription_details?.metadata?.subscription_id;

//       const findSubscription = await FateOsClient.subscriptions.findUnique({
//         where: { id: subscriptionId },
//       });

//       const thatCustomer = await FateOsClient.user.findUnique({
//         where: { email: invoice.customer_email as string },
//       });

//       if (!thatCustomer) {
//         return;
//       }
//       await FateOsClient.billing_log.create({
//         data: {
//           amount: invoice.amount_paid || 0,
//           billing_month: new Date(),
//           subscription_id: findSubscription?.id as string,
//           user_id: thatCustomer.id,
//           status: invoice.status,
//           currency: invoice.currency,
//           invoice_url: invoice.hosted_invoice_url || "",
//           invoice_number: invoice.receipt_number,
//           summery: `${findSubscription?.subscription_name?.toLowerCase()} purchased`,
//         },
//       });

//       await UseSendEmail({
//         email: thatCustomer.email,
//         message: "Payment completed",
//         subject: "Payment completed",
//         template: generateSubscriptionEmail({
//           hosted_invoice_url: invoice.hosted_invoice_url || "",
//           invoice_pdf: invoice.invoice_pdf || "",
//           recipientName: invoice.customer_name || "",
//           subscription_plan: findSubscription?.subscription_name as string,
//         }),
//       });
//     }

//     if (event.type === "invoice.payment_failed") {
//       const invoice = event.data.object;

//       const subscriptionId =
//         invoice?.subscription_details?.metadata?.subscription_id;

//       const findSubscription = await FateOsClient.subscriptions.findUnique({
//         where: { id: subscriptionId },
//       });

//       const thatCustomer = await FateOsClient.user.findUnique({
//         where: { email: invoice.customer_email as string },
//       });

//       if (!thatCustomer) {
//         return;
//       }

//       await UseSendEmail({
//         email: thatCustomer.email,
//         message: "Payment Failed",
//         subject: "Payment Failed",
//         template: generateFailedSubscriptionEmail({
//           recipientName: invoice.customer_name || "",
//           subscription_plan: findSubscription?.subscription_name as string,
//         }),
//       });
//     }

//     if (event.type === "customer.subscription.updated") {
//       const subscription = event.data.object;
//       const customerId = subscription.customer;
//       const status = subscription.status;

//       const retriveCustomer = (await stripe.customers.retrieve(
//         customerId as string
//       )) as Stripe.Response<Stripe.Customer>;

//       if (!retriveCustomer.email) {
//         return;
//       }

//       const thatCustomer = await FateOsClient.user.findUnique({
//         where: { email: retriveCustomer.email },
//         select: {
//           id: true,
//           first_name: true,
//           last_name: true,
//           email: true,
//           purchased_subscription_id: true,
//           purchased_subscription: {
//             select: {
//               subscription: { select: { subscription_name: true, id: true } },
//             },
//           },
//         },
//       });

//       if (!thatCustomer?.purchased_subscription_id) {
//         return;
//       }

//       await FateOsClient.purchased_subscription.update({
//         where: { id: thatCustomer.purchased_subscription_id },
//         data: { subscription_status: status },
//       });

//       if (status === "past_due") {
//         await FateOsClient.billing_log.create({
//           data: {
//             amount: 0,
//             billing_month: new Date(),
//             subscription_id: thatCustomer?.purchased_subscription?.subscription
//               .id as string,
//             user_id: thatCustomer.id,
//             status: status,
//             currency: subscription.currency,
//             summery: `${thatCustomer?.purchased_subscription?.subscription?.subscription_name?.toLowerCase()} past due`,
//           },
//         });

//         await UseSendEmail({
//           email: thatCustomer.email,
//           message: "Payment Past Due",
//           subject: "Payment Past Due",
//           template: generatePastDueSubscriptionEmail({
//             recipientName:
//               thatCustomer.first_name + " " + thatCustomer.last_name || "",
//             subscription_plan: thatCustomer.purchased_subscription?.subscription
//               ?.subscription_name as string,
//             update_payment_link: `${process.env.CLIENT_ORIGIN}/app/subscription/`,
//           }),
//         });
//       }
//     }
//     if (event.type === "customer.subscription.created") {
//       const subscription = event.data.object;

//       const sessionId = subscription.metadata.session_id;

//       await FateOsClient.purchased_subscription.updateMany({
//         where: {
//           session_id: sessionId,
//           stripe_sub_id: null, // Only update if not already set
//         },
//         data: {
//           stripe_sub_id: subscription.id,
//           subscription_status: subscription.status,
//         },
//       });

//       if (subscription.trial_end && subscription.status === "trialing") {
//         const user = await FateOsClient.user.findUnique({
//           where: { id: subscription.metadata.user_id },
//         });

//         if (user) {
//           const trialEndDate = new Date();
//           trialEndDate.setDate(trialEndDate.getDate() + 7);

//           await UseSendEmail({
//             email: user.email,
//             message: "Your Free Trial Has Started!",
//             subject: "Your Free Trial Has Started!",
//             template: generateFreeTrialStartedEmail({
//               recipientName: user.first_name + " " + user.last_name || "",
//               trialEndDate: trialEndDate.toString(),
//               trialDuration: 7,
//             }),
//           });
//         }
//       }
//     }
//     if (event.type === "customer.subscription.deleted") {
//       const stripeSub = event.data.object;

//       const customerId = stripeSub.customer;

//       const canceledSubs = await FateOsClient.purchased_subscription.findMany({
//         where: {
//           stripe_sub_id: stripeSub.id,
//           // subscription: {
//           //   subscription_plan: "FREE",
//           // },
//         },
//         include: {
//           subscription: {
//             select: { subscription_name: true, id: true },
//           },
//           users: {
//             select: {
//               email: true,
//               first_name: true,
//               last_name: true,
//               id: true,
//             },
//           },
//         },
//       });

//       for (const sub of canceledSubs) {
//         await updateLocalSubscriptionStatus(sub.id, {
//           subscription_id: sub.subscription.id,
//           subscription_name: sub.subscription.subscription_name,
//           user_id: sub.users[0].id,
//         });
//       }

//       if (canceledSubs.length === 0) {
//         const retriveCustomer = (await stripe.customers.retrieve(
//           customerId as string
//         )) as Stripe.Response<Stripe.Customer>;

//         if (!retriveCustomer.email) {
//           return;
//         }
//         const thatCustomer = await FateOsClient.user.findUnique({
//           where: { email: retriveCustomer.email },
//           select: {
//             id: true,
//             first_name: true,
//             last_name: true,
//             email: true,
//             purchased_subscription_id: true,
//             purchased_subscription: {
//               select: {
//                 stripe_sub_id: true,
//                 subscription: {
//                   select: { subscription_name: true, id: true },
//                 },
//               },
//             },
//           },
//         });

//         if (!thatCustomer?.purchased_subscription_id) {
//           return;
//         }

//         // Already canceled in Stripe
//         if (stripeSub.status === "canceled") {
//           if (
//             thatCustomer?.purchased_subscription?.stripe_sub_id === stripeSub.id
//           ) {
//             await updateLocalSubscriptionStatus(
//               thatCustomer.purchased_subscription_id,
//               {
//                 subscription_id: thatCustomer.purchased_subscription
//                   ?.subscription.id as string,
//                 subscription_name: thatCustomer.purchased_subscription
//                   ?.subscription.subscription_name as string,
//                 user_id: thatCustomer.id,
//               }
//             );
//           }
//         }
//       }
//     }

//     // Add other event types as needed
//     res.json({ received: true });
//   }
// );

// export default app;

// /**
//  * Function to Cancel Past-Due Subscriptions After 1 Days
//  */
// export async function cancelPastDueSubscriptions() {
//   const oneDaysAgo = moment().subtract(1, "days").toDate();

//   try {
//     const pastDueSubscriptions =
//       await FateOsClient.purchased_subscription.findMany({
//         where: {
//           subscription_status: "past_due",
//           updated_at: { lt: oneDaysAgo },
//           stripe_sub_id: { not: null }, // Only those with Stripe IDs
//         },
//         include: {
//           subscription: {
//             select: { subscription_name: true, id: true },
//           },
//           users: {
//             select: {
//               email: true,
//               first_name: true,
//               last_name: true,
//               id: true,
//             },
//           },
//         },
//       });

//     for (const sub of pastDueSubscriptions) {
//       try {
//         // Skip if no Stripe subscription reference exists
//         if (!sub.stripe_sub_id) {
//           await updateLocalSubscriptionStatus(sub.id, {
//             subscription_id: sub.subscription.id,
//             subscription_name: sub.subscription.subscription_name,
//             user_id: sub.users[0].id,
//           });
//           continue;
//         }

//         // Check subscription status in Stripe
//         const stripeSub = await stripe.subscriptions.retrieve(
//           sub.stripe_sub_id
//         );

//         // Already canceled in Stripe
//         if (stripeSub.status === "canceled") {
//           await updateLocalSubscriptionStatus(sub.id, {
//             subscription_id: sub.subscription.id,
//             subscription_name: sub.subscription.subscription_name,
//             user_id: sub.users[0].id,
//           });
//           continue;
//         }

//         // Active subscription - cancel it
//         await stripe.subscriptions.cancel(stripeSub.id);
//         await updateLocalSubscriptionStatus(sub.id, {
//           subscription_id: sub.subscription.id,
//           subscription_name: sub.subscription.subscription_name,
//           user_id: sub.users[0].id,
//         });

//         // Send notification email
//         if (sub.users.length > 0) {
//           const user = sub.users[0];
//           await sendCancellationEmail(
//             user.email,
//             `${user.first_name} ${user.last_name}`,
//             sub.subscription.subscription_name
//           );
//         }

//         console.log(`Canceled subscription ${sub.stripe_sub_id}`);
//       } catch (error) {
//         if (isStripeNotFoundError(error)) {
//           // Subscription doesn't exist in Stripe
//           await updateLocalSubscriptionStatus(sub.id, {
//             subscription_id: sub.subscription.id,
//             subscription_name: sub.subscription.subscription_name,
//             user_id: sub.users[0].id,
//           });
//           console.log(`Marked missing subscription ${sub.id} as canceled`);
//         } else {
//           console.error(`Error canceling ${sub.stripe_sub_id}:`, error);
//         }
//       }
//     }
//   } catch (error) {
//     console.error("Failed to process past due subscriptions:", error);
//   }
// }

// // Helper functions
// async function updateLocalSubscriptionStatus(
//   purchasedSubId: string,
//   subscription?: {
//     subscription_id: string;
//     subscription_name: string;
//     user_id: string;
//   }
// ) {
//   const [findFreeSub] = await FateOsClient.subscriptions.findMany({
//     where: { subscription_plan: "FREE" },
//     select: {
//       id: true,
//       subscription_name: true,
//       subscription_plan: true,
//       usage_limit: true,
//     },
//   });
//   await FateOsClient.purchased_subscription.update({
//     where: { id: purchasedSubId },
//     data: {
//       subscription_status: "canceled",
//       subscription_id: findFreeSub.id,
//       session_id: null,
//       stripe_sub_id: null,
//     },
//   });
//   if (subscription && subscription) {
//     await FateOsClient.billing_log.create({
//       data: {
//         amount: 0,
//         billing_month: new Date(),
//         subscription_id: subscription.subscription_id,
//         user_id: subscription.user_id,
//         status: "succeeded",
//         summery: `${subscription.subscription_name} canceled`,
//       },
//     });
//   }
// }

// function isStripeNotFoundError(error: any): boolean {
//   return (
//     error instanceof Stripe.errors.StripeInvalidRequestError &&
//     error.code === "resource_missing"
//   );
// }

// async function sendCancellationEmail(
//   email: string,
//   name: string,
//   planName: string
// ) {
//   await UseSendEmail({
//     email,
//     subject: "Subscription Canceled",
//     message: "Subscription Canceled",
//     template: generatePastDueCancellationEmail({
//       recipientName: name,
//       subscription_plan: planName,
//       paymentUpdateLink: `${process.env.CLIENT_ORIGIN}/app/subscription/`,
//     }),
//   });
// }
