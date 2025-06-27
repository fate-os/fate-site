'use client';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { fData } from 'src/utils/format-number';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';
import { AccountModel } from '@/types/app';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_PROFILE } from '@/graphql/mutation/settings';
import axios from 'axios';
import { ACCESS_TOKEN, CONFIG } from '@/config-global';
import { signOut } from '@/auth/context/jwt';
import { capitalize } from '@/utils/parser';
import Cookies from 'js-cookie';

// ----------------------------------------------------------------------

export const UpdateUserSchema = zod.object({
  first_name: zod.string().min(1, { message: 'First name is required!' }),
  last_name: zod.string().min(1, { message: 'Last name is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email primary_address!' }),
  photo_url: zod.any({}),
  phone_number: zod.string().min(1, { message: 'Phone number is required!' }),
  // phone_number: schemaHelper.phone_number({ isValidPhoneNumber }),
  country_name: schemaHelper.objectOrNull({
    message: { required_error: 'Country is required!' },
  }),
  primary_address: zod.string().min(1, { message: 'Address is required!' }),
  primary_state: zod.string().min(1, { message: 'State is required!' }),
  primary_city: zod.string().min(1, { message: 'City is required!' }),
  zip_code: zod.string().min(1, { message: 'Zip code is required!' }),
  about_description: zod.string().min(1, { message: 'About is required!' }),
});

type AccountGeneralProps = {
  account: AccountModel;
};

export function AccountGeneral({ account }: AccountGeneralProps) {
  const defaultValues = {
    first_name: account?.first_name || '',
    last_name: account?.last_name || '',
    email: account?.email || '',
    photo_url: account?.photo_url || null,
    phone_number: account?.phone_number || '',
    country_name: account?.country_name ? capitalize(account?.country_name) : '',
    primary_address: account?.primary_address || '',
    primary_state: account?.primary_state || '',
    primary_city: account?.primary_city || '',
    zip_code: account?.zip_code || '',
    about_description: account?.about_description || '',
  };

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // gq
  const [updateProfile, { loading: updateLoading }] = useMutation(UPDATE_USER_PROFILE);

  const profilePhotoUpload = async (file: File) => {
    try {
      if (!account?.id) {
        toast.warning('Id is missing');

        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      const getCookie = Cookies.get(ACCESS_TOKEN);

      const { data } = await axios.post(
        `${CONFIG.site.serverUrl}/settings/account/profile`,
        formData,
        {
          headers: { Authorization: getCookie ? `Bearer ${getCookie}` : '' },
        }
      );

      if (data?.success) {
        // dispatch(userPhotoUpdate(data.photo_url));

        return;
      }
      toast.error(data.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      const {
        email,
        first_name,
        last_name,
        country_name,
        phone_number,
        zip_code,
        about_description,
        primary_city,
        primary_state,
        primary_address,
        photo_url,
      } = values;

      if (photo_url && photo_url !== account.photo_url) {
        await profilePhotoUpload(photo_url as any);
      }

      const { data } = await updateProfile({
        variables: {
          input: {
            email,
            first_name,
            last_name,
            country_name: country_name,
            phone_number: String(phone_number),
            zip_code: String(zip_code),
            about_description,
            primary_city,
            primary_state,
            primary_address,
          },
        },
      });

      if (data?.updateProfile?.success) {
        if (data.updateProfile?.logout) {
          toast.info(data.updateProfile?.message, {
            description:
              'Your email address has been successfully changed. For security reasons, you will now be logged out.',
          });
          setTimeout(() => {
            signOut().then(() => {});
          }, 2500);
          return;
        } else {
          toast.success(data.updateProfile?.message);
        }

        window.location.reload();

        return;
      }
      toast.error(data.updateProfile?.message);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        /
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <Field.Text name="first_name" label="First name" />
              <Field.Text name="last_name" label="Last name" />

              <Field.Text name="email" label="Email address" />
              {/* <Field.Phone name="phone_number" label="Phone number" /> */}
              <Field.Text name="phone_number" label="Phone number" />
              <Field.CountrySelect
                name="country_name"
                label="Country"
                placeholder="Choose a country"
              />

              <Field.Text name="primary_state" label="State/region" />
              <Field.Text name="primary_city" label="City" />
              <Field.Text name="zip_code" label="Zip/code" />
              <Field.Text name="primary_address" label="Address" />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <Field.Text name="about_description" multiline rows={4} label="About" />

              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting || updateLoading}
              >
                Save changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
