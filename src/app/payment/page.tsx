// import { GET_SINGLE_SUBSCRIPTION } from '@/graphql/query/Payment';
// import { getClient } from '@/lib/apolloClientServer';
// import { View403, View500 } from '@/sections/error';
// import { SingleSubscriptionDataResponse, SubscriptionPlan } from '@/types';
// import { notFound } from 'next/navigation';
// import { CONFIG } from 'src/config-global';

// import { PaymentView } from 'src/sections/payment/view';

// // ----------------------------------------------------------------------

// export const metadata = { title: `Payment - ${CONFIG.site.name}` };

// export default async function Page({
//   searchParams,
// }: {
//   searchParams: Promise<{
//     chooseId: string;
//     currency?: string;
//     annually?: string;
//     freeTrial?: string;
//   }>;
// }) {
//   const paramsSlug = await searchParams;

//   if (!paramsSlug.chooseId) {
//     return notFound();
//   }

//   try {
//     const client = await getClient();
//     const { data } = await client.query<SingleSubscriptionDataResponse>({
//       query: GET_SINGLE_SUBSCRIPTION,
//       variables: {
//         id: paramsSlug.chooseId,
//         currency: paramsSlug.currency ? paramsSlug.currency : 'gbp',
//       },
//     });

//     if (!data?.subscriptionById?.success) {
//       return <View403 subTitle={data?.subscriptionById?.message}></View403>;
//     }

//     const isFreeTrial = paramsSlug?.freeTrial?.toLowerCase() === 'true';
//     const isAnnual = paramsSlug?.annually?.toLowerCase() === 'true';

//     if (
//       isFreeTrial &&
//       data.subscriptionById.subscription.subscription_plan !== SubscriptionPlan.PREMIUM
//     ) {
//       return <View403 subTitle={'The free trial is only available for Pro plan'}></View403>;
//     }

//     return (
//       <PaymentView
//         subscription={data.subscriptionById.subscription}
//         priceMode={paramsSlug.currency as any}
//         annually={isAnnual}
//         freeTrial={isFreeTrial}
//       />
//     );
//   } catch (error: any) {
//     return <View403 subTitle={error.message} />;
//   }
// }
import React from 'react';

const page = () => {
  return <div>page</div>;
};

export default page;
