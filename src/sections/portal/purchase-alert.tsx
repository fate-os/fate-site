'use client';
import React, { useState, useEffect } from 'react';
import { Box, Alert, AlertTitle, Container, Typography, Chip, Stack } from '@mui/material';
import Link from 'next/link';
import { paths } from '@/routes/paths';
import { HasPurchaseHistory } from '@/types';
import { Iconify } from '@/components/iconify';

type Props = {
  hasPurchaseHistory?: boolean;
  purchaseHistoryData?: HasPurchaseHistory | null;
};

const PurchaseAlert = ({ hasPurchaseHistory, purchaseHistoryData }: Props) => {
  const [showFreeAlert, setShowFreeAlert] = useState(false);

  // Session-based hide for free alert
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('hide_free_alert')) {
        setShowFreeAlert(false);
      } else {
        setShowFreeAlert(hasPurchaseHistory || false);
      }
    }
  }, [hasPurchaseHistory]);

  const handleCloseFreeAlert = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('hide_free_alert', '1');
    }
    setShowFreeAlert(false);
  };

  if (!showFreeAlert || !hasPurchaseHistory || !purchaseHistoryData) {
    return null;
  }

  return (
    <Container>
      <Box mb={4}>
        <Alert
          severity="success"
          onClose={handleCloseFreeAlert}
          sx={{
            '& .MuiAlert-message': {
              width: '100%',
            },
          }}
        >
          <AlertTitle
            sx={{ textTransform: 'capitalize', display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <Iconify icon="solar:wallet-money-bold" width={20} />
            Payment History Available
          </AlertTitle>

          <Stack spacing={2} sx={{ mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              You have made purchases with us! Here's a summary of your payment history:
            </Typography>

            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              <Chip
                icon={<Iconify icon="solar:receipt-bold" width={16} />}
                label={`${purchaseHistoryData.total_purchases} Purchase${purchaseHistoryData.total_purchases > 1 ? 's' : ''}`}
                color="primary"
                variant="outlined"
                size="small"
              />
              <Chip
                icon={<Iconify icon="solar:dollar-minimalistic-bold" width={16} />}
                label={`$${purchaseHistoryData.total_amount.toFixed(2)} Total Spent`}
                color="success"
                variant="outlined"
                size="small"
              />
            </Stack>

            <Typography variant="body2" color="text.secondary">
              <Link
                href={paths.account.managePurchase}
                style={{
                  color: 'inherit',
                  textDecoration: 'underline',
                  fontWeight: 500,
                }}
              >
                View detailed payment history and manage your purchases →
              </Link>
            </Typography>
          </Stack>
        </Alert>
      </Box>
    </Container>
  );
};

export default PurchaseAlert;
