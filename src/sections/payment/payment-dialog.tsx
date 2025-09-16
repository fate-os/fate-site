import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';

import { useEffect, useState } from 'react';
import { SubscriptionSessionResponse } from '@/types';
import { toast } from 'src/components/snackbar';
import { useMediaQuery } from '@mui/material';
import { ProgressLoader } from '@/components/loading-screen/loaders';
import { GET_STRIPE_SESSION } from '@/graphql/query/Payment';

// ----------------------------------------------------------------------
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// ----------------------------------------------------------------------

type PaymentDialogProps = {
  onClose: () => void;
  open: boolean;
  years: string;
  isShine: boolean;
  couponId?: string;
};

export function PaymentDialog({ onClose, open, years, isShine, couponId }: PaymentDialogProps) {
  const [getSession, { loading }] = useLazyQuery<SubscriptionSessionResponse>(GET_STRIPE_SESSION, {
    variables: {
      years: Number(years),
      shine: isShine,
      couponId: couponId,
    },
  });

  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const getData = async () => {
      const { data } = await getSession();

      if (data?.createSession?.success) {
        setClientSecret(data.createSession.result);
      }

      if (!data?.createSession?.success) {
        toast.error('Payment could not be completed. Please try again later.', {
          description: data?.createSession?.message,
        });
      }
    };
    getData();
  }, []);

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
          <>
            {clientSecret && (
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ clientSecret: clientSecret }}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            )}
          </>
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
        <Button color="error" variant="outlined" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
