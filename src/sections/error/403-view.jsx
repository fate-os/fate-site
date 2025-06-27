'use client';

import { m } from 'framer-motion';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';
import { ForbiddenIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';
import { useRouter } from 'next/navigation';
import { Stack } from '@mui/material';

// ----------------------------------------------------------------------

export function View403({ subTitle }) {
  const router = useRouter();

  return (
    <Container
      component={MotionContainer}
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <m.div variants={varBounce().in}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Uh-oh! You’re Not Allowed Here
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ color: 'text.secondary' }}>
          {subTitle ? subTitle : 'Something went wrong. Maybe try logging in?'}
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <ForbiddenIllustration sx={{ my: { xs: 5, sm: 10 } }} />
      </m.div>

      <Stack spacing={2} direction={'row'}>
        <Button component={RouterLink} href="/" variant="outlined" color="primary">
          Go to home
        </Button>
        <Button variant="contained" onClick={router.back} color="warning">
          Go back
        </Button>
      </Stack>
    </Container>
  );
}
