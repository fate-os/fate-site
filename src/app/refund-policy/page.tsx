import RefundPolicy from '@/sections/terms-and-policy/RefundPolicy';
import { CONFIG } from '@/config-global';

export const metadata = { title: `Refunc policy | ${CONFIG.site.name}` };

const page = () => {
  return <RefundPolicy></RefundPolicy>;
};

export default page;
