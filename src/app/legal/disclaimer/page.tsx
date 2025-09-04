import Disclaimer from '@/sections/legals/Disclaimer';
import { CONFIG } from '@/config-global';

export const metadata = { title: `Disclaimer | ${CONFIG.site.name}` };

const page = () => {
  return <Disclaimer></Disclaimer>;
};

export default page;
