'use client';
import React from 'react';
import { Typography, Link, List, ListItem, ListItemText, Divider, Box, Paper } from '@mui/material';

import { DashboardContent } from '@/layouts/dashboard';

const PrivacyPolicy: React.FC = () => {
  return (
    <DashboardContent maxWidth="md">
      <PrivacyPolicyComponent></PrivacyPolicyComponent>
    </DashboardContent>
  );
};

export function PrivacyPolicyComponent() {
  return (
    <Box sx={{ p: { xs: 3, md: 6 } }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        Privacy Policy
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        FATE OS, INC.
      </Typography>

      <Divider sx={{ my: 4 }} />

      {/* 1. Introduction */}
      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          1. Introduction
        </Typography>
        <Typography variant="body1" paragraph>
          FATE OS, INC. ("we," "our," "us") values your privacy. This Privacy Policy explains how we
          collect, use, disclose, and protect your personal information when you use our website and
          services.
        </Typography>
      </Box>

      {/* 2. Information We Collect */}
      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          2. Information We Collect
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText primary="• Personal Information: name, email, phone, address, payment details." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Account Information: login credentials, user preferences." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Technical Data: IP address, browser type, device information, cookies, analytics data." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Usage Data: pages visited, actions taken, interactions with our services." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Optional Data: any information you voluntarily provide (e.g., surveys, feedback)." />
          </ListItem>
        </List>
      </Box>

      {/* 3. How We Use Your Information */}
      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          3. How We Use Your Information
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText primary="• To provide, maintain, and improve our services." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• To process payments and transactions." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• To respond to customer support requests." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• To send important updates (e.g., policy changes, security notices)." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• To conduct analytics and service improvements." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• To comply with legal obligations." />
          </ListItem>
        </List>
      </Box>

      {/* 4. Cookies & Tracking */}
      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          4. Cookies & Tracking
        </Typography>
        <Typography variant="body1" paragraph>
          We use cookies and similar technologies for functionality, analytics, and security. You
          may disable cookies in your browser, but some features may not work properly.
        </Typography>
      </Box>

      {/* 5. Sharing of Information */}
      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          5. Sharing of Information
        </Typography>
        <Typography variant="body1" paragraph>
          We do not sell personal data. We may share your data only with:
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText primary="• Service Providers: payment processors, hosting providers, analytics tools." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Legal Authorities: if required by law, regulation, or court order." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Business Transfers: in case of merger, acquisition, or sale of assets." />
          </ListItem>
        </List>
      </Box>

      {/* 6. Data Security */}
      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          6. Data Security
        </Typography>
        <Typography variant="body1" paragraph>
          We implement reasonable technical and organizational measures to protect personal
          information. However, no method of transmission or storage is 100% secure.
        </Typography>
      </Box>

      {/* 7. Data Retention */}
      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          7. Data Retention
        </Typography>
        <Typography variant="body1" paragraph>
          We retain your data only as long as necessary for the purposes outlined in this Privacy
          Policy, or as required by law.
        </Typography>
      </Box>

      {/* 8. International Data Transfers */}
      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          8. International Data Transfers
        </Typography>
        <Typography variant="body1" paragraph>
          If you are outside the United States, your information may be transferred to and processed
          in the United States or other jurisdictions with different data protection laws.
        </Typography>
      </Box>

      {/* 9. Legal Basis for Processing (GDPR) */}
      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          9. Legal Basis for Processing (GDPR)
        </Typography>
        <Typography variant="body1" paragraph>
          We process your personal data based on your consent, the performance of a contract, legal
          obligations, or our legitimate interests, as applicable.
        </Typography>
      </Box>

      {/* 10. Your Rights */}
      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          10. Your Rights
        </Typography>
        <Typography variant="body1" paragraph>
          Depending on your jurisdiction, you may have the right to:
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText primary="• Access your personal data." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Correct inaccuracies." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Request deletion." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Object to processing." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Withdraw consent (where applicable)." />
          </ListItem>
        </List>
        <Typography variant="body1" paragraph>
          Requests may be submitted to:{' '}
          <Link href="mailto:contactus@fate-os.com">contactus@fate-os.com</Link>
        </Typography>
      </Box>

      {/* 11. Children’s Privacy */}
      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          11. Children's Privacy
        </Typography>
        <Typography variant="body1" paragraph>
          Our services are not directed to individuals under 13 (or the applicable minimum age in
          your country). We do not knowingly collect data from children.
        </Typography>
      </Box>

      {/* 12. Policy Changes */}
      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          12. Policy Changes
        </Typography>
        <Typography variant="body1" paragraph>
          We may update or modify this Privacy Policy at any time. The updated version will be
          posted on our website, and continued use of our services indicates acceptance of the
          updated policy.
        </Typography>
      </Box>

      {/* 13. Contact Us */}
      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          13. Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions or concerns, please contact us at:
        </Typography>
        <Typography variant="body1">
          Email:{' '}
          <Link href="mailto:contactus@fate-os.com" color="primary">
            contactus@fate-os.com
          </Link>
        </Typography>
        <Typography variant="body1">Address: 125 S Moore Ave, California 91754, USA</Typography>
      </Box>
    </Box>
  );
}

export default PrivacyPolicy;
