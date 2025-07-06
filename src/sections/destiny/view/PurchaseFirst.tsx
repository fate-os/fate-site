'use client';
import React, { useEffect } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { paths } from '@/routes/paths';
import { useRouter } from 'next/navigation';
import { Image } from '@/components/image/image';

const PurchaseFirst = () => {
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect to portal after 5 seconds
    const timer = setTimeout(() => {
      router.push(paths.app);
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  const handleGoToPortal = () => {
    router.push(paths.app);
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          py: 4,
        }}
      >
        <Box sx={{ mb: 4, position: 'relative', width: 200, height: 200 }}>
          <Image
            src="/assets/purchase.svg"
            alt="Purchase Required"
            width={200}
            height={200}
            style={{ objectFit: 'contain' }}
          />
        </Box>

        <Stack spacing={3} sx={{ maxWidth: 500 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Purchase Required
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            To unlock your personalized fate result and discover your destiny insights, you need to
            make a purchase first.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleGoToPortal}
            sx={{ mt: 2 }}
          >
            Go to Portal
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default PurchaseFirst;
