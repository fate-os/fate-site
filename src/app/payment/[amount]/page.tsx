import { CONFIG } from 'src/config-global';
import { PaymentView } from 'src/sections/payment/view';
import { getClient } from '@/lib/apolloClientServer';
import { CHECK_USER_PURCHASE } from '@/graphql/query/Payment';
import { CheckUserPurchaseResponse } from '@/types';
import { View403, View500 } from '@/sections/error';
import { redirect } from 'next/navigation';
import { paths } from '@/routes/paths';

// ----------------------------------------------------------------------

export const metadata = { title: `Payment - ${CONFIG.site.name}` };

export default async function Page({
  params,
  searchParams,
}: {
  searchParams: Promise<{ shine?: string; confirm_another_purchase?: string }>;
  params: Promise<{ amount: string }>;
}) {
  // Safely parse search params and route params
  const searchParamsData = await searchParams;
  const paramsData = await params;

  const isShine = searchParamsData?.shine;
  const confirmAnotherPurchase = searchParamsData?.confirm_another_purchase;
  const { amount } = paramsData;

  // Validate amount parameter
  if (!amount || isNaN(parseInt(amount))) {
    return <View403 subTitle="Invalid payment amount specified." />;
  }

  // Initialize Apollo client with error handling
  let client;
  try {
    client = await getClient();
  } catch (clientError) {
    console.error('Failed to initialize Apollo client:', clientError);
    return <View500 subTitle="Failed to connect to server. Please try again later." />;
  }

  // Execute GraphQL query with comprehensive error handling
  let data: CheckUserPurchaseResponse;
  try {
    const result = await client.query<CheckUserPurchaseResponse>({
      query: CHECK_USER_PURCHASE,
      variables: {
        years: parseInt(amount),
        shine: isShine === 'true',
      },
      errorPolicy: 'all', // Return partial data even if there are errors
      fetchPolicy: 'network-only', // Always fetch fresh data
    });
    data = result.data;
  } catch (queryError) {
    console.error('GraphQL query error:', queryError);

    // Check if it's a network error
    if (queryError instanceof Error && queryError.message.includes('Network')) {
      return <View500 subTitle="Network error. Please check your connection and try again." />;
    }

    // Generic database/server error
    return <View500 subTitle="Server error occurred. Please try again later." />;
  }

  // Handle GraphQL response errors
  if (!data?.checkUserPurchase) {
    console.error('No purchase data received from server');
    return <View500 subTitle="Failed to retrieve purchase information. Please try again." />;
  }

  if (!data.checkUserPurchase.success) {
    return <View403 subTitle={data.checkUserPurchase.message || 'Access denied.'} />;
  }

  // If user has purchased, redirect to destiny with history ID
  // This must be outside of any try-catch block
  // Skip redirect if user confirmed they want to make another purchase
  if (
    data.checkUserPurchase.result?.has_purchased &&
    data.checkUserPurchase.result?.history_id &&
    confirmAnotherPurchase !== 'true'
  ) {
    const destinyUrl = `${paths.destiny}?history=${data.checkUserPurchase.result.history_id}${isShine === 'true' ? '&shine=true' : ''}`;
    redirect(destinyUrl);
  }

  // If user hasn't purchased, show payment view
  return (
    <PaymentView
      years={amount}
      isShine={isShine === 'true'}
      confirmAnotherPurchase={confirmAnotherPurchase === 'true'}
    />
  );
}
