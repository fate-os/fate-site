import React from 'react';
import { Typography, Link } from '@mui/material';

type TermsAcceptanceProps = {
  reason?: string;
};

const TermsAcceptance: React.FC<TermsAcceptanceProps> = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
      By proceeding, you acknowledge that you have read and agree to our <br />
      <Link href="/terms" color="primary" underline="hover">
        Terms and Conditions
      </Link>{' '}
      as well as our{' '}
      <Link href="/privacy-policy" color="primary" underline="hover">
        Privacy Policy
      </Link>
      .
    </Typography>
  );
};

export default TermsAcceptance;
