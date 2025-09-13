import { VERIFY_PAYMENT } from '@/graphql/query/Payment';
import { getClient } from '@/lib/apolloClientServer';
import { View500 } from '@/sections/error';
import PaymentSuccess from '@/sections/payment/view/payment-success';
import { VerifyPaymentResponse } from '@/types';
import { notFound } from 'next/navigation';

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    session_id?: string;
    decision?: string;
    reason_code?: string;
    transaction_id?: string;
    reference_number?: string;
    amount?: string;
    currency?: string;
    auth_code?: string;
    signature?: string;
  }>;
}) => {
  const searchparam = await searchParams;

  // Handle Bank of America Secure Acceptance response
  if (searchparam.decision) {
    // This is a Secure Acceptance response
    const isSuccess = searchparam.decision === 'ACCEPT' && searchparam.reason_code === '100';

    if (isSuccess) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>Payment Successful!</h1>
          <p>Transaction ID: {searchparam.transaction_id}</p>
          <p>Reference: {searchparam.reference_number}</p>
          <p>
            Amount: {searchparam.amount} {searchparam.currency}
          </p>
          {searchparam.auth_code && <p>Auth Code: {searchparam.auth_code}</p>}
        </div>
      );
    } else {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>Payment Failed</h1>
          <p>Reason Code: {searchparam.reason_code}</p>
          <p>Decision: {searchparam.decision}</p>
        </div>
      );
    }
  }

  // Handle Stripe response (existing logic)
  if (!searchparam.session_id) {
    return notFound();
  }
  try {
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
