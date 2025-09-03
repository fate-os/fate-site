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

const FateOSTerms: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ p: { xs: 3, md: 6 } }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        Terms of Service
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
          1. Acceptance of Terms
        </Typography>
        <Typography variant="body1" paragraph>
          By accessing or using our website and services, you agree to be bound by these Terms of
          Service.
        </Typography>
        <Typography variant="body1" paragraph>
          If you do not agree, you must not use the services.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          2. Use of Services
        </Typography>
        <Typography variant="body1" paragraph>
          Users may only use the services for lawful purposes.
        </Typography>
        <Typography variant="body1" paragraph>
          Users may not misuse, copy, distribute, or resell the services without prior written
          permission.
        </Typography>
        <Typography variant="body1" paragraph>
          Users agree not to engage in any activity that could harm or interfere with their systems
          or other users.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          3. Accounts and Payments
        </Typography>
        <Typography variant="body1" paragraph>
          Some services may require account creation, and users are responsible for maintaining the
          confidentiality of their login credentials.
        </Typography>
        <Typography variant="body1" paragraph>
          If payments are required, users agree to provide accurate billing information and pay all
          applicable fees.
        </Typography>
        <Typography variant="body1" paragraph>
          Refunds (if any) will be handled in accordance with their published refund policy.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          4. Intellectual Property
        </Typography>
        <Typography variant="body1" paragraph>
          All content, software, and materials provided through their services are the property of
          FATE OS, INC. or its licensors.
        </Typography>
        <Typography variant="body1" paragraph>
          Users are granted a limited, non-exclusive, non-transferable license to use them solely
          for personal or internal business purposes.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          5. Limitation of Liability
        </Typography>
        <Typography variant="body1" paragraph>
          FATE OS, INC. is not liable for interruptions, errors, data loss, or events beyond their
          reasonable control.
        </Typography>
        <Typography variant="body1" paragraph>
          Their total liability to the user shall not exceed the amount paid to them in the last 12
          months.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          6. User Obligations
        </Typography>
        <Typography variant="body1" paragraph>
          Users must comply with all applicable laws.
        </Typography>
        <Typography variant="body1" paragraph>
          Users must not use the services for fraudulent, illegal, or harmful purposes.
        </Typography>
        <Typography variant="body1" paragraph>
          Users may only use their own date of birth when accessing or using the services.
        </Typography>
        <Typography variant="body1" paragraph>
          Users must not use another person's date of birth, nor attempt to generate multiple
          results from different dates of birth on behalf of others.
        </Typography>
        <Typography variant="body1" paragraph>
          Each individual is entitled to only one result based on their own date of birth.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          7. Termination
        </Typography>
        <Typography variant="body1" paragraph>
          FATE OS, INC. may suspend or terminate user access to their services at any time, without
          prior notice, if the user:
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText primary="(i) violates these Terms," />
          </ListItem>
          <ListItem>
            <ListItemText primary="(ii) fails to pay any applicable fees," />
          </ListItem>
          <ListItem>
            <ListItemText primary="(iii) engages in unlawful or fraudulent use, or" />
          </ListItem>
          <ListItem>
            <ListItemText primary="(iv) creates legal or security risks for them." />
          </ListItem>
        </List>
        <Typography variant="body1" paragraph>
          Upon termination, the user's right to use the services will immediately cease, and FATE
          OS, INC. may delete associated data as permitted by law.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          8. Governing Law and Dispute Resolution
        </Typography>
        <Typography variant="body1" paragraph>
          This section heading is present, but the specific terms under it are not visible in the
          image.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          9. Disclaimer
        </Typography>
        <Typography variant="body1" paragraph>
          The services are provided "as is" and "as available," with no warranties of
          merchantability, fitness for a particular purpose, or non-infringement.
        </Typography>
        <Typography variant="body1" paragraph>
          Services are not guaranteed to be error-free, uninterrupted, or to meet all expectations.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          10. Indemnification
        </Typography>
        <Typography variant="body1" paragraph>
          You agree to indemnify, defend, and hold harmless FATE OS, INC., its affiliates, officers,
          employees, and agents from claims, liabilities, damages, losses, or expenses (including
          attorney's fees) arising from:
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText primary="• Your use of services," />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Violation of terms," />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Infringement of third-party rights." />
          </ListItem>
        </List>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          11. Severability
        </Typography>
        <Typography variant="body1" paragraph>
          If any provision is found invalid, illegal, or unenforceable, the remaining provisions
          will remain in full force and effect.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          12. Entire Agreement
        </Typography>
        <Typography variant="body1" paragraph>
          These Terms of Service constitute the entire agreement between the user and FATE OS, INC.
          regarding service use, superseding prior agreements, understandings, or communications.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          13. Force Majeure
        </Typography>
        <Typography variant="body1" paragraph>
          FATE OS, INC. is not responsible for performance failures or delays caused by events
          beyond reasonable control, such as natural disasters, internet outages, server failures,
          government actions, or cyberattacks.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          14. Policy Changes
        </Typography>
        <Typography variant="body1" paragraph>
          Terms of Service may be updated or modified at any time, with updated versions posted on
          the website, and continued use implies acceptance of updated terms.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          15. Contact Information
        </Typography>
        <Typography variant="body1" paragraph>
          For questions about the Terms, please contact:
        </Typography>
        <Typography variant="body1" paragraph>
          Email:{' '}
          <Link href="mailto:contactus@fate-os.com" color="primary">
            contactus@fate-os.com
          </Link>
        </Typography>
        <Typography variant="body1" paragraph>
          Address: 125 S Moore Ave, California 91754, USA
        </Typography>
      </Box>
    </Box>
  );
};

export default FateOSTerms;
