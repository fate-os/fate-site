import { VERIFY_PAYMENT } from '@/graphql/query/Payment';
import { getClient } from '@/lib/apolloClientServer';
import { View403 } from '@/sections/error';
import PaymentCancel from '@/sections/payment/view/payment-cancel';
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
  }>;
}) => {
  const searchparam = await searchParams;

  // Handle Bank of America Secure Acceptance cancel response
  if (searchparam.decision) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Payment Cancelled</h1>
        <p>You have cancelled the payment process.</p>
        {searchparam.reference_number && <p>Reference: {searchparam.reference_number}</p>}
        <button
          onClick={() => (window.location.href = '/')}
          style={{
            padding: '10px 20px',
            marginTop: '20px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Return to Home
        </button>
      </div>
    );
  }

  // Handle Stripe cancel response (existing logic)
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
      return <View403 subTitle={data?.verifyPayment?.message}></View403>;
    }

    return <PaymentCancel {...data?.verifyPayment?.result}></PaymentCancel>;
  } catch (error: any) {
    return <View403 subTitle={error.message} />;
  }
};

export default page;
