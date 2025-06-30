import { CONFIG } from 'src/config-global';

import { PaymentView } from 'src/sections/payment/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Payment - ${CONFIG.site.name}` };

export default async function Page({
  params,
}: {
  searchParams: any;
  params: Promise<{ amount: string }>;
}) {
  const { amount } = await params;

  return <PaymentView years={amount} />;
}
