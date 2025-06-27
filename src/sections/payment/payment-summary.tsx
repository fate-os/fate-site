'use client';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Alert, OutlinedInput, SxProps } from '@mui/material';
import { CouponObject, PriceMode, SubscriptionPlan, SubscriptionType } from '@/types';
import { useState } from 'react';

import { PaymentDialog } from './payment-dialog';
import { SUBSCRIPTION_CONFIG } from '@/config-global';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Form } from '@/components/hook-form';
import { toast } from 'src/components/snackbar';
import { useMutation } from '@apollo/client';
import { APPLY_COUPON } from '@/graphql/mutation/payment';
import { applyDiscount } from '@/utils/parser';
import TermsAcceptance from '../terms-and-policy/TermsAcceptance';

// ----------------------------------------------------------------------

type PaymentSummaryProps = {
  sx?: SxProps;
  other?: any;
  subscription: SubscriptionType;
  priceMode: PriceMode;
  annually?: boolean;
  freeTrial?: boolean;
};

export const PaymentSchema = zod.object({
  code: zod.string().min(1, { message: 'Code is required!' }),
});

export function PaymentSummary({
  sx,
  subscription,
  priceMode,
  annually,
  freeTrial,
  ...other
}: PaymentSummaryProps) {
  const [pricingMode, setPricingMode] = useState<PriceMode>(priceMode || 'gbp');

  const [continuePayment, setContinuePayment] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<CouponObject>();

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
          subscriptionId: subscription.id,
        },
      });

      if (data?.applyCoupon?.success) {
        setAppliedCoupon(data?.applyCoupon?.coupon);
        toast.success(data?.applyCoupon?.message);

        return;
      }
      toast.error(data?.applyCoupon?.message);
    } catch (error: any) {
      toast.error(error?.message);
    }
  });

  const oneTime = subscription.subscription_plan === SubscriptionPlan.LIFE_TIME;

  const priceUsd = annually
    ? subscription.usd_amount * SUBSCRIPTION_CONFIG.month_count_for_annual
    : subscription.usd_amount;
  const priceGbp = annually
    ? subscription.gbp_amount * SUBSCRIPTION_CONFIG.month_count_for_annual
    : subscription.gbp_amount;

  const renderPrice = (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="subtitle1">
        {subscription.subscription_plan === SubscriptionPlan.LIFE_TIME
          ? 'Once'
          : annually
            ? 'Annually'
            : 'Monthly'}
      </Typography>
      <Stack direction="row">
        {!oneTime && annually && (
          <Typography variant="subtitle2" component={'del'} mr={2}>
            {pricingMode === 'usd' ? '$' : '£'}
            {pricingMode === 'usd'
              ? (
                  subscription.usd_amount * SUBSCRIPTION_CONFIG.general_month_count_for_annual
                ).toFixed(2)
              : (
                  subscription.gbp_amount * SUBSCRIPTION_CONFIG.general_month_count_for_annual
                ).toFixed(2)}
          </Typography>
        )}
        <Typography variant="h4">{pricingMode === 'usd' ? '$' : '£'}</Typography>

        <Typography variant="h2">
          {pricingMode === 'usd' ? priceUsd.toFixed(2) : priceGbp.toFixed(2)}
        </Typography>

        {/* {subscription.subscription_plan !== 'LIFE_TIME' && (
          <Typography
            component="span"
            sx={{
              ml: 1,
              alignSelf: 'center',
              typography: 'body2',
              color: 'text.disabled',
            }}
          >
            / mo
          </Typography>
        )} */}
      </Stack>
    </Stack>
  );

  return (
    <>
      <Box
        sx={{
          p: { md: 5, xs: 3 },
          borderRadius: 2,
          bgcolor: 'background.neutral',
          ...sx,
        }}
        {...other}
      >
        <Typography variant="h6" sx={{ mb: 5 }}>
          Summary
        </Typography>

        <Stack spacing={2.5}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {subscription.subscription_plan === SubscriptionPlan.LIFE_TIME
                ? 'One Time Payment'
                : 'Subscription'}
            </Typography>
            {/* @ts-ignore */}
            <Label color="primary">{subscription.subscription_name?.toUpperCase()}</Label>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Bill in {priceMode === 'usd' ? 'GBP' : 'USD'}
              {/* Bill in USD */}
            </Typography>
            <Switch
              value={pricingMode}
              onChange={(e) => {
                if (pricingMode === 'usd') {
                  setPricingMode('gbp');
                } else {
                  setPricingMode('usd');
                }
              }}
            />
          </Stack>

          {renderPrice}
          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box>
            <Form methods={methods} onSubmit={onSubmit}>
              <Stack direction={'row'} spacing={2}>
                <Field.Text
                  name="code"
                  label="Promo/Coupon code"
                  placeholder="Enter Promo/Coupon code"
                  disabled={Boolean(appliedCoupon)}
                ></Field.Text>
                <Box>
                  <Button
                    variant="outlined"
                    color="warning"
                    type="submit"
                    size="large"
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
                A {appliedCoupon.percent_off}% discount has been applied using your{' '}
                {appliedCoupon.name} coupon code.
              </Alert>
            )}
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            {freeTrial ? (
              <>
                <Typography variant="subtitle2">Today's total</Typography>
                <Typography variant="subtitle2">{pricingMode === 'usd' ? '$0' : '£0'}</Typography>
              </>
            ) : (
              <>
                <Typography variant="subtitle1">Total billed</Typography>
                <Typography variant="subtitle1">
                  {pricingMode === 'usd' ? '$' : '£'}
                  {pricingMode === 'usd'
                    ? applyDiscount(priceUsd.toFixed(2), appliedCoupon?.percent_off || 0)
                    : applyDiscount(priceGbp.toFixed(2), appliedCoupon?.percent_off || 0)}
                </Typography>
              </>
            )}
          </Stack>

          <Divider sx={{ borderStyle: 'dashed' }} />
          {freeTrial && (
            <>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="body1">
                  <strong>Total</strong> billed {moment(new Date()).add('days', 7).format('LL')}
                </Typography>
                <Typography variant="subtitle1">
                  {pricingMode === 'usd' ? '$' : '£'}
                  {annually ? (
                    <>
                      {pricingMode === 'usd'
                        ? applyDiscount(priceUsd.toFixed(2), appliedCoupon?.percent_off || 0)
                        : applyDiscount(priceGbp.toFixed(2), appliedCoupon?.percent_off || 0)}
                    </>
                  ) : (
                    <>
                      {pricingMode === 'usd'
                        ? applyDiscount(
                            subscription.usd_amount.toFixed(2),
                            appliedCoupon?.percent_off || 0
                          )
                        : applyDiscount(
                            subscription.gbp_amount.toFixed(2),
                            appliedCoupon?.percent_off || 0
                          )}
                    </>
                  )}
                </Typography>
              </Stack>
              <Divider sx={{ borderStyle: 'dashed' }} />
            </>
          )}
        </Stack>

        <Typography component="div" variant="caption" sx={{ color: 'text.secondary', mt: 2 }}>
          * Plus applicable taxes
        </Typography>

        <TermsAcceptance reason="continuing"></TermsAcceptance>

        <Button
          fullWidth
          size="large"
          variant="contained"
          sx={{ mt: 5, mb: 3 }}
          type="submit"
          onClick={() => setContinuePayment(subscription.id)}
        >
          Proceed to Checkout
        </Button>

        <Stack alignItems="center" spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            {/* @ts-ignore */}
            <Iconify icon="solar:shield-check-bold" sx={{ color: 'success.main' }} />
            <Typography variant="subtitle2">Secure payment by stripe</Typography>
          </Stack>

          <Typography variant="caption" sx={{ color: 'text.disabled', textAlign: 'center' }}>
            This is a secure 128-bit SSL encrypted payment
          </Typography>
        </Stack>
      </Box>
      {continuePayment && (
        <PaymentDialog
          currency={pricingMode}
          open={Boolean(continuePayment)}
          onClose={() => setContinuePayment('')}
          subscriptionId={continuePayment}
          annually={annually}
          freeTrial={freeTrial}
          couponId={appliedCoupon ? appliedCoupon.id : undefined}
        ></PaymentDialog>
      )}
    </>
  );
}
