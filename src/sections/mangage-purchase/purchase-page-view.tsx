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
import { PaymentHistory } from '@/types';
import { Label } from 'src/components/label';
import { useAppSelector } from '@/store/hooks';
import moment from 'moment';
import { Iconify } from 'src/components/iconify';
import { normalizeValue } from '@/utils/parser';
import Link from 'next/link';
import { paths } from '@/routes/paths';
import { useLazyQuery } from '@apollo/client';
import { GET_PAYMENT_HISTORY } from '@/graphql/query/Payment';
import { PaymentHistoryResponse } from '@/types';
import { ProgressLoader } from '@/components/loading-screen/loaders';

type PurchaseViewProps = {
  paymentHistory: PaymentHistory[];
};

export const PurchaseView: React.FC<PurchaseViewProps> = ({ paymentHistory }) => {
  const theme: any = useTheme();
  const { account } = useAppSelector((s) => s.auth);

  // Calculate total amount paid
  const totalPaid = useMemo(() => {
    return paymentHistory.reduce((sum, payment) => sum + payment.paid_amount, 0);
  }, [paymentHistory]);

  // Calculate total years purchased
  const totalYears = useMemo(() => {
    return paymentHistory.reduce((sum, payment) => sum + payment.year_count, 0);
  }, [paymentHistory]);

  // Get latest payment
  const latestPayment = useMemo(() => {
    return paymentHistory.length > 0 ? paymentHistory[0] : null;
  }, [paymentHistory]);

  // Check if user has any purchases
  const hasPurchases = paymentHistory.length > 0;

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Purchase Overview
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
              <Typography variant="h5">Purchase Summary</Typography>
            </Box>
            <Stack sx={{ mt: 1 }}>
              <Stack gap={2}>
                <Box>
                  <Box>
                    <Label color="primary" variant="filled" sx={{ letterSpacing: 1.2 }}>
                      {hasPurchases ? 'ACTIVE PURCHASES' : 'NO PURCHASES'}
                    </Label>
                    <Typography variant="subtitle2" color="textSecondary" mt={1}>
                      Member since {moment(account?.created_at).format('LL')}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Box>
                      <Button
                        color={'primary'}
                        variant="contained"
                        LinkComponent={Link}
                        href={paths.destiny}
                      >
                        Make New Purchase
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
              <Typography variant="h5">Purchase Statistics</Typography>
            </Box>
            <Stack sx={{ mt: 2 }} gap={3}>
              <Stack gap={1}>
                <Stack justifyContent={'space-between'} direction={'row'} alignItems={'center'}>
                  <Stack direction={'row'} alignItems={'center'} gap={1}>
                    <Iconify width={20} icon="solar:dollar-minimalistic-bold" />
                    <Typography fontWeight={500}>Total Spent</Typography>
                  </Stack>
                  <Box>
                    <Typography>${totalPaid.toFixed(2)}</Typography>
                  </Box>
                </Stack>
                <Box>
                  <LinearProgress
                    variant="determinate"
                    value={100}
                    color={'primary'}
                    sx={{ height: 10, borderRadius: '3px' }}
                  />
                </Box>
              </Stack>
              <Stack gap={1}>
                <Stack justifyContent={'space-between'} direction={'row'} alignItems={'center'}>
                  <Stack direction={'row'} alignItems={'center'} gap={1}>
                    <Iconify width={20} icon="solar:calendar-bold" />
                    <Typography fontWeight={500}>Total Years</Typography>
                  </Stack>
                  <Box>
                    <Typography>{totalYears} years</Typography>
                  </Box>
                </Stack>
                <Box>
                  <LinearProgress
                    variant="determinate"
                    value={100}
                    color={'success'}
                    sx={{ height: 10, borderRadius: '3px' }}
                  />
                </Box>
              </Stack>
              <Stack gap={1}>
                <Stack justifyContent={'space-between'} direction={'row'} alignItems={'center'}>
                  <Stack direction={'row'} alignItems={'center'} gap={1}>
                    <Iconify width={20} icon="solar:receipt-bold" />
                    <Typography fontWeight={500}>Total Purchases</Typography>
                  </Stack>
                  <Box>
                    <Typography>{paymentHistory.length}</Typography>
                  </Box>
                </Stack>
                <Box>
                  <LinearProgress
                    variant="determinate"
                    value={100}
                    color={'info'}
                    sx={{ height: 10, borderRadius: '3px' }}
                  />
                </Box>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  );
};
