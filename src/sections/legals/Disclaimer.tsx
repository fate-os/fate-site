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

const DisclaimerComponent: React.FC = () => {
  return (
    <Box sx={{ p: { xs: 3, md: 6 } }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        Disclaimer
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
        <Typography variant="body1" paragraph>
          <strong>FATE OS, INC.</strong> is incorporated in the <strong>State of Delaware</strong>{' '}
          and operates in the <strong>State of California</strong>. Any disputes related to its
          website or services shall be governed by the <strong>laws of Delaware</strong> or{' '}
          <strong>California, United States</strong>. Users agree that the company is not subject to
          the jurisdiction of any other country or region outside the <strong>United States</strong>
          .
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="body1" paragraph>
          All disputes will be resolved exclusively through <strong>binding arbitration</strong>,
          and the arbitration award will be <strong>final and binding</strong> on both parties.
          Arbitration is to take place only in the <strong>State of Delaware</strong> or the{' '}
          <strong>State of California, United States</strong>, and no litigation or arbitration can
          be brought outside the <strong>United States</strong>.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="body1" paragraph>
          Users expressly agree to waive any right to initiate or participate in any form of{' '}
          <strong>class action, class arbitration, or representative lawsuit</strong>. All claims
          must be brought on an <strong>individual basis</strong> and may not be consolidated with
          the claims of others.
        </Typography>
      </Box>
    </Box>
  );
};

const Disclaimer: React.FC = () => {
  return (
    <DashboardContent maxWidth="md">
      <DisclaimerComponent></DisclaimerComponent>
    </DashboardContent>
  );
};

export default Disclaimer;
