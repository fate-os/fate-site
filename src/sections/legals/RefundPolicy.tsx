'use client';

import React from 'react';
import {
  Container,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Paper,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DashboardContent } from '@/layouts/dashboard';

const RefundPolicyComponent: React.FC = () => {
  return (
    <Box sx={{ p: { xs: 3, md: 6 } }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        Refund Policy
      </Typography>

      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 600, color: 'text.secondary' }}
      >
        FATE OS, INC.
      </Typography>

      <Divider sx={{ my: 4 }} />

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          1. Refund Window
        </Typography>
        <Typography variant="body1" paragraph>
          Refunds are available within 7 days of purchase, provided the service has not been used.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          2. No Refund After Use
        </Typography>
        <Typography variant="body1" paragraph>
          Once services have been accessed, activated, or delivered, refunds are not available.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          3. Processing Time
        </Typography>
        <Typography variant="body1" paragraph>
          Approved refunds will be credited back to the original payment method within 5-10 business
          days.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          4. Direct Purchases Only
        </Typography>
        <Typography variant="body1" paragraph>
          Refunds are exclusively for direct purchases made through FATE OS, INC. Payments made via
          third-party platforms or resellers are not eligible for refunds.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          5. Birth Time Input Rule
        </Typography>
        <Typography variant="body1" paragraph>
          The service is considered delivered and immediately effective once a user enters their
          birth date and time, and the chart/graph is generated.
        </Typography>
        <Typography variant="body1" paragraph>
          If the birth date or time was entered incorrectly, refunds will not be available once the
          chart has appeared.
        </Typography>
        <Typography variant="body1" paragraph>
          Users are advised to carefully input their birth date and time before confirming.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          6. Partial Refunds
        </Typography>
        <Typography variant="body1" paragraph>
          Services, including destiny chart generation, are delivered as a one-time result. Since
          the service is considered fully delivered once the chart is generated, partial refunds are
          not provided under any circumstances.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          7. Refund Method
        </Typography>
        <Typography variant="body1" paragraph>
          Refunds will only be made to the original payment method used for the purchase.
          Alternative methods (e.g., cash, different credit card, or bank account) are not supported
          for refunds.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          8. Company Discretion
        </Typography>
        <Typography variant="body1" paragraph>
          FATE OS, INC. reserves the right to deny refund requests that do not comply with this
          policy.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          9. Force Majeure
        </Typography>
        <Typography variant="body1" paragraph>
          Refunds are not applicable in cases where services are disrupted due to events beyond the
          company's reasonable control, such as natural disasters, internet outages, server
          failures, or cyberattacks.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          10. Currency and Fees
        </Typography>
        <Typography variant="body1" paragraph>
          Refunds will be issued in the original payment currency. Users are responsible for any
          bank fees, transaction charges, or exchange rate differences that may apply.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          11. Policy Changes
        </Typography>
        <Typography variant="body1" paragraph>
          We may update or modify this Refund Policy at any time. The updated version will be posted
          on our website, and continued use of our services indicates acceptance of the updated
          policy.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          12. How to Request
        </Typography>
        <Typography variant="body1" paragraph>
          For refund requests, please contact us at{' '}
          <Link href="mailto:contactus@fate-os.com" color="primary">
            contactus@fate-os.com
          </Link>{' '}
          with your order details.
        </Typography>
      </Box>
    </Box>
  );
};

const RefundPolicy: React.FC = () => {
  return (
    <DashboardContent maxWidth="md">
      <RefundPolicyComponent></RefundPolicyComponent>
    </DashboardContent>
  );
};

export default RefundPolicy;
