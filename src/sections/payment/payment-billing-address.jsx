import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export function PaymentBillingAddress() {
  return (
    <div>
      <Typography variant="h6">Billing address</Typography>
      <Stack spacing={3} mt={5}>
        <TextField fullWidth label="Person name" required />
        <TextField fullWidth label="Phone number" required />
        <TextField fullWidth label="Email" required />
        <TextField fullWidth label="Address" />
      </Stack>
    </div>
  );
}
