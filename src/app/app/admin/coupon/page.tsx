import { CONFIG } from 'src/config-global';

import { CouponListView } from '@/sections/admin/coupon/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Coupon list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <CouponListView />;
}
