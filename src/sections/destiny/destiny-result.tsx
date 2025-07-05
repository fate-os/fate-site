import React from 'react';
import { Box, Typography, Alert } from '@mui/material';
import { useAppSelector } from '@/store/hooks';
import { TriangleDiagram } from './triangle-diagram';

function DestinyResult() {
  const { destinyForm, fateQuoteResult } = useAppSelector((e) => e.app);

  if (!destinyForm) {
    return (
      <Box>
        {/* <Typography variant="h6" color="text.secondary" textAlign="center">
          Please fill out the form to see your destiny result
        </Typography> */}
      </Box>
    );
  }

  if (!fateQuoteResult) {
    return (
      <Box>
        <Alert severity="info">
          No fate quote found for the selected date and gender. Please try a different date.
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Your Destiny Result
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Date: {destinyForm.time ? new Date(destinyForm.time).toLocaleDateString() : 'N/A'} | Gender:{' '}
        {destinyForm.gender}
      </Typography>

      <TriangleDiagram
        top={fateQuoteResult.quote_parameters.top_number}
        rightSide={fateQuoteResult.quote_parameters.right_side_number}
        bottomRight={fateQuoteResult.quote_parameters.bottom_right_number}
        bottomLeft={fateQuoteResult.quote_parameters.bottom_left_number}
        leftSide={fateQuoteResult.quote_parameters.left_side_number}
        leftSideArrow={fateQuoteResult.quote_parameters.left_side_arrow}
        rightSideArrow={fateQuoteResult.quote_parameters.right_side_arrow}
        bottomArrow={fateQuoteResult.quote_parameters.bottom_arrow}
        straightLeft={fateQuoteResult.quote_parameters.straight_left}
        straightRight={fateQuoteResult.quote_parameters.straight_right}
      />
    </Box>
  );
}

export default DestinyResult;
