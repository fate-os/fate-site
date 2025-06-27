import { Box, CircularProgress } from '@mui/material';

export const ProgressLoader = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
      <CircularProgress color="secondary" />
    </Box>
  );
};
