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
        {loading ? (
          <ProgressLoader></ProgressLoader>
        ) : (
          <SecureAcceptanceEmbedded amount="100" currency="usd" reference="1234567890" />
        )}
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

type SecureAcceptanceProps = { amount: string; currency: string; reference: string };

export default function SecureAcceptanceEmbedded({
  amount,
  currency,
  reference,
}: SecureAcceptanceProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isFormReady, setIsFormReady] = useState(false);

  // Pick the endpoint (test/prod + domain)
  const env = process.env.NEXT_PUBLIC_SA_ENV || process.env.SA_ENV || 'test';
  const gw = process.env.NEXT_PUBLIC_SA_GATEWAY || process.env.SA_GATEWAY || 'cybersource';

  const endpoint =
    env === 'prod'
      ? gw === 'bofa'
        ? 'https://secureacceptance.merchant-services.bankofamerica.com/pay'
        : 'https://secureacceptance.cybersource.com/pay'
      : gw === 'bofa'
        ? 'https://testsecureacceptance.merchant-services.bankofamerica.com/pay'
        : 'https://testsecureacceptance.cybersource.com/pay';

  console.log(endpoint);

  return (
    <div>
      <iframe
        name="sa_iframe"
        id="sa_iframe"
        title="Secure Acceptance"
        style={{ width: '100%', minHeight: 720, border: '0' }}
        // 3-D Secure challenges may need ~390x400 at minimum
      />
      {/* This form gets its signed fields from our API route */}
      <form ref={formRef} method="post" target="sa_iframe" action={endpoint}>
        {/* Required basic fields are injected below via API */}
        {/* We fetch and render hidden inputs from /api/sa/build */}
      </form>
      <ScriptInjector
        amount={amount}
        currency={currency}
        reference={reference}
        onFormReady={() => setIsFormReady(true)}
      />
    </div>
  );
}

type ScriptInjectorProps = SecureAcceptanceProps & {
  onFormReady: () => void;
};

function ScriptInjector({ amount, currency, reference, onFormReady }: ScriptInjectorProps) {
  // Fetch signed fields and inject as hidden inputs before submit
  useEffect(() => {
    const f = async () => {
      try {
        const res = await fetch('/api/sa/build', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount, currency, reference }),
        });

        if (!res.ok) {
          throw new Error(`API call failed: ${res.status} ${res.statusText}`);
        }

        const { fields } = await res.json();
        console.log('Received fields from API:', fields);

        const form = document.querySelector("form[action*='secureacceptance']") as HTMLFormElement;
        if (!form) {
          console.error('Form not found');
          return;
        }

        // Clear previous inputs
        form.querySelectorAll('input').forEach((n) => n.remove());

        // Add new fields
        Object.entries(fields).forEach(([name, value]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = name;
          input.value = String(value);
          form.appendChild(input);
          console.log(`Added field: ${name} = ${value}`);
        });

        // Notify that form is ready and submit
        onFormReady();
        form.submit();
      } catch (error) {
        console.error('Error setting up payment form:', error);
        toast.error('Failed to initialize payment form. Please try again.');
      }
    };
    f();
  }, [amount, currency, reference, onFormReady]);

  return null;
}
