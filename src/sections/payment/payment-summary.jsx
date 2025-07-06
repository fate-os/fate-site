import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { PaymentDialog } from './payment-dialog';
import { useState } from 'react';

// ----------------------------------------------------------------------

export function PaymentSummary({ years, isShine, sx, ...other }) {
  const [continuePayment, setContinuePayment] = useState(0);

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
          Summary
        </Typography>

        <Stack spacing={2.5}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 700 }}>
              Years
            </Typography>

            <Label color="error">{years}</Label>
          </Stack>

          {renderPrice}

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1">Total billed</Typography>

            <Typography variant="subtitle1">${totalAmount}*</Typography>
          </Stack>

          <Divider sx={{ borderStyle: 'dashed' }} />
        </Stack>

        <Typography component="div" variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
          * Plus applicable taxes
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
        ></PaymentDialog>
      )}
    </Box>
  );
}
