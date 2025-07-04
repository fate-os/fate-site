import { CONFIG } from '@/config-global';
import HomeHero from 'src/sections/home/home-hero';

// ----------------------------------------------------------------------

export const metadata = { title: `Log in | ${CONFIG.site.name}` };

export default function Page() {
  return <HomeHero></HomeHero>;
}
