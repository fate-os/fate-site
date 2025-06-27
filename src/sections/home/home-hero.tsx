import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';

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
          maxWidth: 1000,
          bgcolor: 'white',
          boxShadow: '0 0 15px rgba(0,0,0,0.1)',
          borderRadius: 2,
          overflow: 'hidden',
          mx: 2,
        }}
      >
        <Grid container direction={isSmDown ? 'column' : 'row'}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: { xs: 3, md: 5 }, color: '#333', lineHeight: 1.8 }}>
              <Typography variant="h5" sx={{ color: '#b30059', fontWeight: 700 }} gutterBottom>
                谶曰：
              </Typography>
              <Typography variant="body1">无城无府 无尔无我</Typography>
              <Typography variant="body1">天下一家 治臻大化</Typography>
              <Typography
                variant="h5"
                sx={{ color: '#b30059', fontWeight: 700, mt: 4 }}
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
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                p: { xs: 2, md: 4 },
              }}
            >
              <Image
                src="/assets/images/tbt59.jpg"
                alt="推背图第59像"
                style={{ maxWidth: '100%', height: 'auto', borderRadius: 8 }}
                width={400}
                height={500}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomeHero;
