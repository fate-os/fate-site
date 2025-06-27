// import { CONFIG } from '@/config-global';
// import { GET_CURRENT_SUBSCRIPTION } from '@/graphql/query/accountSubscription';
// import { getClient } from '@/lib/apolloClientServer';
// import { View403, View500 } from '@/sections/error';
// import { CurrentSubscriptionResponse } from '@/types';
// import { SubscriptionView, SubscriptionHistoryView } from 'src/sections/subscription';

// export const metadata = { title: `Subscription & Billing - ${CONFIG.site.name}` };

// const page = async () => {
//   try {
//     const client = await getClient();
//     const { data } = await client.query<CurrentSubscriptionResponse>({
//       query: GET_CURRENT_SUBSCRIPTION,
//     });

//     if (!data?.currentSubscription?.success) {
//       return <View403 subTitle={data?.currentSubscription?.message}></View403>;
//     }

//     const purchasedSubscription = data?.currentSubscription.purchased_subscription;

//     return (
//       <>
//         <SubscriptionView
//           freeSubscription={data?.currentSubscription.free_subscription}
//           usageCount={data?.currentSubscription?.usage_count}
//           purchasedSubscription={purchasedSubscription}
//         ></SubscriptionView>

//         <SubscriptionHistoryView />
//         {/* {(purchasedSubscription.subscription.subscription_plan === SubscriptionPlan.BASIC ||
//           purchasedSubscription.subscription.subscription_plan === SubscriptionPlan.PREMIUM) && (
//           <SubscriptionHistoryView />
//         )} */}
//       </>
//     );
//   } catch (error) {
//     return <View500></View500>;
//   }
// };

// export default page;

import React from 'react';

const page = () => {
  return <div>page</div>;
};

export default page;
