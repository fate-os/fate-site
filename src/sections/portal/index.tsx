import React from 'react';
import PortalView from './portal-view';
import PurchaseAlert from './purchase-alert';
import { HasPurchaseHistory } from '@/types';

type Props = {
  hasPurchaseHistory?: boolean;
  purchaseHistoryData?: HasPurchaseHistory | null;
};

const index = ({ hasPurchaseHistory, purchaseHistoryData }: Props) => {
  return (
    <>
      <PurchaseAlert
        hasPurchaseHistory={hasPurchaseHistory}
        purchaseHistoryData={purchaseHistoryData}
      />
      <PortalView></PortalView>
    </>
  );
};

export default index;
