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
import FateOSTerms from './FateOSTerms';

const TermsAndConditions: React.FC = () => {
  const theme = useTheme();

  return (
    <DashboardContent maxWidth="md" sx={{ py: 4 }}>
      <FateOSTerms></FateOSTerms>
    </DashboardContent>
  );
};

export default TermsAndConditions;
