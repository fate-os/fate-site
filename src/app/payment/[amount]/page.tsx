import { CONFIG } from 'src/config-global';
import { PaymentView } from 'src/sections/payment/view';
import { getClient } from '@/lib/apolloClientServer';
import { CHECK_USER_PURCHASE } from '@/graphql/query/Payment';
import { CheckUserPurchaseResponse } from '@/types';
import { View403 } from '@/sections/error';
import { redirect } from 'next/navigation';
import { paths } from '@/routes/paths';

// ----------------------------------------------------------------------

export const metadata = { title: `Payment - ${CONFIG.site.name}` };

export default async function Page({
  params,
  searchParams,
}: {
  searchParams: Promise<{ shine?: string }>;
  params: Promise<{ amount: string }>;
}) {
  const isShine = (await searchParams).shine;
  const { amount } = await params;

  const client = await getClient();
  const { data } = await client.query<CheckUserPurchaseResponse>({
    query: CHECK_USER_PURCHASE,
    variables: {
      years: parseInt(amount),
      shine: isShine === 'true',
    },
  });

  if (!data?.checkUserPurchase?.success) {
    return <View403 subTitle={data?.checkUserPurchase?.message}></View403>;
  }

  // If user has purchased, redirect to destiny with history ID
  if (data?.checkUserPurchase?.result.has_purchased && data?.checkUserPurchase?.result.history_id) {
    const destinyUrl = `${paths.destiny}?history=${data.checkUserPurchase.result.history_id}`;
    redirect(destinyUrl);
  }

  // If user hasn't purchased, show payment view
  return <PaymentView years={amount} isShine={isShine === 'true'} />;
}
