import { CONFIG } from 'src/config-global';

import { CouponCreateView } from '@/sections/admin/coupon/view';

import { View500 } from '@/sections/error';

// ----------------------------------------------------------------------

export const metadata = { title: `Create a new coupon | Dashboard - ${CONFIG.site.name}` };

export default async function Page() {
  try {
    return <CouponCreateView />;
  } catch (error: any) {
    return <View500 subTitle={error.message} />;
  }
}
