'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTranslate } from '@/locales';

import { PaymentSummary } from '../payment-summary';
import { PaymentMethods } from '../payment-methods';

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

      <Grid container rowSpacing={{ xs: 5, md: 0 }} columnSpacing={{ xs: 0, md: 5 }} spacing={10}>
        <Grid item xs={12} md={6}>
          <Box
            gap={5}
            display="grid"
            sx={{
              p: { md: 5 },
              borderRadius: 2,
              border: (theme) => ({ md: `dashed 1px ${theme.vars.palette.divider}` }),
            }}
          >
            <PaymentMethods />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <PaymentSummary years={years} isShine={isShine} />
        </Grid>
      </Grid>
    </Container>
  );
}
