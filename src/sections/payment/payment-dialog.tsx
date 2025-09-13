import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useLazyQuery } from '@apollo/client';

import { useEffect, useRef, useState } from 'react';
import { SubscriptionSessionResponse } from '@/types';
import { toast } from 'src/components/snackbar';
import { useMediaQuery } from '@mui/material';
import { ProgressLoader } from '@/components/loading-screen/loaders';
import { GET_STRIPE_SESSION } from '@/graphql/query/Payment';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

type PaymentDialogProps = {
  onClose: () => void;
  open: boolean;
  years: string;
  isShine: boolean;
};

export function PaymentDialog({ onClose, open, years, isShine }: PaymentDialogProps) {
  // const [getSession, { loading }] = useLazyQuery<SubscriptionSessionResponse>(GET_STRIPE_SESSION, {
  //   variables: {
  //     years: Number(years),
  //     shine: isShine,
  //   },
  // });
  const loading = false;

  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <Dialog
      maxWidth="md"
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { minWidth: { xs: '100%', md: '500px   ' } } } }}
      scroll="paper"
      fullScreen={matchDownMD}
    >
      <DialogTitle>Complete Your Purchase </DialogTitle>

      <DialogContent sx={{ width: '100%' }}>
        {loading ? <ProgressLoader></ProgressLoader> : <CheckoutPage />}
      </DialogContent>

      <DialogActions
        sx={{
          position: 'sticky',
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: (t) => t.palette.background.default,
        }}
      >
        <Button color="error" variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function CheckoutPage() {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const buildForm = async () => {
      const res = await fetch('/api/sa/build', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: '49.99',
          currency: 'USD',
          reference: 'ORDER-' + Date.now(),
        }),
      });

      const { fields } = await res.json();
      const form = formRef.current!;
      form.innerHTML = ''; // clear previous

      Object.entries(fields).forEach(([name, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = String(value);
        form.appendChild(input);
      });

      form.submit();
    };

    buildForm();
  }, []);

  const env = process.env.NEXT_PUBLIC_SA_ENV || 'test';
  const endpoint =
    env === 'prod'
      ? 'https://secureacceptance.merchant-services.bankofamerica.com/silent/embedded/token/create'
      : 'https://testsecureacceptance.merchant-services.bankofamerica.com/silent/embedded/token/create';

  return (
    <div>
      <h1>Checkout</h1>
      <iframe
        name="sa_iframe"
        id="sa_iframe"
        title="Secure Acceptance"
        style={{ width: '100%', minHeight: 500, border: '0' }}
      />
      <form ref={formRef} method="post" target="sa_iframe" action={endpoint}></form>
    </div>
  );
}
