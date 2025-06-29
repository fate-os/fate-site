import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { Button } from '@mui/material';
import { SignInButton } from '@/layouts/components/sign-in-button';
import { JwtSignInView } from '../auth/jwt';

const HomeHero = () => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        fontFamily: 'Georgia, serif',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1200,
          bgcolor: 'white',
          boxShadow: '0 0 15px rgba(0,0,0,0.1)',
          borderRadius: 2,
          overflow: 'hidden',
          mx: 2,
        }}
      >
        <Grid container direction={isSmDown ? 'column' : 'row'}>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: { xs: 3, md: 5 }, color: '#333', lineHeight: 1.8 }}>
              <Typography variant="h5" sx={{ color: '#b30059', fontWeight: 700 }} gutterBottom>
                The prophecy says:
              </Typography>
              <Typography variant="body1">No cities, no capitals; no you, no me.</Typography>
              <Typography variant="body1">
                The world becomes one family, governed in great harmony.
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: '#b30059', fontWeight: 700, mt: 4 }}
                gutterBottom
              >
                Verse:
              </Typography>
              <Typography variant="body1">
                One person brings blessings to the whole world, Holding a divination tube, drawing
                out bamboo sticks. Red, yellow, black, and white are indistinct, East, west, south,
                and north all dwell in harmony.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ p: 2, pr: 0, pt: 5, color: '#333', lineHeight: 1.8 }}>
              <Typography variant="h6">《推背图》第59象</Typography>
              <Typography
                variant="h5"
                sx={{ color: '#b30059', fontWeight: 700, mt: 1 }}
                gutterBottom
              >
                谶曰：
              </Typography>
              <Typography variant="body1">无城无府 无尔无我</Typography>
              <Typography variant="body1">天下一家 治臻大化</Typography>
              <Typography
                variant="h5"
                sx={{ color: '#b30059', fontWeight: 700, mt: 2 }}
                gutterBottom
              >
                颂曰：
              </Typography>
              <Typography variant="body1">一人为大 世界之福</Typography>
              <Typography variant="body1">手执签筒 拔去竹木</Typography>
              <Typography variant="body1">红黄黑白 不分上下</Typography>
              <Typography variant="body1">东南西北 尽和为一</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                p: { xs: 2 },
              }}
            >
              <Image
                src="/assets/images/tbt59.jpg"
                alt="推背图第59像"
                style={{ maxWidth: '100%', height: 'auto', borderRadius: 8, scale: 1.2 }}
                width={200}
                height={400}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3.5} sx={{ p: 4, pr: 0 }}>
            <JwtSignInView showLess></JwtSignInView>
            {/* <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <SignInButton sx={{}}></SignInButton>
            </Box> */}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomeHero;
