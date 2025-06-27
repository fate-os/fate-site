'use client';

import { paths } from 'src/routes/paths';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { AccountGeneral } from '../account-general';
import { AccountModel } from '@/types/app';
// ----------------------------------------------------------------------

type AccountViewAppProps = {
  account: AccountModel;
};

// ----------------------------------------------------------------------

export function AccountView({ account }: AccountViewAppProps) {
  return (
    <>
      <CustomBreadcrumbs
        heading="Profile"
        links={[{ name: 'Dashboard' }, { name: 'Account' }, { name: 'Profile' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <AccountGeneral account={account} />
    </>
  );
}
