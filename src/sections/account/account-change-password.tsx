import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useBoolean } from 'src/hooks/use-boolean';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { useAppSelector } from '@/store/hooks';
import { AccountProvider } from '@/types/';
import { Alert, Box } from '@mui/material';
import { useMutation } from '@apollo/client';
import { UPDATE_PASSWORD } from '@/graphql/mutation/AuthMutation';

export const ChangePassWordSchema = zod
  .object({
    oldPassword: zod
      .string()
      .min(1, { message: 'Password is required!' })
      .min(6, { message: 'Password must be at least 6 characters!' }),
    newPassword: zod
      .string()
      .min(1, { message: 'New password is required!' })
      .min(8, { message: 'New password must be at least 8 characters!' }),
    confirmNewPassword: zod.string().min(1, { message: 'Confirm password is required!' }),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: 'New password must be different than old password',
    path: ['newPassword'],
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match!',
    path: ['confirmNewPassword'],
  });

// ----------------------------------------------------------------------

export function AccountChangePassword() {
  const password = useBoolean();

  const { account } = useAppSelector((s) => s.auth);

  const defaultValues = { oldPassword: '', newPassword: '', confirmNewPassword: '' };

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [updatePassword, { loading }] = useMutation(UPDATE_PASSWORD);

  const onSubmit = handleSubmit(async (values) => {
    try {
      const { data } = await updatePassword({
        variables: {
          newPassword: values.confirmNewPassword,
          currentPassword: values.oldPassword,
        },
      });

      if (data?.updatePassword?.success) {
        toast.success(data.updatePassword?.message);
        reset();
        return;
      }
      toast.error(data.updatePassword?.message);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3, gap: 3, display: 'flex', flexDirection: 'column' }}>
        {account?.account_provider === AccountProvider.GOOGLE && (
          <Box sx={{ mb: 1 }}>
            <Alert severity="info" variant="outlined">
              If you have not yet set a new password, you can do so now. The confirmed password will
              be saved as your current password. The old password field can contain any text, as it
              will be ignored.
            </Alert>
          </Box>
        )}

        <Field.Text
          name="oldPassword"
          type={password.value ? 'text' : 'password'}
          label="Old password"
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
          name="newPassword"
          label="New password"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          helperText={
            <Stack component="span" direction="row" alignItems="center">
              <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} /> Password must be minimum
              8+
            </Stack>
          }
        />

        <Field.Text
          name="confirmNewPassword"
          type={password.value ? 'text' : 'password'}
          label="Confirm new password"
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

        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting || loading}
          sx={{ ml: 'auto' }}
        >
          Save changes
        </LoadingButton>
      </Card>
    </Form>
  );
}
