'use client';

import { usePathname } from 'next/navigation';
import { CONFIG } from 'src/config-global';
import { AuthGuard } from 'src/auth/guard';
import { MainLayout } from '@/layouts/main';

// ----------------------------------------------------------------------

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();

  // Skip MainLayout for admin routes (they have their own DashboardLayout)
  const isAdminRoute = pathname.startsWith('/app/admin');

  if (CONFIG.auth.skip) {
    return <>{children}</>;
  }

  // For admin routes, just return children without MainLayout
  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <AuthGuard>
      <MainLayout>{children}</MainLayout>
    </AuthGuard>
  );
}
