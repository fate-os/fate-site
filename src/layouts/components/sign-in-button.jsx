import Button from '@mui/material/Button';

import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/config-global';
import { useAppSelector } from '@/store/hooks';
import { paths } from '@/routes/paths';

// ----------------------------------------------------------------------

export function SignInButton({ sx, ...other }) {
  const { account } = useAppSelector((s) => s.auth);

  return (
    <>
      {account ? (
        <Button component={RouterLink} href={paths.app} variant="text" sx={sx} {...other}>
          Portal
        </Button>
      ) : (
        <Button
          component={RouterLink}
          href={CONFIG.auth.loginPath}
          variant="text"
          sx={sx}
          {...other}
        >
          Log in
        </Button>
      )}
    </>
  );
}
