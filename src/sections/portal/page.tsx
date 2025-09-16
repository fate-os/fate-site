'use client';
// This file is a part of the React application that displays a circular layout of numbers with labels
import React from 'react';
import { Box, Typography, useTheme, useMediaQuery, Paper, Container, Grid2 } from '@mui/material';

import { useRouter } from 'next/navigation';
import { TriangleDiagram } from '../destiny/triangle-diagram';
import { useTranslate } from '@/locales';
import { paths } from '@/routes/paths';
import { useAppSelector } from '@/store/hooks';

function App() {
  const { account } = useAppSelector((s) => s.auth);

  // Generate data for years 1-60 with corresponding dollar amounts
  const data = Array.from({ length: 60 }, (_, i) => ({
    year: i + 1,
    amount: (i + 1) * 100,
  }));

  const router = useRouter();
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslate('app');

  const handleToNextPage = (num: number, params?: string) => {
    if (account?.super_admin) {
      router.push(`${paths.destiny}`);
      return;
    }
    // router.push(`${paths.destiny}`);
    router.push(`${paths.payment}/${num}${params ? `?${params}` : ''}`);
  };

  // Responsive SVG dimensions
  const svgWidth = isSmDown ? 600 : isMdDown ? 700 : 800;
  const svgHeight = isSmDown ? 800 : isMdDown ? 900 : 1000;
  const centerX = svgWidth / 2;
  const centerY = svgHeight / 2;
  const ovalRadiusX = isSmDown ? 110 : isMdDown ? 130 : 150;
  const ovalRadiusY = isSmDown ? 180 : isMdDown ? 230 : 280;
  const yearRadius = ovalRadiusX + 40;
  const amountRadius = ovalRadiusX + 100;

  // Generate positions for each data point around the vertical oval
  const positions = data.map((item, index) => {
    const angle = (index / data.length) * 2 * Math.PI - Math.PI / 2; // Start from top

    // Oval boundary point
    const ovalX = centerX + ovalRadiusX * Math.cos(angle);
    const ovalY = centerY + ovalRadiusY * Math.sin(angle);

    // Year position (closer to oval)
    const yearX = centerX + yearRadius * Math.cos(angle);
    const yearY = centerY + ((yearRadius * ovalRadiusY) / ovalRadiusX) * Math.sin(angle);

    // Amount position (further out)
    const amountX = centerX + amountRadius * Math.cos(angle);
    const amountY = centerY + ((amountRadius * ovalRadiusY) / ovalRadiusX) * Math.sin(angle);

    // Calculate rotation angle for text (in degrees)
    let rotationAngle = (angle * 180) / Math.PI;

    // Prevent upside-down text for angles between 90 and 270 degrees
    let textAnchor = 'start';
    if (rotationAngle > 90 && rotationAngle < 270) {
      rotationAngle += 180;
      textAnchor = 'end';
    }

    return {
      ...item,
      ovalX,
      ovalY,
      yearX,
      yearY,
      amountX,
      amountY,
      angle,
      rotationAngle,
      textAnchor,
    };
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 4,
        overflowX: 'hidden',
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 0, sm: 2 } }}>
        <Box textAlign="center" mb={5}>
          <Typography variant="h3" component="h1" gutterBottom>
            {t('index.line1')}
          </Typography>
          <Typography variant="h6" component="p" sx={{ maxWidth: 600, mx: 'auto' }}>
            {t('index.line2')}
          </Typography>
          <Typography variant="subtitle2" sx={{ maxWidth: 600, mx: 'auto', mt: 3 }}>
            {t('index.line3')}
          </Typography>
        </Box>

        {/* Responsive scrollable SVG container */}
        <Grid2 container flexWrap={'wrap-reverse'} spacing={10} mb={5}>
          <Grid2
            size={{ xs: 12, md: 4, sm: 6 }}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <TriangleDiagram
              shine="up"
              top={undefined}
              rightSide={undefined}
              bottomRight={undefined}
              bottomLeft={undefined}
              leftSide={undefined}
              leftSideArrow={undefined}
              rightSideArrow={undefined}
              bottomArrow={undefined}
              straightLeft={undefined}
              straightRight={undefined}
              middleText="$4500"
              onClick={() => handleToNextPage(45, 'shine=true')}
            ></TriangleDiagram>
          </Grid2>

          <Grid2
            size={{ xs: 12, md: 8, sm: 6 }}
            display="flex"
            justifyContent="center"
            mb={4}
            sx={{
              width: '100%',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              px: isSmDown ? 1 : 0,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                overflow: 'auto',
                boxShadow: 'none',
              }}
            >
              <svg
                width="100%"
                height={svgHeight}
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                style={{ minWidth: svgWidth, maxWidth: '100%', height: 'auto', display: 'block' }}
              >
                {/* Gradient and shadow definitions */}
                <defs>
                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow
                      dx="0"
                      dy="6"
                      stdDeviation="12"
                      floodColor="#000"
                      floodOpacity="0.15"
                    />
                  </filter>
                </defs>

                {/* Main vertical oval - clean with no fill */}
                <ellipse
                  cx={centerX}
                  cy={centerY}
                  rx={ovalRadiusX}
                  ry={ovalRadiusY}
                  fill="none"
                  stroke="#1976d2"
                  strokeWidth="3"
                  filter="url(#shadow)"
                />

                {/* Data points */}
                {positions.map((point, index) => (
                  <g
                    key={index}
                    onClick={() => handleToNextPage(point.year)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Connection line from oval to amount */}
                    <line
                      x1={point.ovalX}
                      y1={point.ovalY}
                      x2={point.amountX}
                      y2={point.amountY}
                      stroke="#757575"
                      strokeWidth="1.5"
                      opacity="0.7"
                    />

                    {/* Small dot on oval perimeter */}
                    <circle
                      cx={point.ovalX}
                      cy={point.ovalY}
                      r="3"
                      fill="#1976d2"
                      stroke="white"
                      strokeWidth="2"
                    />

                    {/* Year text with background for visibility */}
                    <g>
                      {/* Background rectangle for year text */}
                      <rect
                        x={point.yearX - 25}
                        y={point.yearY - 8}
                        width="50"
                        height="16"
                        fill="white"
                        fillOpacity="0.95"
                        rx="2"
                        stroke="#e0e0e0"
                        strokeWidth="0.5"
                        transform={`rotate(${point.rotationAngle}, ${point.yearX}, ${point.yearY})`}
                      />
                      {/* Year number and "year/years" text in one line */}
                      <text
                        x={point.yearX}
                        y={point.yearY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#1a1a1a"
                        fontSize="11"
                        fontWeight="600"
                        transform={`rotate(${point.rotationAngle}, ${point.yearX}, ${point.yearY})`}
                      >
                        {point.year} {point.year === 1 ? 'year' : 'years'}
                      </text>
                    </g>

                    {/* Dollar amount with background for visibility */}
                    <g>
                      {/* Background rectangle for dollar amount */}
                      <rect
                        x={point.amountX - 30}
                        y={point.amountY - 8}
                        width="60"
                        height="16"
                        fill="white"
                        fillOpacity="0.95"
                        rx="2"
                        stroke="#e0e0e0"
                        strokeWidth="0.5"
                        transform={`rotate(${point.rotationAngle}, ${point.amountX}, ${point.amountY})`}
                      />
                      {/* Dollar amount text */}
                      <text
                        x={point.amountX}
                        y={point.amountY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#2e7d32"
                        fontSize="11"
                        fontWeight="700"
                        transform={`rotate(${point.rotationAngle}, ${point.amountX}, ${point.amountY})`}
                      >
                        ${point.amount.toLocaleString()}
                      </text>
                    </g>
                  </g>
                ))}
              </svg>
            </Paper>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}

export default App;
