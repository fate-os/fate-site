import { AuthCenteredLayout } from 'src/layouts/auth-centered';

import { GuestGuard } from 'src/auth/guard';
import { MainLayout } from '@/layouts/main';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <GuestGuard>
      <MainLayout>{children}</MainLayout>
    </GuestGuard>
  );
}
