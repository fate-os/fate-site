import React from 'react';
import { Box, Typography, Alert, Stack } from '@mui/material';
import { useAppSelector } from '@/store/hooks';
import { TriangleDiagram } from './triangle-diagram';

function DestinyResult() {
  const { destinyForm, fateQuoteResult, fateQuoteError } = useAppSelector((e) => e.app);

  if (!destinyForm) {
    return (
      <Box>
        {/* <Typography variant="h6" color="text.secondary" textAlign="center">
          Please fill out the form to see your destiny result
        </Typography> */}
      </Box>
    );
  }

  // Show error message if there's an error
  if (fateQuoteError) {
    return (
      <Box>
        <Alert severity="error">{fateQuoteError}</Alert>
      </Box>
    );
  }

  if (!fateQuoteResult || fateQuoteResult.length === 0) {
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
        Your Destiny Results
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Date: {destinyForm.time ? new Date(destinyForm.time).toLocaleDateString() : 'N/A'} | Gender:{' '}
        {destinyForm.gender}
      </Typography>

      <Stack spacing={10}>
        {fateQuoteResult.map((result, index) => (
          <Box key={result.id} sx={{ my: 4 }}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Result {index + 1} - {new Date(result.date).toLocaleTimeString()}
            </Typography>
            <TriangleDiagram
              top={result.quote_parameters.top_number}
              rightSide={result.quote_parameters.right_side_number}
              bottomRight={result.quote_parameters.bottom_right_number}
              bottomLeft={result.quote_parameters.bottom_left_number}
              leftSide={result.quote_parameters.left_side_number}
              leftSideArrow={result.quote_parameters.left_side_arrow}
              rightSideArrow={result.quote_parameters.right_side_arrow}
              bottomArrow={result.quote_parameters.bottom_arrow}
              straightLeft={result.quote_parameters.straight_left}
              straightRight={result.quote_parameters.straight_right}
              straightBottom={result.quote_parameters.straight_bottom}
              shine={result.quote_parameters.shine}
              perpendicular={result.quote_parameters.perpendicular}
              hasCircle={result.quote_parameters.has_circle}
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default DestinyResult;
