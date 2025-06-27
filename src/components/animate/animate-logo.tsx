//@ts-nocheck
'use client';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';

import { varAlpha } from 'src/theme/styles';

import { Logo } from '../logo';
import { useTheme } from '@mui/material';

// ----------------------------------------------------------------------

export function AnimateLogo1({ logo, sx, ...other }: any) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: 120,
        height: 120,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx,
      }}
      {...other}
    >
      {/* Central Logo with subtle breathing animation */}
      <Box
        component={m.div}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        sx={{
          position: 'relative',
          zIndex: 3,
        }}
      >
        {logo ?? <Logo disableLink width={50} height={50} />}
      </Box>

      {/* Clean rotating border */}
      <Box
        component={m.div}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
        sx={{
          position: 'absolute',
          width: '85%',
          height: '85%',
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: '50%',
          borderTopColor: 'transparent',
          borderRightColor: 'transparent',
          opacity: 0.6,
        }}
      />

      {/* Inner subtle pulse ring */}
      <Box
        component={m.div}
        animate={{
          scale: [0.9, 1.1, 0.9],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        sx={{
          position: 'absolute',
          width: '70%',
          height: '70%',
          border: `1px solid ${theme.palette.primary.light}`,
          borderRadius: '50%',
        }}
      />

      {/* Minimalist corner dots */}
      {[0, 90, 180, 270].map((angle, index) => (
        <Box
          key={index}
          component={m.div}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.2,
            ease: 'easeInOut',
          }}
          sx={{
            position: 'absolute',
            width: 4,
            height: 4,
            borderRadius: '50%',
            bgcolor: theme.palette.primary.main,
            transform: `rotate(${angle}deg) translateY(-45px)`,
            transformOrigin: 'center 45px',
          }}
        />
      ))}

      {/* Smooth fade border effect */}
      <Box
        component={m.div}
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: `linear-gradient(45deg, transparent, ${theme.palette.primary.main}20, transparent)`,
          border: `1px solid ${theme.palette.primary.main}30`,
        }}
      />

      {/* Clean progress arc */}
      <Box
        component={m.div}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'linear',
        }}
        sx={{
          position: 'absolute',
          width: '95%',
          height: '95%',
          borderRadius: '50%',
          background: `conic-gradient(from 0deg, transparent 270deg, ${theme.palette.primary.main} 280deg, transparent 290deg)`,
          opacity: 0.4,
        }}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------

export function AnimateLogo2({ logo, sx, ...other }: any) {
  return (
    <Box
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 96,
        height: 96,
        position: 'relative',
        alignItems: 'center',
        display: 'inline-flex',
        justifyContent: 'center',
        ...sx,
      }}
      {...other}
    >
      {logo ?? <Logo sx={{ zIndex: 9 }} />}

      <Box
        component={m.div}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, ease: 'linear', repeat: Infinity }}
        sx={{
          width: 1,
          height: 1,
          opacity: 0.16,
          borderRadius: '50%',
          position: 'absolute',
          transition: (theme) =>
            theme.transitions.create(['opacity'], {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.shorter,
            }),
          background: (theme) =>
            `linear-gradient(135deg, ${varAlpha(theme.vars.palette.primary.mainChannel, 0)} 50%, ${theme.vars.palette.primary.main} 100%)`,
        }}
      />
    </Box>
  );
}
