// import { FateOsClient } from "../../db/prisma";
// import { AppContext } from "../../types";
// import { GraphQLError } from "graphql";

// const publicPricing = async (_: any, arg: any, cont: AppContext) => {
//   try {
//     // if (!cont.account?.account) {
//     //   return {
//     //     success: false,
//     //     message: "Unable to find user, try again",
//     //   };
//     // }

//     const result = await FateOsClient.subscriptions.findMany({
//       select: {
//         id: true,
//         usd_amount: true,
//         gbp_amount: true,
//         subscription_plan: true,
//         created_at: true,
//         subscription_name: true,
//         usage_limit: {
//           select: {
//             id: true,
//             total_user_track: true,
//             image_deck: true,
//             custom_deck: true,
//             export_feature: true,
//             note: true,
//             advanced_analytics: true,
//           },
//         },
//       },
//       orderBy: { usd_amount: "asc" },
//     });

//     return {
//       success: true,
//       message: "Getting pricing successfully",
//       subscriptions: result,
//     };
//   } catch (error: any) {
//     throw new GraphQLError("Unable to get pricing data");
//   }
// };

// const resolver = {
//   Query: {
//     subscriptions: publicPricing,
//   },
// };

// export default resolver;
