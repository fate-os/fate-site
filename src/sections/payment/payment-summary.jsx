import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { PaymentDialog } from './payment-dialog';
import { useState } from 'react';
import { useTranslate } from '@/locales';
import { useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Form } from '@/components/hook-form';
import { APPLY_COUPON } from '@/graphql/mutation/payment';
import { useMutation } from '@apollo/client';
import { toast } from 'src/components/snackbar';
import { Alert } from '@mui/material';
import { applyDiscount } from '@/utils/parser';

// ----------------------------------------------------------------------

export const PaymentSchema = zod.object({
  code: zod.string().min(1, { message: 'Code is required!' }),
});

export function PaymentSummary({ years, isShine, confirmAnotherPurchase = false, sx, ...other }) {
  const [continuePayment, setContinuePayment] = useState(0);
  const { t } = useTranslate('app');

  const [appliedCoupon, setAppliedCoupon] = useState();

  const defaultValues = {
    code: '',
  };
  const [applyCoupon, { loading }] = useMutation(APPLY_COUPON);

  const methods = useForm({
    resolver: zodResolver(PaymentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (submitData) => {
    try {
      const { data } = await applyCoupon({
        variables: {
          code: submitData.code,
        },
      });

      if (data?.applyCoupon?.success) {
        setAppliedCoupon(data?.applyCoupon?.coupon);
        toast.success(data?.applyCoupon?.message);

        return;
      }
      toast.error(data?.applyCoupon?.message);
    } catch (error) {
      toast.error(error?.message);
    }
  });

  const totalAmount = years * 100;

  const renderPrice = (
    <Stack direction="row" justifyContent="flex-end">
      <Typography variant="h4">$</Typography>

      <Typography variant="h2">{totalAmount}</Typography>
    </Stack>
  );

  return (
    <Box>
      <Box
        sx={{
          p: 5,
          borderRadius: 2,
          border: (theme) => ({ md: `dashed 1px ${theme.vars.palette.divider}` }),
          ...sx,
        }}
        {...other}
      >
        <Typography variant="h6" sx={{ mb: 5 }}>
          {t('payment.summery')}
        </Typography>

        {confirmAnotherPurchase && (
          <Alert severity="info" sx={{ mb: 3 }}>
            You are making an additional purchase for the same duration. This will give you another
            credit to view different results.
          </Alert>
        )}

        <Stack spacing={2.5}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 700 }}>
              {t('payment.years')}
            </Typography>

            <Label color="error">{years}</Label>
          </Stack>

          {renderPrice}

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1">{t('payment.totalBilled')}</Typography>

            <Typography variant="subtitle1">${totalAmount}*</Typography>
          </Stack>

          {/* <Box>
            <Form methods={methods} onSubmit={onSubmit}>
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <Field.Text
                  name="code"
                  label="Promo/Coupon code"
                  placeholder="Enter Promo/Coupon code"
                  disabled={Boolean(appliedCoupon)}
                  size="small"
                ></Field.Text>
                <Box>
                  <Button
                    variant="outlined"
                    color="warning"
                    type="submit"
                    size="small"
                    loading={isSubmitting || loading}
                    disabled={Boolean(appliedCoupon)}
                  >
                    Apply
                  </Button>
                </Box>
              </Stack>
            </Form>
            {appliedCoupon && (
              <Alert severity="success" sx={{ my: 2 }} variant="outlined">
                You've received a {appliedCoupon.percent_off}% discount using your{' '}
                {appliedCoupon.name} coupon code.
              </Alert>
            )}
          </Box> */}

          {appliedCoupon && (
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1">Total billed after discount</Typography>
              <Typography variant="subtitle1">
                $ {applyDiscount(totalAmount.toFixed(2), appliedCoupon?.percent_off || 0)}
              </Typography>
            </Stack>
          )}

          <Divider sx={{ borderStyle: 'dashed' }} />
        </Stack>

        <Typography component="div" variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
          * {t('payment.plusTax')}
        </Typography>

        <Button
          fullWidth
          size="large"
          variant="contained"
          color="primary"
          onClick={() => setContinuePayment(years)}
          sx={{ mt: 5, mb: 3 }}
        >
          Continue
        </Button>

        <Stack alignItems="center" spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon="solar:shield-check-bold" sx={{ color: 'success.main' }} />
            <Typography variant="subtitle2">Secure payment by Stripe</Typography>
          </Stack>
        </Stack>
      </Box>
      {Boolean(continuePayment) && (
        <PaymentDialog
          open={Boolean(continuePayment)}
          onClose={() => setContinuePayment('')}
          years={continuePayment}
          isShine={isShine}
          couponId={undefined}
        ></PaymentDialog>
      )}
    </Box>
  );
}
