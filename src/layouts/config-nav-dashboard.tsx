import { paths } from 'src/routes/paths';
import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';
import { Iconify } from '@/components/iconify';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  deck: icon('ic-deck'),

  egostate: (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.3}
      >
        <path d="M20.942 13.018A9 9 0 1 0 12 21M9 10h.01M15 10h.01"></path>
        <path d="M9.5 15c.658.672 1.56 1 2.5 1q.32 0 .63-.05M16 22l5-5m0 4.5V17h-4.5"></path>
      </g>
    </svg>
  ),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
];

export const adminNavData = [
  /**
   * Admin Data
   */
];
