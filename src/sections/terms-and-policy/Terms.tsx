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

const TermsAndConditions: React.FC = () => {
  const theme = useTheme();

  return (
    <DashboardContent maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ p: { xs: 3, md: 6 } }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Terms and Conditions of Use
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Effective Date: January 1st, 2025
        </Typography>

        <Typography variant="body1" paragraph sx={{ mt: 3 }}>
          Welcome to fateOsTherapy.com. These Terms and Conditions ("Terms") govern your use of our
          website, mobile app, and associated services ("Services"). By accessing or using the
          Services, you agree to be bound by these Terms.
        </Typography>

        <Typography variant="body1" paragraph sx={{ fontWeight: 600 }}>
          If you do not agree with these Terms, please do not use the Services.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            1. About the Service
          </Typography>
          <Typography variant="body1" paragraph>
            fateOsTherapy.com offers a digital platform designed to help therapists and individuals
            explore emotional states, enabling therapeutic conversations and personal insight. It is
            not a diagnostic tool or a substitute for medical or clinical treatment.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            2. Eligibility
          </Typography>
          <Typography variant="body1" paragraph>
            You must be at least 18 years old or have legal consent from a parent or guardian to use
            the Services.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            3. Subscriptions and Payments
          </Typography>
          <Typography variant="body1" paragraph>
            We offer Free and paid subscription plans. Pricing, features, and availability are
            subject to change.
          </Typography>
          <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
            Refund Policy
          </Typography>
          <Typography variant="body1" paragraph>
            Refunds are available only for unused subscriptions. If features have been accessed
            (e.g., sessions created, images reviewed), the subscription is considered used and is
            non-refundable.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            4. Permitted Use
          </Typography>
          <Typography variant="body1" paragraph>
            You agree to use the Services for personal development or therapeutic support only. You
            must not:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Copy, distribute, or commercialise any content;" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Misuse or tamper with any part of the platform;" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Use the platform for any unlawful, unethical, or misleading purposes." />
            </ListItem>
          </List>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            5. Clinical Data and Confidentiality
          </Typography>
          <Typography variant="body1" paragraph>
            You must not use the platform to store any personally identifiable information about
            clients or third parties. This includes names, contact details, health data, or notes
            that could be used to identify a specific individual.
          </Typography>
          <Typography variant="body1" paragraph>
            We are not responsible for clinical records, and users are solely liable for their
            compliance with professional, ethical, and legal standards regarding client
            confidentiality and record-keeping.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            6. Intellectual Property
          </Typography>
          <Typography variant="body1" paragraph>
            All content, including the user interface, software, designs, images, and brand assets,
            are the intellectual property of fateOsTherapy.com. You are granted a limited,
            non-exclusive license for personal or professional use in line with these Terms.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            7. User Content
          </Typography>
          <Typography variant="body1" paragraph>
            You may create and name session data and image groups within the platform. You are
            responsible for any content you generate. You must not upload, store, or share any
            inappropriate, illegal, or personally identifiable information.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            8. Data Protection and Privacy
          </Typography>
          <Typography variant="body1" paragraph>
            We comply with UK GDPR and relevant data protection laws. We only collect the minimal
            personal data necessary to deliver the service (e.g., account login details and session
            usage history).
          </Typography>
          <Typography variant="body1" paragraph>
            We do not sell or share personal data with third parties unless required by law.
          </Typography>
          <Typography variant="body1" paragraph>
            You are responsible for ensuring that you do not store third-party data, particularly
            that which identifies any clients or patients.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            9. Security
          </Typography>
          <Typography variant="body1" paragraph>
            We implement reasonable measures to secure your information. However, no system is
            impenetrable, and we cannot guarantee that third parties will not defeat our security
            measures. You provide your information at your own risk and should not store sensitive
            information on the platform.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            10. Third-Party Links
          </Typography>
          <Typography variant="body1" paragraph>
            The platform may include links to third-party websites or tools. We are not responsible
            for the content, services, or practices of any third-party sites, and your use of such
            services is at your own discretion and risk.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            11. Limitation of Liability
          </Typography>
          <Typography variant="body1" paragraph>
            To the fullest extent permitted by law:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• fateOsTherapy.com and its associated individuals are not liable for any direct, indirect, incidental, or consequential losses or damages arising from the use or inability to use the Services;" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• We make no guarantees about therapeutic outcomes;" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• You agree to use the Services 'as-is' and at your own risk." />
            </ListItem>
          </List>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            12. No Warranty
          </Typography>
          <Typography variant="body1" paragraph>
            We do not guarantee that the Services will be error-free, uninterrupted, or suitable for
            your individual purposes. All use is provided without warranty of any kind, express or
            implied.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            13. Indemnity
          </Typography>
          <Typography variant="body1" paragraph>
            You agree to indemnify and hold harmless fateOsTherapy.com and any affiliated
            individuals or contractors from any claims, damages, losses, liabilities, or expenses
            arising from:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Your use of the Services;" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Your breach of these Terms;" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Any unauthorised or illegal use of data you input into the system." />
            </ListItem>
          </List>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            14. Termination
          </Typography>
          <Typography variant="body1" paragraph>
            We reserve the right to suspend or terminate access to the Services at any time for
            violation of these Terms or inappropriate use.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            15. Assignment
          </Typography>
          <Typography variant="body1" paragraph>
            You may not assign or transfer any rights under these Terms without written consent. We
            may assign or transfer our rights and obligations without restriction.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            16. No Waivers
          </Typography>
          <Typography variant="body1" paragraph>
            Failure by fateOsTherapy.com to enforce any provision of these Terms does not constitute
            a waiver of our rights.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            17. Entire Agreement / Severability
          </Typography>
          <Typography variant="body1" paragraph>
            These Terms constitute the entire agreement between you and fateOsTherapy.com. If any
            part of these Terms is found to be unlawful or unenforceable, the remaining parts remain
            valid and enforceable.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            18. Governing Law
          </Typography>
          <Typography variant="body1" paragraph>
            These Terms are governed by and construed in accordance with the laws of England and
            Wales, regardless of the user's location. All disputes shall be subject to the exclusive
            jurisdiction of the English courts.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            19. Discontinuation of Service
          </Typography>
          <Typography variant="body1" paragraph>
            fateOsTherapy.com reserves the right to modify, suspend, or discontinue the Services at
            any time, with or without notice. In the event that the Services are permanently
            discontinued:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Monthly or annual subscribers will not be charged for future billing periods beyond the date of service termination;" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Lifetime subscribers acknowledge and agree that the one-time payment grants access for the lifetime of the service and not the lifetime of the user. No refunds will be issued for any portion of the subscription that remains unused due to service discontinuation." />
            </ListItem>
          </List>
          <Typography variant="body1" paragraph>
            You acknowledge that the Services are offered "as is," and you accept the risk that they
            may be discontinued at any time for business, legal, or operational reasons.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            20. Contact
          </Typography>
          <Typography variant="body1" paragraph>
            For any questions or concerns, please contact:
          </Typography>
          <Typography variant="body1">
            Email:{' '}
            <Link href="mailto:support@fateOstherapy.com" color="primary">
              support@fateOstherapy.com
            </Link>
          </Typography>
        </Box>
      </Box>
    </DashboardContent>
  );
};

export default TermsAndConditions;
