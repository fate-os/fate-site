// @ts-expect-error: No types for @canvasjs/react-charts
import CanvasJSReact from '@canvasjs/react-charts';

import React, { Component } from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useAppSelector } from '@/store/hooks';
import { TriangleDiagram } from './triangle-diagram';
const MAX_YEARS = 60;

function DestinyResultWithTheme() {
  const theme = useTheme();
  const { destinyForm } = useAppSelector((e) => e.app);

  return <Box>{destinyForm ? <TriangleDiagram></TriangleDiagram> : <></>}</Box>;
}

export default DestinyResultWithTheme;
