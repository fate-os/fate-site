// @ts-expect-error: No types for @canvasjs/react-charts
import CanvasJSReact from '@canvasjs/react-charts';

import React, { Component } from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useAppSelector } from '@/store/hooks';

const MAX_YEARS = 60;

function DestinyResultWithTheme() {
  const theme = useTheme();
  const { destinyForm } = useAppSelector((e) => e.app);

  class DestinyResult extends Component {
    render() {
      const birtdayDate = new Date(destinyForm?.time || new Date());
      const today = new Date();
      const years = Math.floor(
        (today.getTime() - birtdayDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
      );
      const fillYears = Math.min(years, MAX_YEARS);
      const emptyYears = MAX_YEARS - fillYears;

      // Data for pyramid/funnel: filled years and empty years
      const dataPoints: {
        label: string;
        y: number;
        color: string;
        percentage?: number | string;
      }[] = [
        { label: 'Lived Years', y: fillYears, color: theme.palette.primary.dark },
        { label: 'Potential Years', y: emptyYears, color: theme.palette.grey[300] },
      ];

      // Calculate percentage for each data point
      const total = dataPoints[0].y;
      for (let i = 0; i < dataPoints.length; i++) {
        if (i === 0) {
          dataPoints[i].percentage = 100;
        } else {
          dataPoints[i].percentage = ((dataPoints[i].y / total) * 100).toFixed(2);
        }
      }

      const options = {
        animationEnabled: true,
        // title: {
        //   text: `Years: ${years}`,
        // },
        legend: {
          horizontalAlign: 'right',
          verticalAlign: 'center',
          reversed: true,
        },
        data: [
          {
            type: 'pyramid',
            showInLegend: false,
            legendText: '{label}',
            indexLabel: '{label} - {y}',
            toolTipContent: null,
            dataPoints,
          },
        ],
      };

      return (
        <Stack spacing={4}>
          <Typography variant="h5">Fate OS result:</Typography>
          <CanvasJSReact.CanvasJSChart options={options} />
        </Stack>
      );
    }
  }

  return <Box>{destinyForm ? <DestinyResult></DestinyResult> : <></>}</Box>;
}

export default DestinyResultWithTheme;
