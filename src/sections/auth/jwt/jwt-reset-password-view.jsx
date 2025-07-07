'use client';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { PasswordIcon } from 'src/assets/icons';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { useMutation } from '@apollo/client';
import { FORGOT_PASSWORD } from '@/graphql/mutation/AuthMutation';
import { useState } from 'react';
import { Alert } from '@mui/material';
import { useTranslate } from '@/locales';

// ----------------------------------------------------------------------

export const ResetPasswordSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
});

// ----------------------------------------------------------------------

export function JwtResetPasswordView() {
  const router = useRouter();
  const { t } = useTranslate('app');
  const [errorMsg, setErrorMsg] = useState('');

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [forgotPass] = useMutation(FORGOT_PASSWORD);

  const onSubmit = handleSubmit(async (submitData) => {
    try {
      const { data } = await forgotPass({ variables: { email: submitData.email } });

      if (data?.forgotPassword?.success) {
        const searchParams = new URLSearchParams({ email: submitData.email }).toString();
        const href = `${paths.auth.account.updatePassword}?${searchParams}`;
        router.push(href);
        return;
      }

      setErrorMsg(data?.forgotPassword?.message);
    } catch (error) {
      setErrorMsg(error.message);
    }
  });

  const renderHead = (
    <>
      <PasswordIcon sx={{ mx: 'auto' }} />

      <Stack spacing={1} sx={{ mt: 3, mb: 5, textAlign: 'center', whiteSpace: 'pre-line' }}>
        <Typography variant="h5">{t('authentication.resetPasswordTitle')}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t('authentication.resetPasswordDesc')}
        </Typography>
      </Stack>
    </>
  );

  const renderForm = (
    <Stack spacing={3}>
      <Field.Text
        autoFocus
        name="email"
        label={t('authentication.emailAddress') || 'Email address'}
        placeholder="example@gmail.com"
      />

      <LoadingButton fullWidth size="large" type="submit" variant="outlined" loading={isSubmitting}>
        {t('authentication.sendRequest')}
      </LoadingButton>

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
