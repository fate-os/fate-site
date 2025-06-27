const ROOTS = {
  AUTH: '/auth',
  APP: '/app',
};

// ----------------------------------------------------------------------

export const paths = {
  payment: '/payment',
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',

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
  },
};
