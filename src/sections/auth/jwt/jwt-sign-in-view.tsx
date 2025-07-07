'use client';

import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { toast } from 'src/components/snackbar';

import { LOGIN_ACCOUNT } from '@/graphql/mutation/AuthMutation';
import { useMutation } from '@apollo/client';
import { accountInitialize } from '@/store/features/auth.reducer';
import { useAppDispatch } from '@/store/hooks';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN } from '@/config-global';
import TermsAcceptance from '@/sections/terms-and-policy/TermsAcceptance';
import { useTranslate } from '@/locales';

// ----------------------------------------------------------------------

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});

// ----------------------------------------------------------------------

type JwtSignInViewProps = {
  showLess?: boolean;
};

export function JwtSignInView({ showLess }: JwtSignInViewProps) {
  const router = useRouter();
  const { t } = useTranslate('app');

  const [login, { loading }] = useMutation(LOGIN_ACCOUNT);

  const [errorMsg, setErrorMsg] = useState('');

  const password = useBoolean();
  const dispatch = useAppDispatch();

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (submitData) => {
    try {
      const { data } = await login({ variables: { input: submitData } });

      if (data?.login) {
        if (data?.login?.success) {
          dispatch(accountInitialize(data?.login?.account));
          Cookies.set(ACCESS_TOKEN, data?.login?.token, { expires: 7 });
          const href = `${paths.app}`;
          router.push(href);
          return;
        }
        // if (!data?.login.success && !data?.login?.verify && data?.login?.email) {
        //   toast.info('Verification required!', { description: data?.login?.message });

        //   setTimeout(() => {
        //     const searchParams = new URLSearchParams({ email: submitData.email }).toString();
        //     const href = `${paths.auth.account.verify}?${searchParams}`;
        //     router.push(href);
        //   }, 500);

        //   return;
        // }

        setErrorMsg(data?.login?.message);
      }
    } catch (error: any) {
      setErrorMsg(error instanceof Error ? error.message : error);
    }
  });

  const renderHead = (
    <Stack spacing={1.5} sx={{ mb: 5 }}>
      <Typography variant="h5">{t('authentication.signInTitle')}</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t('authentication.noAccount')}
        </Typography>

        <Link
          component={RouterLink}
          href={paths.auth.account.signUp}
          variant="subtitle1"
          sx={{ textDecoration: 'underline' }}
        >
          {t('authentication.register')}
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={3}>
      <Stack spacing={3}>
        <Field.Text
          name="email"
          label={t('authentication.emailAddress') || 'Email address'}
          size={showLess ? 'small' : 'large'}
        />

        <Stack spacing={1.5}>
          <Field.Text
            name="password"
            label={t('authentication.password') || 'Password'}
            placeholder={t('authentication.passwordPlaceholder') || '6+ characters'}
            type={password.value ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={password.onToggle} edge="end">
                    {/* @ts-ignore */}
                    <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            size={showLess ? 'small' : 'large'}
          />
          <Link
            component={RouterLink}
            href={paths.auth.account.resetPassword}
            variant="body2"
            color="inherit"
            sx={{ alignSelf: 'flex-end' }}
          >
            {t('authentication.forgotPassword')}
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          color="inherit"
          size={showLess ? 'small' : 'large'}
          type="submit"
          variant="outlined"
          loading={isSubmitting || loading}
        >
          {t('authentication.login')}
        </LoadingButton>
      </Stack>
    </Stack>
  );

  return (
    <>
      {renderHead}

      {!!errorMsg && (
        <Alert severity="error" variant="outlined" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>
      {!showLess && <TermsAcceptance></TermsAcceptance>}
    </>
  );
}
