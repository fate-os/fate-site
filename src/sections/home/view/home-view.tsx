'use client';

import Stack from '@mui/material/Stack';

import HomeHero from '../home-hero';

// ----------------------------------------------------------------------

export function HomeView() {
  return (
    <>
      <HomeHero />

      <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>
        {/* <HomePricing /> */}
        {/* <HomeTestimonials />  */}
      </Stack>
    </>
  );
}
