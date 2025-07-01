import { CONFIG } from 'src/config-global';

import { DestinyView } from 'src/sections/destiny/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Destiny | ${CONFIG.site.name}` };

export default function Page() {
  return <DestinyView />;
}
