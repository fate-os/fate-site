import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { GET_STRIPE_SESSION } from '@/graphql/query/Payment';
import { useEffect, useState } from 'react';
import { SubscriptionSessionResponse } from '@/types';
import { toast } from 'src/components/snackbar';
import { Alert, Box, Typography, useMediaQuery } from '@mui/material';
import { ProgressLoader } from '@/components/loading-screen/loaders';

// ----------------------------------------------------------------------
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// ----------------------------------------------------------------------

type PaymentDialogProps = {
  onClose: () => void;
  open: boolean;
  subscriptionId: string;
  currency: string;
  annually?: boolean;
  freeTrial?: boolean;
  couponId?: string;
};

export function PaymentDialog({
  onClose,
  open,
  currency,
  subscriptionId,
  annually,
  freeTrial,
  couponId,
}: PaymentDialogProps) {
  const [getSession, { loading }] = useLazyQuery<SubscriptionSessionResponse>(GET_STRIPE_SESSION, {
    variables: {
      subscriptionId: subscriptionId,
      currency: currency,
      freeTrial: freeTrial,
      annually: annually,
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
    <Dialog maxWidth="sm" onClose={onClose} open={open} scroll="paper" fullScreen={matchDownMD}>
      <DialogTitle>Complete Your Purchase </DialogTitle>

      <DialogContent sx={{ overflow: 'unset' }}>
        <Box>
          <Alert severity="info" variant="outlined" sx={{ mb: 3 }}>
            <Typography>
              Subscriptions can be canceled at any time, with no refunds for the current billing
              cycle.
            </Typography>
            <Typography color="primary">
              Refunds are available within 14 days of purchase for unused subscriptions.
            </Typography>
          </Alert>
        </Box>
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
            {/* {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm />
              </Elements>
            )} */}
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
        <Button color="error" variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [message, setMessage] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!stripe || !elements) return;

//     setIsLoading(true);

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: 'http://localhost:3000/complete',
//       },
//       redirect: 'if_required',
//     });

//     if (error) {
//       setMessage(error.message || 'Payment failed');
//     } else {
//       setMessage('Payment succeeded!');
//     }

//     setIsLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <PaymentElement
//         options={{
//           layout: {
//             type: 'accordion',

//           },

//         }}
//       />
//       <button disabled={isLoading || !stripe} className="pay-button">
//         {isLoading ? 'Processing...' : 'Pay $10.00'}
//       </button>
//       {message && <div className="payment-message">{message}</div>}
//     </form>
//   );
// };
