import { DashboardContent } from '@/layouts/dashboard';
import { Box, CardContent, Card, Typography, Stack } from '@mui/material';
import React from 'react';

const AboutUs = () => {
  return (
    <Box>
      <DashboardContent sx={{ justifyContent: 'center' }}>
        <Card sx={{ boxShadow: 'none', border: '1px dashed #ddd' }}>
          <CardContent>
            <Stack spacing={3}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                About Fate OS Inc.
              </Typography>

              <Typography variant="h6" fontWeight="bold">
                Mei Zhu He – Founder of Fate OS Inc.
              </Typography>
              <Typography>
                <b>Mei Zhu He</b>, a Chinese-American born on <b>June 20, 1957</b>, in Shanghai,
                China, is the sole founder of Fate OS Inc.
                <br />A founder with profound insight into destiny systems, Ms. He currently resides
                in Los Angeles, USA. On <b>May 14, 2025</b>, she independently established Fate OS
                Inc. in the state of Delaware, with the mission of bringing ancient metaphysical
                wisdom to all of humanity through modern technological form.
              </Typography>

              <Typography>
                <b>Fate OS Inc.</b> is the world’s first metaphysical platform to integrate a{' '}
                <b>“1 to 60 numerical system”</b> with a <b>triangular structure of fate</b>. Within
                seconds, users can gain insight into whether they are in a favorable or unfavorable
                life phase—and grasp the overall trajectory of their destiny—empowering them to plan
                ahead, seize turning points, and avoid misfortune.
              </Typography>

              <Typography>
                Prior to founding Fate OS, Ms. He spent many years quietly studying metaphysical
                systems. She analyzed the destinies of internationally renowned public figures using
                publicly available information, and discreetly shared her findings through her X
                (formerly Twitter) account, <b>@he_precise</b>.
              </Typography>

              <Typography>
                To her astonishment, she discovered that{' '}
                <b>destiny is not only something to be read—it can also be set</b>.<br />
                Fate OS is her systematic attempt to usher in a new era of destiny—one that is{' '}
                <b>predictable, plannable, and even programmable</b>.
              </Typography>

              <Box px={2} py={2} bgcolor={(theme) => theme.palette.grey[100]} borderRadius={2}>
                <Typography variant="subtitle1" fontStyle="italic" gutterBottom>
                  The most revealing line in the 59th prophecy of Tui Bei Tu, one of China’s most
                  well-known ancient prophetic texts, reads:
                </Typography>
                <Typography variant="h6" fontWeight="bold" fontStyle="italic" gutterBottom>
                  “Holding the lot-drawing tube, the bamboo sticks are removed.”
                </Typography>
                <Typography fontStyle="italic">
                  This single verse unveils a revolutionary future:
                </Typography>
              </Box>

              <Typography>
                Humanity will live in a time where destiny no longer needs to be divined.
                <br />
                The need for fortune-telling disappears—not because destiny becomes irrelevant, but
                because it has already been predefined.
                <br />
                Even billionaires and powerful leaders have long relied on astrology and prediction
                to navigate uncertainty. But in the future envisioned by Fate OS, humanity gains
                access to tools that enable them to design their own fate—transforming destiny from
                something unknown to something settable.
              </Typography>

              <Typography fontStyle="italic">
                As the verse suggests: <b>“The tube remains in hand, but the sticks are gone.”</b>
                <br />
                This means the old practice of fortune-telling will fade away, and the power of
                destiny will truly return to the hands of each individual.
              </Typography>

              <Typography variant="h6" fontWeight="bold" color="primary" mt={2}>
                Fate OS is the beginning of this destiny revolution.
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </DashboardContent>
    </Box>
  );
};

export default AboutUs;
