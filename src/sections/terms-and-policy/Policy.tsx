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

const PrivacyPolicy: React.FC = () => {
  const theme = useTheme();

  return (
    <DashboardContent maxWidth="md">
      <Box sx={{ p: { xs: 3, md: 6 } }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Privacy Policy
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Effective Date: January 1, 2025
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
          Inner States Therapy (fateOstherapy.com)
        </Typography>

        <Typography variant="body1" paragraph sx={{ mt: 3 }}>
          We take your privacy seriously. This Privacy Policy explains how we collect, use, and
          protect your information when you use our website, app, and related services ("Services").
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            1. Who We Are
          </Typography>
          <Typography variant="body1" paragraph>
            fateOsTherapy.com is a UK-based business providing therapeutic tools and resources,
            including our Inner States app. For the purposes of the UK GDPR and Data Protection Act
            2018, we are the data controller.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            2. What Data We Collect
          </Typography>
          <Typography variant="body1" paragraph>
            We may collect the following types of personal data:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Name, email address, and login credentials" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Usage data, such as pages visited, features used, and time spent" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Device information (IP address, browser type, operating system)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Subscription and payment status (processed securely via third parties)" />
            </ListItem>
          </List>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            3. How We Use Your Data
          </Typography>
          <Typography variant="body1" paragraph>
            We only use your data to:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Provide and maintain our services" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Improve app functionality and performance" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Communicate with you (e.g. account updates, support)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Process payments and subscription access" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Monitor usage for analytics and bug-fixing (non-identifiable)" />
            </ListItem>
          </List>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            4. Sensitive Information & Clinical Data
          </Typography>
          <Typography variant="body1" paragraph>
            We do not collect or store any personally identifiable clinical records. Users must not
            input data that identifies clients or patients directly or indirectly. This is your
            responsibility under data protection laws. The app is a tool for reflection and visual
            exploration — it is not a medical records system.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            5. How We Store & Protect Your Data
          </Typography>
          <Typography variant="body1" paragraph>
            We use secure servers and industry-standard encryption and firewalls. However, no method
            of transmission is 100% secure. We cannot guarantee absolute security and you accept
            this risk when using our services.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            6. Sharing Your Data
          </Typography>
          <Typography variant="body1" paragraph>
            We do not sell or rent your data. Your data may be shared with:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Service providers (e.g. payment processors) under strict data handling terms" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Legal authorities if required by law" />
            </ListItem>
          </List>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            7. Cookies & Tracking
          </Typography>
          <Typography variant="body1" paragraph>
            We use cookies and similar technologies for analytics and to improve user experience.
            You can control cookies via your browser settings.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            8. Your Rights (UK & EU)
          </Typography>
          <Typography variant="body1" paragraph>
            You have the right to:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Access, correct, or delete your personal data" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Restrict or object to data processing" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Complain to the Information Commissioner's Office (ICO) if you're in the UK" />
            </ListItem>
          </List>
          <Typography variant="body1" paragraph sx={{ mt: 2 }}>
            To exercise any of your rights, contact us at:{' '}
            <Link href="mailto:contact@fate-os.com" color="primary">
              contact@fate-os.com
            </Link>
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            9. Data Retention
          </Typography>
          <Typography variant="body1" paragraph>
            We retain your data only as long as necessary to deliver the service and comply with
            legal obligations. Deleted accounts are purged after a set period.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            10. International Users
          </Typography>
          <Typography variant="body1" paragraph>
            By using our Services outside the UK, you agree to your data being transferred and
            processed in the UK in accordance with UK data protection laws.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            11. Children's Privacy
          </Typography>
          <Typography variant="body1" paragraph>
            Our services are not intended for users under 16. We do not knowingly collect data from
            minors.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            12. Changes to This Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We may update this Privacy Policy from time to time. When we do, we'll update the
            "Effective Date" and notify users where appropriate.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          Questions?
        </Typography>
        <Typography variant="body1">
          Contact:{' '}
          <Link href="mailto:contact@fate-os.com" color="primary">
            contact@fate-os.com
          </Link>
        </Typography>
      </Box>
    </DashboardContent>
  );
};

export default PrivacyPolicy;
