import { CONFIG } from 'src/config-global';

import { AuthGuard } from 'src/auth/guard';
import { MainLayout } from '@/layouts/main';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  if (CONFIG.auth.skip) {
    return <>{children}</>;
  }

  return (
    <AuthGuard>
      <MainLayout>{children}</MainLayout>
    </AuthGuard>
  );
}
