import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { RouterLink } from 'src/routes/components';

import { Logo } from 'src/components/logo';
import { SocialIcon } from 'src/components/iconify';
import TermsAcceptance from 'src/sections/terms-and-policy/TermsAcceptance';

// ----------------------------------------------------------------------

const LINKS = [
  // {
  //   headline: 'fateOs',
  //   children: [
  //     { name: 'About us', href: paths.about },
  //     { name: 'Contact us', href: paths.contact },
  //   ],
  // },
  {
    headline: 'Legal',
    children: [
      { name: 'Terms and conditions', href: '/terms' },
      { name: 'Privacy policy', href: '/privacy-policy' },
    ],
  },
  {
    headline: 'Contact',
    children: [
      {
        name: 'contact@fate-os.com',
        href: 'mailto:contact@fate-os.com?subject=[Contact]',
      },
    ],
  },
];

// ----------------------------------------------------------------------

export function Footer({ layoutQuery, sx }) {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: '#f7f8fa',
        borderTop: '1px solid #e5e7eb',
        ...sx,
      }}
    >
      <Container
        sx={{
          py: { xs: 6, md: 10 },
          textAlign: 'center',
          [theme.breakpoints.up(layoutQuery)]: { textAlign: 'unset' },
        }}
      >
        <Logo sx={{ height: 36, mb: 2 }} />
        <Grid
          container
          spacing={4}
          sx={{
            mt: 1,
            justifyContent: 'center',
            [theme.breakpoints.up(layoutQuery)]: { justifyContent: 'space-between' },
          }}
        >
          <Grid {...{ xs: 12, md: 4 }}>
            <Typography
              variant="subtitle2"
              sx={{
                mx: 'auto',
                maxWidth: 320,
                color: 'text.secondary',
                fontWeight: 400,
                [theme.breakpoints.up(layoutQuery)]: { mx: 'unset' },
              }}
            >
              The world's first metaphysical platform empowering you to understand and design your
              own destiny.
            </Typography>
          </Grid>

          <Grid {...{ xs: 12, md: 8 }}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={{ xs: 3, md: 6 }}
              justifyContent="center"
              alignItems={{ xs: 'center', md: 'flex-start' }}
            >
              {LINKS.map((list) => (
                <Stack key={list.headline} spacing={1} sx={{ minWidth: 120 }}>
                  <Typography
                    component="div"
                    variant="overline"
                    sx={{ color: 'text.secondary', fontWeight: 700 }}
                  >
                    {list.headline}
                  </Typography>
                  {list.children.map((link) => (
                    <Link
                      key={link.name}
                      component={RouterLink}
                      href={link.href}
                      color="inherit"
                      variant="body2"
                      underline="none"
                      sx={{
                        transition: 'color 0.2s',
                        '&:hover': { color: 'primary.main', textDecoration: 'underline' },
                        fontWeight: 400,
                        fontSize: 15,
                      }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, borderColor: '#e5e7eb' }} />
        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          © {new Date().getFullYear()} Fate Os. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function HomeFooter({ sx }) {
  return (
    <Box
      component="footer"
      sx={{
        py: 5,
        textAlign: 'center',
        position: 'relative',
        bgcolor: 'background.default',
        ...sx,
      }}
    >
      <Container>
        <Logo />

        <Box sx={{ typography: 'caption' }}>© All rights reserved.</Box>
      </Container>
    </Box>
  );
}
