'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

import { PaymentSummary } from '../payment-summary';
import { PriceMode, SubscriptionType } from '@/types';

// ----------------------------------------------------------------------

type PaymentSummaryProps = {
  subscription: SubscriptionType;
  priceMode: PriceMode;

  annually?: boolean;
  freeTrial?: boolean;
  // clientSecret: string;
};

export function PaymentView({ subscription, priceMode, annually, freeTrial }: PaymentSummaryProps) {
  return (
    <Container sx={{ pt: 5, pb: 10 }}>
      <Typography variant="h3" align="center" sx={{ mb: 2 }}>
        {`Finishing up—your journey starts now!`}
      </Typography>

      <Typography align="center" sx={{ color: 'text.secondary', mb: 5 }}>
        Upgrade to unlock your full potential
      </Typography>

      <Grid
        container
        rowSpacing={{ xs: 5, md: 0 }}
        columnSpacing={{ xs: 0, md: 5 }}
        justifyContent={'center'}
      >
        <Grid size={{ md: 6, xs: 12 }}>
          <PaymentSummary
            subscription={subscription}
            priceMode={priceMode}
            annually={annually}
            freeTrial={freeTrial}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
