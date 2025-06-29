import { CONFIG } from 'src/config-global';

import { JwtResetPasswordView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = { title: `Reset password | ${CONFIG.site.name}` };

export default function Page() {
  return <JwtResetPasswordView />;
}
