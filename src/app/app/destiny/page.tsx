import PurchaseFirst from '@/sections/destiny/view/PurchaseFirst';
import { CONFIG } from 'src/config-global';

import { DestinyView } from 'src/sections/destiny/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Destiny | ${CONFIG.site.name}` };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ history: string }>;
  params: Promise<{}>;
}) {
  // const { history } = await searchParams;

  // if (!history) {
  //   return <PurchaseFirst></PurchaseFirst>;
  // }

  return <DestinyView />;
}
