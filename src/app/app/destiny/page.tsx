'use client';

import { useEffect, useState } from 'react';
import PurchaseFirst from '@/sections/destiny/view/PurchaseFirst';
import { CONFIG } from 'src/config-global';
import { DestinyView } from 'src/sections/destiny/view';
import { useAppSelector } from '@/store/hooks';
import { SplashScreen } from '@/components/loading-screen';
import { View500 } from '@/sections/error';
import { useQuery } from '@apollo/client';
import { CHECK_USER_PURCHASE } from '@/graphql/query/Payment';
import { CheckUserPurchaseResponse } from '@/types';

// ----------------------------------------------------------------------

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ history: string; shine?: string }>;
  params: Promise<{}>;
}) {
  const [params, setParams] = useState<{ history?: string; shine?: string }>({});
  const [error, setError] = useState<string | null>(null);
  const { account, loadingAccount } = useAppSelector((s) => s.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadParams = async () => {
      try {
        const resolvedParams = await searchParams;
        setParams(resolvedParams);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading search params:', err);
        setError('Failed to load page. Please try again.');
        setIsLoading(false);
      }
    };
    loadParams();
  }, [searchParams]);

  // Extract parameters
  const { history, shine } = params;
  const isShine = shine === 'true';
  const years = isShine ? 60 : 1; // Default to 1 year if not specified

  // GraphQL query to check user purchase (similar to payment page)
  const {
    data: purchaseData,
    loading: purchaseLoading,
    error: purchaseError,
  } = useQuery<CheckUserPurchaseResponse>(CHECK_USER_PURCHASE, {
    variables: {
      years,
      shine: isShine,
    },
    skip: !account || account.super_admin === true, // Skip query for super admins
    errorPolicy: 'all',
    fetchPolicy: 'network-only',
  });

  // Show error page if there's an error
  if (error) {
    return <View500 subTitle={error} />;
  }

  // Show loading while resolving search params, loading account, or checking purchase
  if (isLoading || loadingAccount || purchaseLoading) {
    return <SplashScreen />;
  }

  try {
    // Check if user is super admin - if so, skip purchase requirement
    const isSuperAdmin = account?.super_admin === true;

    // If user is super admin, show destiny view
    if (isSuperAdmin) {
      return <DestinyView />;
    }

    // If user has a valid history ID, show destiny view
    if (history && history !== 'admin-bypass') {
      return <DestinyView />;
    }

    // Check purchase data for non-admin users (similar to payment page logic)
    if (purchaseError) {
      console.error('Purchase check error:', purchaseError);
      return <View500 subTitle="Failed to verify purchase. Please try again later." />;
    }

    if (
      purchaseData?.checkUserPurchase?.success &&
      purchaseData.checkUserPurchase.result?.has_purchased
    ) {
      return <DestinyView />;
    }

    // If no valid purchase found, show purchase screen
    return <PurchaseFirst />;
  } catch (err) {
    console.error('Error in destiny page render:', err);
    return <View500 subTitle="An unexpected error occurred. Please try again." />;
  }
}
