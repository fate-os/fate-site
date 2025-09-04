import Policy from '@/sections/legals/Policy';
import { CONFIG } from '@/config-global';

export const metadata = { title: `Privacy policy | ${CONFIG.site.name}` };

const page = () => {
  return <Policy></Policy>;
};

export default page;
