'use client';

import { paths } from 'src/routes/paths';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { AccountGeneral } from '../account-general';

// ----------------------------------------------------------------------
import { AccountChangePassword } from '../account-change-password';

// ----------------------------------------------------------------------

export function ChangePasswordView() {
  return (
    <>
      <CustomBreadcrumbs
        heading="Password and security"
        links={[
          { name: 'Dashboard' },
          { name: 'Account settings' },
          { name: 'Password & security' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <AccountChangePassword />
    </>
  );
}
