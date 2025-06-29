'use client';
// This file is a part of the React application that displays a circular layout of numbers with labels
import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material';
import { useRouter } from 'next/navigation';

// Type definitions
type Position = 'top' | 'top-right' | 'right' | 'bottom' | 'left';

interface AmountLabel {
  amount: string;
  position: Position;
}

interface Offset {
  x: number;
  y: number;
  transform?: string;
}

interface AmountLabels {
  [key: number]: AmountLabel;
}

const AppContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  position: 'relative',
  overflow: 'auto',
  mb: '8rem',
});

const NumberText = styled(Typography)({
  position: 'absolute',
  fontWeight: 'bold',
  fontSize: '15px',
  display: 'inline-block',
  whiteSpace: 'nowrap',
  left: '50%',
  top: '50%',
  transformOrigin: '0 0',
});

const AmountText = styled(Typography)({
  fontWeight: 500,
  fontSize: '14px',
  whiteSpace: 'nowrap',
});

const ConnectorLine = styled(Box)({
  width: '32px',
  height: '2px',
  backgroundColor: '#333',
  position: 'absolute',
  mx: 2,
});

const VerticalLine = styled(Box)({
  width: '2px',
  height: '32px',
  backgroundColor: '#333',
  position: 'absolute',
  my: 2,
});

export default function App() {
  const numbers = Array.from({ length: 60 }, (_, index) => index + 1);

  const router = useRouter();

  const handleNextToPayment = (num: number) => {
    router.push(`/payment/${num}`);
  };

  // Define which numbers should show amount labels
  const amountLabels: AmountLabels = {
    // 5: { amount: '$500', position: 'top-right' },
    15: { amount: '$1500', position: 'right' },
    30: { amount: '$3000', position: 'bottom' },
    45: { amount: '$4500', position: 'left' },
    60: { amount: '$6000', position: 'top' },
  };

  const getLineStyle = (position: Position, x: number, y: number) => {
    const offsets: Record<Position, Offset> = {
      top: { x: 0, y: -40, transform: 'translate(-50%, -50%)' },
      'top-right': { x: 35, y: -25, transform: 'translate(-50%, -50%)' },
      right: { x: 40, y: 0, transform: 'translate(-50%, -50%)' },
      bottom: { x: 0, y: 40, transform: 'translate(-50%, -50%)' },
      left: { x: -40, y: 0, transform: 'translate(-50%, -50%)' },
    };

    const offset = offsets[position];
    return {
      left: `calc(50% + ${x + offset.x}px)`,
      top: `calc(50% + ${y + offset.y}px)`,
      transform: offset.transform,
    };
  };

  const getVerticalLineStyle = (position: Position, x: number, y: number) => {
    const offsets: Record<Position, Offset> = {
      top: { x: 0, y: -55, transform: 'translate(-50%, 0%)' },
      'top-right': { x: 35, y: -25, transform: 'translate(-50%, -50%)' },
      right: { x: 40, y: 0, transform: 'translate(-50%, -50%)' },
      bottom: { x: 0, y: 10, transform: 'translate(-50%, 0%)' },
      left: { x: -40, y: 0, transform: 'translate(-50%, -50%)' },
    };

    const offset = offsets[position];
    return {
      left: `calc(50% + ${x + offset.x}px)`,
      top: `calc(50% + ${y + offset.y}px)`,
      transform: offset.transform,
    };
  };

  const getTextStyle = (position: Position, x: number, y: number) => {
    const offsets: Record<Position, { x: number; y: number }> = {
      top: { x: 0, y: -70 },
      'top-right': { x: 70, y: -40 },
      right: { x: 80, y: 0 },
      bottom: { x: 0, y: 70 },
      left: { x: -80, y: 0 },
    };

    const offset = offsets[position];
    return {
      left: `calc(50% + ${x + offset.x}px)`,
      top: `calc(50% + ${y + offset.y}px)`,
      transform: 'translate(-50%, -50%)',
    };
  };

  return (
    <>
      <AppContainer>
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          {numbers.map((number, index) => {
            // Calculate position on circle
            const angle = index * 6 * (Math.PI / 180) - Math.PI / 2; // Start at top
            const horizontalRadius = 250; // Width of oval
            const verticalRadius = 320; // Height of oval

            const x = Math.cos(angle) * horizontalRadius;
            const y = Math.sin(angle) * verticalRadius;
            const hasLabel = amountLabels[number];

            return (
              <Box
                key={number}
                role="button"
                onClick={(e) => handleNextToPayment(number)}
                sx={{ cursor: 'pointer' }}
              >
                {/* Number */}
                <NumberText
                  sx={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                    color: '#666',
                  }}
                >
                  {number}
                </NumberText>

                {/* Amount label with line */}
                {hasLabel && (
                  <>
                    {/* Connector Line */}
                    {hasLabel.position === 'top' || hasLabel.position === 'bottom' ? (
                      <VerticalLine sx={getVerticalLineStyle(hasLabel.position, x, y)} />
                    ) : (
                      <ConnectorLine sx={getLineStyle(hasLabel.position, x, y)} />
                    )}

                    {/* Amount text */}
                    <Box
                      sx={{
                        position: 'absolute',
                        ...getTextStyle(hasLabel.position, x, y),
                      }}
                    >
                      <AmountText>{hasLabel.amount}</AmountText>
                    </Box>
                  </>
                )}
              </Box>
            );
          })}

          {/* Center vertical line (top) */}
        </Box>
      </AppContainer>
    </>
  );
}
