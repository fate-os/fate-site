'use client';

import { useState, useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter, usePathname, useSearchParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';

import { SplashScreen } from 'src/components/loading-screen';
import { useAppSelector } from '@/store/hooks';

// ----------------------------------------------------------------------
type Props = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: Props) {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const { account, loadingAccount } = useAppSelector((s) => s.auth);

  const [isChecking, setIsChecking] = useState(true);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  // // Check if current path requires admin privileges
  // const isAdminProtectedPath = useCallback((currentPath: string) => {
  //   return ADMIN_ONLY_PATHS.some((protectedPath) => currentPath.startsWith(protectedPath));
  // }, []);

  const checkPermissions = async () => {
    if (loadingAccount) {
      return;
    }

    if (!account) {
      const { method } = CONFIG.auth;

      const signInPath = {
        account: paths.auth.account.signIn,
      }[method];

      const href = `${'/'}?${createQueryString('returnTo', pathname)}`;

      router.replace(href);
      return;
    }

    // Check if path requires admin privileges
    // if (isAdminProtectedPath(pathname)) {
    //   const isAdmin = account?.super_admin === true;

    //   if (!isAdmin) {
    //     // Redirect to 403 page if trying to access protected path without admin rights
    //     router.replace(paths.page403);
    //     return;
    //   }
    // }

    setIsChecking(false);
  };

  useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, loadingAccount]);

  if (isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
