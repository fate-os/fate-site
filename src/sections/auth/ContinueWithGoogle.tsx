import { Alert, Box, Button, Divider, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useMutation } from '@apollo/client';
import { REGISTER_ACCOUNT } from '@/graphql/mutation/AuthMutation';
import Grid from '@mui/material/Grid2';
import { useAppDispatch } from '@/store/hooks';
import { accountInitialize } from '@/store/features/auth.reducer';
import { ACCESS_TOKEN } from '@/config-global';
import Cookies from 'js-cookie';
import { paths } from '@/routes/paths';
import { useRouter } from 'src/routes/hooks';

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID; // From your environment variables

type Props = {};

const ContinueWithGoogle = (props: Props) => {
  const theme = useTheme();
  const [googleContinue] = useMutation(REGISTER_ACCOUNT);
  const [errorMsg, setErrorMsg] = useState('');

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLoginSuccess = async (response: CredentialResponse) => {
    try {
      const { data } = await googleContinue({
        variables: { input: { credential: response?.credential, provider: 'GOOGLE' } },
      });

      if (data?.register) {
        if (data?.register?.success) {
          dispatch(accountInitialize(data?.register?.account));
          Cookies.set(ACCESS_TOKEN, data?.register?.token, { expires: 7 });
          const href = `${paths.dashboard.app}`;
          router.push(href);
          return;
        }

        setErrorMsg(data?.register?.message);
      }
    } catch (error: any) {
      setErrorMsg(error.message);
    }
  };

  const handleLoginFailure = () => {
    setErrorMsg('Error to continue with google. Please try again');
  };

  return (
    <Grid container spacing={4}>
      {!!errorMsg && (
        <Grid size={12}>
          <Alert severity="error" variant="outlined" sx={{ mb: 3 }}>
            {errorMsg}
          </Alert>
        </Grid>
      )}
      <Grid size={12}>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

          <Button
            variant="outlined"
            sx={{
              cursor: 'unset',
              m: 2,
              py: 0,
              px: 2,
              borderColor: `${theme.palette.divider} !important`,
              fontWeight: 500,
            }}
            disableRipple
            disabled
          >
            Or
          </Button>

          <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
        </Box>
      </Grid>
      <Grid size={12} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
        <GoogleOAuthProvider clientId={clientId as string}>
          <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
        </GoogleOAuthProvider>
      </Grid>
    </Grid>
  );
};

export default ContinueWithGoogle;
