'use client';
// This file is a part of the React application that displays a circular layout of numbers with labels
import React from 'react';
import { Box, Typography, Stack, useTheme, useMediaQuery } from '@mui/material';
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
  minHeight: '110vh',
  position: 'relative',
  overflow: 'auto',
  marginBottom: '4rem',
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

const YearsText = styled(Typography)({
  fontWeight: 700,
  fontSize: '14px',
  whiteSpace: 'nowrap',
});

const ConnectorLine = styled(Box)({
  width: '22px',
  height: '2px',
  backgroundColor: '#333',
  position: 'absolute',
  mx: 2,
});

const VerticalLine = styled(Box)({
  width: '2px',
  height: '22px',
  backgroundColor: '#333',
  position: 'absolute',
  my: 2,
});

export default function App() {
  const numbers = Array.from({ length: 60 }, (_, index) => index + 1);

  const router = useRouter();
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

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
      top: { x: 0, y: -43, transform: 'translate(-50%, -50%)' },
      'top-right': { x: 55, y: -28, transform: 'translate(-50%, -50%)' },
      right: { x: 58, y: 0, transform: 'translate(-50%, -50%)' },
      bottom: { x: 0, y: 40, transform: 'translate(-50%, -50%)' },
      left: { x: -58, y: 0, transform: 'translate(-50%, -50%)' },
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
      top: { x: 0, y: -73, transform: 'translate(-50%, 0%)' },
      'top-right': { x: 55, y: -28, transform: 'translate(-50%, -50%)' },
      right: { x: 55, y: 0, transform: 'translate(-50%, -50%)' },
      bottom: { x: 0, y: 48, transform: 'translate(-50%, 0%)' },
      left: { x: -58, y: 0, transform: 'translate(-50%, -50%)' },
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
      top: { x: 0, y: -85 },
      'top-right': { x: 85, y: -40 },
      right: { x: 95, y: 0 },
      bottom: { x: 0, y: 85 },
      left: { x: -95, y: 0 },
    };

    const offset = offsets[position];
    return {
      left: `calc(50% + ${x + offset.x}px)`,
      top: `calc(50% + ${y + offset.y}px)`,
      transform: 'translate(-50%, -50%)',
    };
  };

  const getYearsTextStyle = (position: Position, x: number, y: number) => {
    const offsets: Record<Position, { x: number; y: number }> = {
      top: { x: 0, y: -28 },
      'top-right': { x: 28, y: 0 },
      right: { x: 28, y: 0 },
      bottom: { x: 0, y: 28 },
      left: { x: -28, y: 0 },
    };

    const offset = offsets[position];
    const isVertical = position === 'top' || position === 'bottom';

    return {
      left: `calc(50% + ${x + offset.x}px)`,
      top: `calc(50% + ${y + offset.y}px)`,
      transform: isVertical ? 'translate(-50%, -50%) rotate(90deg)' : 'translate(-50%, -50%)',
    };
  };

  return (
    <>
      <AppContainer>
        <Box sx={{ width: '100%', height: '100%', scale: isSmDown ? 0.6 : isMdDown ? 0.8 : 1 }}>
          <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            {numbers.map((number, index) => {
              // Calculate position on circle
              const angle = index * 6 * (Math.PI / 180) - Math.PI / 2; // Start at top
              const horizontalRadius = isSmDown ? 200 : 250; // Width of oval
              const verticalRadius = isSmDown ? 270 : 320; // Height of oval

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
                    {/* {hasLabel && 'years'} */}
                  </NumberText>

                  {/* Amount label with line */}
                  {hasLabel && (
                    <>
                      <Box
                        sx={{
                          position: 'absolute',
                          ...getYearsTextStyle(hasLabel.position, x, y),
                        }}
                      >
                        <YearsText>years</YearsText>
                      </Box>
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
          </Box>
        </Box>
      </AppContainer>
    </>
  );
}
