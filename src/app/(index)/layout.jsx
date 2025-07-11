import { GuestGuard } from '@/auth/guard/guest-guard';
import { MainLayout } from 'src/layouts/main';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <MainLayout>
      <GuestGuard>{children}</GuestGuard>
    </MainLayout>
  );
}
