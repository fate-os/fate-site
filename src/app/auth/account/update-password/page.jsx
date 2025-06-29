import { CONFIG } from 'src/config-global';

import { JwtUpdatePasswordView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = { title: `Update password | ${CONFIG.site.name}` };

export default function Page() {
  return <JwtUpdatePasswordView />;
}
