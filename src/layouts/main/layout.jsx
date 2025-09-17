'use client';

import { useTheme } from '@mui/material/styles';

import { usePathname } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { allLangs } from 'src/locales';
import { Main } from './main';
import { NavMobile } from './nav/mobile';
import { NavDesktop } from './nav/desktop';
import { Footer, HomeFooter } from './footer';
import { HeaderBase } from '../core/header-base';
import { LayoutSection } from '../core/layout-section';
import { navData as mainNavData } from '../config-nav-main';
import { useAppSelector } from '@/store/hooks';
import { Box, Button } from '@mui/material';
import { paths } from '@/routes/paths';
import Link from 'next/link';
import { _account } from '../config-nav-account';

// ----------------------------------------------------------------------

export function MainLayout({ sx, data, children }) {
  const theme = useTheme();
  const { account, loadingAccount } = useAppSelector((s) => s.auth);

  const pathname = usePathname();

  const mobileNavOpen = useBoolean();

  const homePage = pathname === '/';

  const layoutQuery = 'md';

  const navData = data?.nav ?? mainNavData;

  return (
    <>
      <NavMobile data={navData} open={mobileNavOpen.value} b onClose={mobileNavOpen.onFalse} />

      <LayoutSection
        /** **************************************
         * Header
         *************************************** */
        headerSection={
          <HeaderBase
            layoutQuery={layoutQuery}
            onOpenNav={mobileNavOpen.onTrue}
            data={{
              account: account ? _account : [],
              langs: allLangs,
            }}
            slotsDisplay={{
              account: account ? true : loadingAccount ? false : false,
              signIn: false,

              helpLink: false,
              contacts: false,
              searchbar: false,
              workspaces: false,
              localization: true,
              notifications: false,
              settings: false,
              purchase: false,
            }}
            slots={{
              rightAreaStart: (
                <>
                  <NavDesktop
                    data={navData}
                    sx={{
                      display: 'none',
                      [theme.breakpoints.up(layoutQuery)]: {
                        mr: 2.5,
                        display: 'flex',
                      },
                    }}
                  />
                  <Box>
                    {account?.super_admin && (
                      <Button
                        variant="contained"
                        size="small"
                        color="warning"
                        LinkComponent={Link}
                        href={paths.dashboard.coupon.root}
                        sx={{ marginRight: 2 }}
                      >
                        Admin
                      </Button>
                    )}
                  </Box>
                </>
              ),
            }}
          />
        }
        /** **************************************
         * Footer
         *************************************** */
        footerSection={<Footer layoutQuery={layoutQuery} />}
        /** **************************************
         * Style
         *************************************** */
        sx={sx}
      >
        <Main>{children}</Main>
      </LayoutSection>
    </>
  );
}
