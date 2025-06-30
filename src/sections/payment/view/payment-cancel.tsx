'use client';
import React, { useEffect } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import Lottie from 'lottie-react';

import errorAnimation from './error.json'; // Replace with actual path
import { Box, Button, Container, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { paths } from '@/routes/paths';
import { VerifyPaymentResult } from '@/types';
import Link from 'next/link';

const PaymentSuccess: React.FC<VerifyPaymentResult> = ({ status }) => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace(paths.app);
    }, 2000);
  }, [status]);

  const errorLottieFile = () => {
    return errorAnimation;
  };

  return (
    <LazyMotion features={domAnimation}>
      <Container maxWidth="md">
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ height: '40vh' }}>
            <m.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ height: '100%' }}>
              <Lottie animationData={errorLottieFile()} style={{ height: '100%' }} />
            </m.div>
          </Box>

          <Stack justifyContent={'center'} alignItems={'center'} gap={2}>
            <m.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Payment Cancelled
            </m.h1>
            <Button LinkComponent={Link} href={paths.app} color="error">
              Return to Fate OS
            </Button>
          </Stack>
        </m.div>
      </Container>
    </LazyMotion>
  );
};

export default PaymentSuccess;
