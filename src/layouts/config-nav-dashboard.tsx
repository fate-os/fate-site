import { paths } from 'src/routes/paths';
import { CONFIG } from 'src/config-global';
import { Iconify } from '@/components/iconify';

// ----------------------------------------------------------------------

const ICONS = {
  coupon: <Iconify icon="hugeicons:coupon-02"></Iconify>,
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  // {
  //   subheader: 'Overview',
  //   items: [
  //     { title: 'Dashboard', path: paths.dashboard.app, icon: ICONS.dashboard },
  //     { title: 'Watch Intro Videos', path: paths.howToUse, icon: ICONS.howToUse },
  //   ],
  // },
];

export const adminNavData = [
  /**
   * Admin Data
   */
  // {
  //   subheader: 'Admin Management',
  //   items: [
  //     {
  //       title: 'Coupon',
  //       path: paths.dashboard.coupon.root,
  //       icon: ICONS.coupon,
  //       children: [
  //         { title: 'List', path: paths.dashboard.coupon.root },
  //         { title: 'Create', path: paths.dashboard.coupon.new },
  //       ],
  //     },
  //   ],
  // },
];
