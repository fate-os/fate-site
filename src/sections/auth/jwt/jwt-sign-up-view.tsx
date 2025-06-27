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
import { useAuthContext } from 'src/auth/hooks';

import { REGISTER_ACCOUNT } from '@/graphql/mutation/AuthMutation';
import { useMutation } from '@apollo/client';
import TermsAcceptance from '@/sections/terms-and-policy/TermsAcceptance';
import { useAppDispatch } from '@/store/hooks';
import { accountInitialize } from '@/store/features/auth.reducer';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN } from '@/config-global';

// ----------------------------------------------------------------------

export const SignUpSchema = zod.object({
  first_name: zod.string().min(1, { message: 'First name is required!' }),
  last_name: zod.string().min(1, { message: 'Last name is required!' }),
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

export function JwtSignUpView() {
  const { checkUserSession } = useAuthContext();

  const router = useRouter();

  const password = useBoolean();
  const dispatch = useAppDispatch();

  const [errorMsg, setErrorMsg] = useState('');

  const defaultValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [signup, { loading }] = useMutation(REGISTER_ACCOUNT);

  const onSubmit = handleSubmit(async (signupdata) => {
    try {
      setErrorMsg('');
      const { data } = await signup({
        variables: { input: { ...signupdata, provider: 'EMAIL' } },
      });

      if (data?.register?.success) {
        dispatch(accountInitialize(data?.register?.account));
        Cookies.set(ACCESS_TOKEN, data?.register?.token, { expires: 7 });

        router.push('/');

        return;
      }
      setErrorMsg(data?.register?.message);
    } catch (error: any) {
      setErrorMsg(error instanceof Error ? error.message : error);
    }
  });

  const renderHead = (
    <Stack spacing={1.5} sx={{ mb: 5 }}>
      <Typography variant="h5">Get started absolutely free</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Already have an account?
        </Typography>

        <Link
          component={RouterLink}
          href={paths.auth.account.signIn}
          variant="subtitle1"
          sx={{ textDecoration: 'underline' }}
        >
          Sign in
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={3}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Field.Text name="first_name" label="First name" />
        <Field.Text name="last_name" label="Last name" />
      </Stack>

      <Field.Text name="email" label="Email address" />

      <Field.Text
        name="password"
        label="Password"
        placeholder="6+ characters"
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
      />

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="outlined"
        loading={isSubmitting || loading}
      >
        Continue
      </LoadingButton>
    </Stack>
  );

  return (
    <>
      {renderHead}

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }} variant="outlined">
          {errorMsg}
        </Alert>
      )}

      <Stack spacing={3}>
        <Form methods={methods} onSubmit={onSubmit}>
          {renderForm}
        </Form>
      </Stack>
      <TermsAcceptance></TermsAcceptance>
    </>
  );
}
