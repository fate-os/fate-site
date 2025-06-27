import { CONFIG } from 'src/config-global';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  if (CONFIG.auth.skip) {
    return <>{children}</>;
  }

  return (
    <AuthGuard>
      <>{children}</>
    </AuthGuard>
  );
}
