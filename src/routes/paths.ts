const ROOTS = {
  AUTH: '/auth',
  APP: '/app',
};

// ----------------------------------------------------------------------

export const paths = {
  app: ROOTS.APP,
  portal: `${ROOTS.APP}/portal`,
  payment: '/payment',
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
  destiny: `${ROOTS.APP}/destiny`,
  // AUTH
  auth: {
    account: {
      signIn: `${ROOTS.AUTH}/account/sign-in`,
      signUp: `${ROOTS.AUTH}/account/sign-up`,
      updatePassword: `${ROOTS.AUTH}/account/update-password`,
      resetPassword: `${ROOTS.AUTH}/account/reset-password`,
    },
  },
  // subscription: {
  //   index: `${ROOTS.APP}/subscription`,
  // },
  account: {
    profile: `${ROOTS.APP}/account/profile`,
    passwordAndSecurity: `${ROOTS.APP}/account/password-and-security`,
    managePurchase: `${ROOTS.APP}/account/manage-purchase`,
  },
  dashboard: {
    coupon: {
      root: `${ROOTS.APP}/admin/coupon`,
      new: `${ROOTS.APP}/admin/coupon/new`,
    },
  },
};

export const ADMIN_ONLY_PATHS = [paths.dashboard.coupon.root];
