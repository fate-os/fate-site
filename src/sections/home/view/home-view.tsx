'use client';

import Stack from '@mui/material/Stack';

import HomeHero from '../home-hero';
import AboutUs from '../about-us';

// ----------------------------------------------------------------------

export function HomeView() {
  return (
    <>
      <Stack spacing={15}>
        <HomeHero />
        <AboutUs />
      </Stack>

      <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>
        {/* <HomePricing /> */}
        {/* <HomeTestimonials />  */}
      </Stack>
    </>
  );
}
