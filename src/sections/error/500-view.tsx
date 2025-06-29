'use client';

import { m } from 'framer-motion';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { SimpleLayout } from 'src/layouts/simple';
import { ServerErrorIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

type View500Props = {
  subTitle?: string;
};

export function View500({ subTitle }: View500Props) {
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
          500 Internal server error
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ color: 'text.secondary' }}>
          {subTitle ? subTitle : 'There was an error, please try again later.'}
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <ServerErrorIllustration sx={{ my: { xs: 5, sm: 10 } }} hideBackground={false} />
      </m.div>

      <Button component={RouterLink} href="/" variant="outlined">
        Go to home
      </Button>
    </Container>
  );
}
