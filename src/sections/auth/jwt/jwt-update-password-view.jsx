'use client';

import { z as zod } from 'zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useCountdownSeconds } from 'src/hooks/use-countdown';

import { SentIcon } from 'src/assets/icons';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { useMutation } from '@apollo/client';
import { FORGOT_PASSWORD, UPDATE_RESET_PASSWORD } from '@/graphql/mutation/AuthMutation';
import { toast } from 'src/components/snackbar';
import { Alert } from '@mui/material';
import { useTranslate } from '@/locales';

export const UpdatePasswordSchema = zod
  .object({
    code: zod
      .string()
      .min(1, { message: 'Code is required!' })
      .min(6, { message: 'Code must be at least 6 characters!' }),
    email: zod
      .string()
      .min(1, { message: 'Email is required!' })
      .email({ message: 'Email must be a valid email address!' }),
    password: zod
      .string()
      .min(1, { message: 'Password is required!' })
      .min(6, { message: 'Password must be at least 6 characters!' }),
    confirmPassword: zod.string().min(1, { message: 'Confirm password is required!' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match!',
    path: ['confirmPassword'],
  });

// ----------------------------------------------------------------------

export function JwtUpdatePasswordView() {
  const router = useRouter();
  const { t } = useTranslate('app');

  const searchParams = useSearchParams();

  const email = searchParams.get('email');
  const password = useBoolean();
  const [errorMsg, setErrorMsg] = useState('');

  const [updateResetPassword] = useMutation(UPDATE_RESET_PASSWORD);
  const [forgotPass] = useMutation(FORGOT_PASSWORD);

  const { countdown, counting, startCountdown } = useCountdownSeconds(60);

  const defaultValues = {
    code: '',
    email: email || '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues,
  });

  const {
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async ({ code, confirmPassword, email, password }) => {
    try {
      if (password !== confirmPassword) {
        setErrorMsg('The passwords you entered do not match. Please re-enter and try again');

        return;
      }

      const { data } = await updateResetPassword({
        variables: { email: email, pin: code, password: password },
      });

      if (data?.updateResetPassword?.success) {
        toast.success('Reset Successfully', { description: data?.updateResetPassword?.message });

        setTimeout(() => {
          router.push(paths.auth.account.signIn);
        }, 500);

        return;
      }
      setErrorMsg(data?.updateResetPassword?.message);
    } catch (error) {
      setErrorMsg(error.message);
    }
  });

  const handleResendCode = useCallback(async () => {
    try {
      const { data } = await forgotPass({ variables: { email: values.email } });

      startCountdown();

      if (data?.forgotPassword?.success) {
        toast.success('Code Sent Successfully', { description: data?.forgotPassword?.message });

        return;
      }
      toast.error('Unable to send code', { description: data?.forgotPassword?.message });
    } catch (error) {
      toast.error(error.message);
    }
  }, [startCountdown, values.email]);

  const renderHead = (
    <>
      <SentIcon sx={{ mx: 'auto' }} />

      <Stack spacing={1} sx={{ mt: 3, mb: 5, textAlign: 'center', whiteSpace: 'pre-line' }}>
        <Typography variant="h5">{t('authentication.updatePasswordTitle')}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t('authentication.updatePasswordDesc')}
        </Typography>
      </Stack>
    </>
  );

  const renderForm = (
    <Stack spacing={3}>
      <Field.Text
        name="email"
        label={t('authentication.emailAddress') || 'Email address'}
        placeholder="example@gmail.com"
        InputLabelProps={{ shrink: true }}
        disabled
      />

      <Field.Code name="code" />

      <Field.Text
        name="password"
        label="Password"
        placeholder="6+ characters"
        type={password.value ? 'text' : 'password'}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Field.Text
        name="confirmPassword"
        label="Confirm new password"
        type={password.value ? 'text' : 'password'}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton fullWidth size="large" type="submit" variant="outlined" loading={isSubmitting}>
        {t('authentication.updatePassword')}
      </LoadingButton>

      <Typography variant="body2" sx={{ mx: 'auto' }}>
        {t('authentication.dontHaveCode')}
        <Link
          variant="subtitle2"
          onClick={handleResendCode}
          sx={{
            cursor: 'pointer',
            ...(counting && { color: 'text.disabled', pointerEvents: 'none' }),
          }}
        >
          {t('authentication.resendCode')} {counting && `(${countdown}s)`}
        </Link>
      </Typography>

      <Link
        component={RouterLink}
        href={paths.auth.account.signIn}
        color="inherit"
        variant="subtitle2"
        sx={{ gap: 0.5, alignSelf: 'center', alignItems: 'center', display: 'inline-flex' }}
      >
        <Iconify width={16} icon="eva:arrow-ios-back-fill" />
        {t('authentication.returnToSignIn')}
      </Link>
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
    </>
  );
}
