// import { VERIFY_PAYMENT } from '@/graphql/query/Payment';
// import { getClient } from '@/lib/apolloClientServer';
// import { View403 } from '@/sections/error';
// import PaymentSuccess from '@/sections/payment/view/payment-success';
// import { VerifyPaymentResponse } from '@/types';
// import { notFound } from 'next/navigation';

// const page = async ({ searchParams }: { searchParams: Promise<{ session_id: string }> }) => {
//   const searchparam = await searchParams;

//   if (!searchparam.session_id) {
//     return notFound();
//   }
//   try {
//     const client = await getClient();
//     const { data } = await client.query<VerifyPaymentResponse>({
//       query: VERIFY_PAYMENT,
//       variables: { sessionId: searchparam.session_id },
//     });

//     if (!data?.verifyPayment?.success) {
//       return <View403 subTitle={data?.verifyPayment?.message}></View403>;
//     }

//     return <PaymentSuccess {...data?.verifyPayment?.result}></PaymentSuccess>;
//   } catch (error: any) {
//     return <View403 subTitle={error.message} />;
//   }
// };

// export default page;

import React from 'react';

const page = () => {
  return <div>page</div>;
};

export default page;
