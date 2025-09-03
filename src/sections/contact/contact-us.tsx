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

const ContactUsComponent: React.FC = () => {
  return (
    <Box sx={{ p: { xs: 3, md: 6 } }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        Contact Us
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
          If you have any questions, concerns, or requests regarding our services, please contact us
          through the following:
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          Email
        </Typography>
        <Typography variant="body1" paragraph>
          <Link href="mailto:contactus@fate-os.com" color="primary">
            contactus@fate-os.com
          </Link>
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          Address
        </Typography>
        <Typography variant="body1" paragraph>
          125 S Moore Ave, California 91754, USA
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          Response Time
        </Typography>
        <Typography variant="body1" paragraph>
          We will make every effort to respond to your inquiry within 3-5 business days.
        </Typography>
      </Box>
    </Box>
  );
};

const ContactUs: React.FC = () => {
  return (
    <DashboardContent maxWidth="md">
      <ContactUsComponent></ContactUsComponent>
    </DashboardContent>
  );
};

export default ContactUs;
