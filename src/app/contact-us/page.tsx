import ContactUs from '@/sections/contact/contact-us';
import { CONFIG } from '@/config-global';

export const metadata = { title: `Refunc policy | ${CONFIG.site.name}` };

const page = () => {
  return <ContactUs></ContactUs>;
};

export default page;
