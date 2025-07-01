'use client';
import React, { useEffect } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import Lottie from 'lottie-react';
import successAnimation from './success.json'; // Replace with actual path
import failAnimation from './fail.json'; // Replace with actual path
import errorAnimation from './error.json'; // Replace with actual path
import { Box, Button, Container, Stack } from '@mui/material';
import { paths } from '@/routes/paths';
import { VerifyPaymentResult } from '@/types';

const PaymentSuccess: React.FC<VerifyPaymentResult> = ({ status }) => {
  useEffect(() => {
    if (status === 'paid') {
      setTimeout(() => {
        window.location.href = paths.destiny;
      }, 2000);
    }
  }, [status]);

  const errorLottieFile = () => {
    if (status === 'paid') {
      return successAnimation;
    }
    if (status === 'unpaid') {
      return failAnimation;
    }
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
            <m.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              // transition={{ type: 'spring', stiffness: 100, damping: 10 }}
              style={{ height: '100%' }}
            >
              <Lottie animationData={errorLottieFile()} style={{ height: '100%' }} />
            </m.div>
          </Box>

          <Stack justifyContent={'center'} alignItems={'center'}>
            <m.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {status === 'paid' && 'Your Destiny Awaits!'}
              {status === 'unpaid' && 'Payment Unsuccessful'}
              {status !== 'unpaid' && status !== 'paid' && 'Unable to Verify Payment'}
            </m.h1>

            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-gray-500 mt-2"
            >
              {status === 'paid' &&
                'Thank you for unlocking your personalized life insights with Fate OS.'}
              {status === 'unpaid' &&
                "We couldn't process your payment. Please try again to reveal your destiny."}
              {status !== 'unpaid' &&
                status !== 'paid' &&
                'There was an issue verifying your payment. Please contact support if this persists.'}
            </m.p>
          </Stack>
        </m.div>
      </Container>
    </LazyMotion>
  );
};

export default PaymentSuccess;
