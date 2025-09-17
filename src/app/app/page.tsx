import React from 'react';

import { HAS_PURCHASE_HISTORY } from '@/graphql/query/Payment';
import { HasPurchaseHistoryResponse, HasPurchaseHistory } from '@/types';

import PortalPage from '@/sections/portal/';
import { getClient } from '@/lib/apolloClientServer';

const page = async () => {
  let purchaseHistoryData: HasPurchaseHistory | null = null;
  let showAlert = false;

  try {
    const apolloClient = await getClient();
    const { data } = await apolloClient.query<HasPurchaseHistoryResponse>({
      query: HAS_PURCHASE_HISTORY,
      // fetchPolicy: 'no-cache', // Ensure fresh data for SSR
    });

    if (data?.hasPurchaseHistory?.success) {
      purchaseHistoryData = data.hasPurchaseHistory.result;
      showAlert = purchaseHistoryData.has_purchase_history;
    }
  } catch (error) {
    console.error('Error checking purchase history:', error);
    // Don't show alert if there's an error
    showAlert = false;
  }

  return (
    <>
      <PortalPage hasPurchaseHistory={showAlert} purchaseHistoryData={purchaseHistoryData} />
    </>
  );
};

export default page;
