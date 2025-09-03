import { CONFIG } from '@/config-global';
import Terms from 'src/sections/terms-and-policy/Terms';

export const metadata = { title: `Terms & Conditions | ${CONFIG.site.name}` };

const page = () => {
  return <Terms></Terms>;
};

export default page;
