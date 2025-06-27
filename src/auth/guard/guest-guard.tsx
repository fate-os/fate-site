'use client';

import { useState, useEffect } from 'react';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { CONFIG, PLAN_CURRENCY_STORAGE_KEY, PLAN_STORAGE_KEY } from 'src/config-global';

import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../hooks';
import { useAppSelector } from '@/store/hooks';
import { paths } from '@/routes/paths';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function GuestGuard({ children }: Props) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const { account, loadingAccount } = useAppSelector((s) => s.auth);

  const [isChecking, setIsChecking] = useState(true);

  const returnTo = searchParams.get('returnTo') || CONFIG.auth.redirectPath;

  const checkPermissions = async () => {
    if (loadingAccount) {
      return;
    }

    // const planSelected = localStorage.getItem(PLAN_STORAGE_KEY);
    // const planCurrency = localStorage.getItem(PLAN_CURRENCY_STORAGE_KEY);

    // if (planSelected && account) {
    //   router.replace(
    //     paths.payment + `?chooseId=${planSelected}&currency=${planCurrency ? planCurrency : 'usd'}`
    //   );
    //   return;
    // }

    if (account) {
      router.replace(returnTo);
      return;
    }

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
