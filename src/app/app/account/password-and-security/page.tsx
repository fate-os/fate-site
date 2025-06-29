import { CONFIG } from 'src/config-global';

import { ChangePasswordView } from 'src/sections/account/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Password and security | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <ChangePasswordView />;
}
