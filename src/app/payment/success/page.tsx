import { VERIFY_PAYMENT } from '@/graphql/query/Payment';
import { getClient } from '@/lib/apolloClientServer';
import { View500 } from '@/sections/error';
import PaymentSuccess from '@/sections/payment/view/payment-success';
import { VerifyPaymentResponse } from '@/types';
import { notFound } from 'next/navigation';

const page = async ({ searchParams }: { searchParams: Promise<{ session_id: string }> }) => {
  const searchparam = await searchParams;

  if (!searchparam.session_id) {
    return notFound();
  }
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const client = await getClient();
    const { data } = await client.query<VerifyPaymentResponse>({
      query: VERIFY_PAYMENT,
      variables: { sessionId: searchparam.session_id },
    });

    if (!data?.verifyPayment?.success) {
      return <View500 subTitle={data?.verifyPayment?.message}></View500>;
    }

    return <PaymentSuccess {...data?.verifyPayment?.result}></PaymentSuccess>;
  } catch (error: any) {
    return <View500 subTitle={error.message} />;
  }
};

export default page;
