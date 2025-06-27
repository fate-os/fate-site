'use client';
import React, { useMemo } from 'react';
import { DashboardContent } from '@/layouts/dashboard';
import {
  Box,
  Card,
  Stack,
  Typography,
  useTheme,
  LinearProgress,
  Button,
  Chip,
  Alert,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { PurchasedSubscription, SubscriptionPlan, SubscriptionType, UsageCount } from '@/types';
import { Label } from 'src/components/label';
import { useAppSelector } from '@/store/hooks';
import moment from 'moment';
import { Iconify } from 'src/components/iconify';
import { normalizeValue } from '@/utils/parser';
import Link from 'next/link';
import { paths } from '@/routes/paths';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useBoolean } from '@/hooks/use-boolean';
import { useMutation } from '@apollo/client';
import { CANCEL_CURRENT_SUBSCRIPTION } from '@/graphql/mutation/accountSubscription';
import { toast } from 'src/components/snackbar';

type SubscriptionViewProps = {
  freeSubscription: SubscriptionType;
  usageCount: UsageCount;
  purchasedSubscription: PurchasedSubscription; // use this only for validate
};

export const SubscriptionView: React.FC<SubscriptionViewProps> = ({
  usageCount,
  purchasedSubscription,
  freeSubscription,
}) => {
  const theme: any = useTheme();
  const confirm = useBoolean();

  const subscription = purchasedSubscription.subscription;
  const [cancelSubscription, { loading }] = useMutation(CANCEL_CURRENT_SUBSCRIPTION);

  const { account } = useAppSelector((s) => s.auth);

  const isPro = useMemo(
    () =>
      subscription.subscription_plan === SubscriptionPlan.PREMIUM ||
      subscription.subscription_plan === SubscriptionPlan.LIFE_TIME,
    [subscription]
  );
  const isPaid = useMemo(
    () =>
      subscription.subscription_plan === SubscriptionPlan.PREMIUM ||
      subscription.subscription_plan === SubscriptionPlan.BASIC,
    [subscription]
  );

  const isOneTime = useMemo(
    () => subscription.subscription_plan === SubscriptionPlan.LIFE_TIME,
    [subscription]
  );

  const isMoreThan14Days = useMemo(
    () => moment().diff(moment(purchasedSubscription.created_at, 'YYYY-MM-DD'), 'days') > 14,
    []
  );

  const handleCancel = async () => {
    try {
      const { data } = await cancelSubscription({
        variables: {
          currentSubscriptionId: purchasedSubscription.id,
        },
      });

      if (data?.cancelSubscription?.success) {
        window.location.href = paths.dashboard.app;
        return;
      }
      toast.error('Unable to cancelation', { description: data?.cancelSubscription?.message });
    } catch (error: any) {
      toast.error('Unable to cancelation', { description: error?.message });
    } finally {
      confirm.onFalse();
    }
  };

  return (
    <>
      <DashboardContent maxWidth="xl">
        <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
          Billing & Usage
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Card
              sx={{
                p: 3,
                boxShadow: 'none',
                border: (t) => `1px solid ${t.palette.divider}`,
              }}
            >
              <Box>
                <Typography variant="h5">Current Plan</Typography>
              </Box>
              <Stack sx={{ mt: 1 }}>
                <Stack gap={2}>
                  <Box>
                    <Box>
                      <Label color="primary" variant="filled" sx={{ letterSpacing: 1.2 }}>
                        {subscription.subscription_name?.toUpperCase()}
                      </Label>
                      <Typography variant="subtitle2" color="textSecondary" mt={1}>
                        Joined on {moment(account?.created_at).format('LL')}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                      {subscription.subscription_plan !== SubscriptionPlan.FREE && (
                        <Box>
                          <Button color={'error'} onClick={confirm.onTrue}>
                            {subscription.subscription_plan === SubscriptionPlan.LIFE_TIME
                              ? 'Cancel lifetime plan'
                              : 'Cancel subscription'}{' '}
                          </Button>
                        </Box>
                      )}
                      <Box>
                        <Button
                          color={'primary'}
                          variant="contained"
                          LinkComponent={Link}
                          href={paths.plans}
                        >
                          Downgrade/ Upgrade
                        </Button>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
              </Stack>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Card
              sx={{
                p: 3,
                boxShadow: 'none',
                border: (t) => `1px solid ${t.palette.divider}`,
              }}
            >
              <Box>
                <Typography variant="h5">Plan usage</Typography>
              </Box>
              <Stack sx={{ mt: 2 }} gap={3}>
                <Stack gap={1}>
                  <Stack justifyContent={'space-between'} direction={'row'} alignItems={'center'}>
                    <Stack direction={'row'} alignItems={'center'} gap={1}>
                      <Iconify width={20} icon="solar:user-linear" />
                      <Typography fontWeight={500}>Sessions</Typography>
                    </Stack>
                    <Box>
                      <Typography>
                        {usageCount?.total_user_track}/{subscription.usage_limit.total_user_track}
                      </Typography>
                    </Box>
                  </Stack>
                  <Box>
                    <LinearProgress
                      variant="determinate"
                      value={normalizeValue(
                        usageCount?.total_user_track || 0,
                        subscription.usage_limit.total_user_track
                      )}
                      color={'primary'}
                      sx={{ height: 10, borderRadius: '3px' }}
                    ></LinearProgress>
                  </Box>
                </Stack>
                {/* <Stack gap={1}>
                  <Stack justifyContent={'space-between'} direction={'row'} alignItems={'center'}>
                    <Stack direction={'row'} alignItems={'center'} gap={1}>
                      <Iconify
                        width={20}
                        icon="hugeicons:ai-image"
                        sx={{ color: isPro ? 'initial' : 'InactiveCaptionText' }}
                      />
                      <Typography sx={{ color: isPro ? 'initial' : 'InactiveCaptionText' }}>
                        Custom Decks
                      </Typography>
                      {!isPro && (
                        <Chip label={'Pro'} variant="outlined" color="primary" size="small"></Chip>
                      )}
                    </Stack>
                    <Box>
                      <Typography sx={{ color: isPro ? 'initial' : 'InactiveCaptionText' }}>
                        {usageCount?.image_deck}/unlimited
                      </Typography>
                    </Box>
                  </Stack>
                  <Box>
                    <LinearProgress
                      variant="determinate"
                      value={normalizeValue(usageCount?.image_deck, isPro ? 99999 : 100)}
                      sx={{
                        height: 10,
                        borderRadius: '3px',
                        bgcolor: (t) => (isPro ? 'inharit' : t.palette.grey[300]),
                      }}
                      color="primary"
                    ></LinearProgress>
                  </Box>
                </Stack> */}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </DashboardContent>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Cancel subscription!"
        content={
          <Box>
            <Typography variant="subtitle1">
              Are you sure you want to cancel your{' '}
              <strong> {subscription.subscription_name} </strong>
              subscription? Upon cancellation, your account will be downgraded to the Free Plan.
            </Typography>
            {isOneTime && (
              <Alert variant="outlined" severity="warning" sx={{ mt: 2 }}>
                Refunds are not applicable for one-time purchases.
              </Alert>
            )}
            {isPaid && (
              <Alert variant="outlined" severity="warning" sx={{ mt: 2 }}>
                A refund is available within 14 days of purchase.
              </Alert>
            )}
            {isPaid &&
              usageCount.total_user_track >= freeSubscription.usage_limit.total_user_track && (
                <Alert variant="filled" severity="error" sx={{ mt: 2 }}>
                  You have more than {freeSubscription.usage_limit.total_user_track} users,
                  exceeding the Free Plan limit; therefore, you are not eligible for a refund.
                </Alert>
              )}
          </Box>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleCancel();
            }}
            loading={loading}
          >
            {!isMoreThan14Days &&
            isPaid &&
            usageCount?.total_user_track <= freeSubscription.usage_limit.total_user_track
              ? 'Cancel & Request for refund'
              : 'Confirm & Cancel'}
          </Button>
        }
      />
    </>
  );
};
