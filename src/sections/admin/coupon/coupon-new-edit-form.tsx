import { z as zod } from 'zod';
import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import Grid from '@mui/material/Grid2';
import { useRouter } from 'src/routes/hooks';
import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';
import { useMutation } from '@apollo/client';

import { Avatar, Button, Chip, Typography } from '@mui/material';
import { paths } from '@/routes/paths';
import { CREATE_COUPON } from '@/graphql/mutation/adminMutatin';

// ----------------------------------------------------------------------

export const NewUserSchema = zod.object({
  name: zod.string().min(1, { message: 'Coupon/Promo is required!' }),
  percent_off: zod.number().min(1, { message: 'Percent off is required!' }),
  limit: zod.number(),
});

// ----------------------------------------------------------------------

export function CouponNewEditForm() {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      name: '',
      percent_off: 0,
      limit: 0,
    }),
    []
  );

  const [createCoupon, { loading }] = useMutation(CREATE_COUPON);

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (submitData) => {
    try {
      const { data } = await createCoupon({
        variables: {
          name: submitData.name,
          limit: submitData.limit,
          percentOff: submitData.percent_off,
        },
      });

      if (data?.createCoupon?.success) {
        toast.success(data?.createCoupon?.message);
        reset();
        router.push(paths.dashboard.coupon.root);
        return;
      }
      toast.error(data?.createCoupon?.message);
    } catch (error: any) {
      toast.error(error?.message);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent={'center'}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ p: 3 }}>
            <Stack gap={2}>
              <Field.Text name="name" label="Coupon/Promo code name" />
              <Field.Text name="percent_off" type="number" label="Percent off" />
              <Field.Text name="limit" type="number" label="Limit of usage" />
            </Stack>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                loading={isSubmitting || loading}
              >
                Create coupon
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
