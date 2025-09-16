'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTranslate } from '@/locales';

import { PaymentSummary } from '../payment-summary';

// ----------------------------------------------------------------------

export function PaymentView({ years, isShine }) {
  const { t } = useTranslate('app');
  return (
    <Container sx={{ pt: 5, pb: 10 }}>
      <Typography variant="h3" align="center" sx={{ mb: 2 }}>
        {t('payment.title')}
      </Typography>

      <Typography align="center" sx={{ color: 'text.secondary', mb: 5 }}>
        {t('payment.subTitle')}
      </Typography>

      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <PaymentSummary years={years} isShine={isShine} />
        </Grid>
      </Grid>
    </Container>
  );
}
