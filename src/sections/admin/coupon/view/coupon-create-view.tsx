'use client';

import { paths } from 'src/routes/paths';
import { DashboardContent } from 'src/layouts/dashboard';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { CouponNewEditForm } from '../coupon-new-edit-form';

// ----------------------------------------------------------------------

export function CouponCreateView() {
  return (
    <DashboardContent maxWidth="lg" sx={{ mb: 15 }}>
      <CustomBreadcrumbs
        heading="Fate"
        links={[
          { name: 'Dashboard' },
          { name: 'Coupon', href: paths.dashboard.coupon.root },
          {
            name: 'Create new',
          },
        ]}
        sx={{ mb: { xs: 5, md: 10 } }}
      />
      <CouponNewEditForm></CouponNewEditForm>
    </DashboardContent>
  );
}
