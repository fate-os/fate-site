import React from 'react';
import { Image } from '@/components/image/image';
import { DashboardContent } from '@/layouts/dashboard';
import { Box, CardContent, Card, Typography, Stack, Grid2 } from '@mui/material';
import { JwtSignUpView } from 'src/sections/auth/jwt/jwt-sign-up-view';

const AboutUs = () => {
  return (
    <DashboardContent sx={{ justifyContent: 'center', py: 10 }}>
      <Card sx={{ boxShadow: 'none', border: '1px dashed #ddd' }}>
        <CardContent>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 8 }}>
              <Stack spacing={3}>
                <Stack direction={'row'} spacing={5}>
                  <Image
                    alt="Mei Zhu He – Founder of Fate OS Inc."
                    src="/assets/images/founder.png"
                    width={145}
                    height={195}
                    imageSx={{ borderRadius: 1 }}
                  ></Image>

                  <Stack spacing={3} mt={3}>
                    <Typography variant="h4" fontWeight="bold">
                      About Fate OS Inc.
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      Mei Zhu He – Founder of Fate OS Inc.
                    </Typography>
                    <Typography variant="h6">
                      <b>Mei Zhu He</b>, a Chinese-American born on <b>June 20, 1957</b>, in
                      <br /> Shanghai, China, is the sole founder of Fate OS Inc.
                    </Typography>
                  </Stack>
                </Stack>

                <Typography>
                  A visionary with profound insight into destiny systems, Ms. He currently resides
                  in Los Angeles,
                  <br /> USA. On <b>May 14, 2025</b>, she independently established Fate OS Inc. in
                  the state of Delaware, with <br />
                  the mission of bringing ancient metaphysical wisdom to all of humanity through
                  modern technology.
                </Typography>

                <Typography>
                  Fate OS was not the result of meticulous technical research, but the spark of
                  inspiration from an unplanned, seemingly trivial moment—like a message of destiny
                  suddenly “pushed” to her by the universe. Through this revelation, she realized
                  that fate is not only something to be read, but <br /> something that can be
                  pre-set.
                </Typography>

                <Typography>
                  <b>Fate OS Inc.</b> is the world's first metaphysical platform to integrate a{' '}
                  <b>"1 to 60 numerical system"</b> <br /> with a{' '}
                  <b>triangular structure of fate</b>. Within a few minutes, users can gain insight
                  into whether they are in a favorable or unfavorable life phase—and grasp the
                  overall trajectory of their destiny—empowering them to plan ahead, seize turning
                  points, and avoid misfortune.
                </Typography>

                <Typography>
                  The origin of the Fate OS system dates back to 2021, when I began publishing
                  metaphysical insights on X (formerly Twitter) under the account{' '}
                  <a href="https://x.com/he_precise" target="_blank" rel="noopener noreferrer">
                    <b>@he_precise</b>
                  </a>
                  . Years of public analysis and user engagement laid the groundwork for what has
                  now become Fate OS.
                </Typography>

                <Typography>
                  To her astonishment, she discovered that the universe has never allowed human
                  destiny to unfold in complete chaos.
                  <br />
                  On the contrary, it has long set a unique trajectory for every life—
                  <b>encoded within an underlying order</b>.
                </Typography>

                <Typography>
                  For thousands of years, humanity has questioned fate, yet no one has ever truly
                  "decoded" this structure.
                  <br />
                  Until now. Fate OS emerges to unveil a destiny system that was encoded by the
                  universe but never discovered.
                </Typography>

                <Typography>
                  Destiny has not suddenly appeared; we have simply gained the tools to finally see
                  it.
                </Typography>

                <Typography>
                  Destiny is not a mystery—it is a structure.
                  <br />
                  Just as 1 + 1 = 2, every life begins with a sequence of numbers and moves along a
                  precise trajectory.
                  <br />
                  The triangle is not a mere symbol; it is a formula.
                  <br />
                  Within this formula lies the blueprint of one's fate.
                </Typography>

                <Typography>
                  Fate OS is not about prediction—it is about precise calculation.
                  <br />
                  It reveals the universal laws that were written long ago—laws that can now be
                  seen.
                </Typography>

                <Typography>
                  Fate OS is her systematic attempt to usher in a new era of destiny—one that is
                  predictable, plannable, and even programmable.
                </Typography>

                <Box px={2} py={2} bgcolor={(theme) => theme.palette.grey[100]} borderRadius={2}>
                  <Typography variant="subtitle1" fontStyle="italic" gutterBottom>
                    Around 1,300 years ago: The most revealing line in the 59th prophecy of Tui Bei
                    Tu, one of China's most well-known ancient prophetic texts, is this Ode:
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" fontStyle="italic" gutterBottom>
                    "Holding the lot-drawing tube, the bamboo sticks are removed."
                  </Typography>
                  <Typography fontStyle="italic">
                    This single verse unveils a revolutionary future:
                    <br />
                    Humanity will live in a time where destiny no longer needs to be divined.
                    <br />
                    The need for fortune-telling disappears—not because destiny becomes irrelevant,
                    but because it has already been predefined.
                  </Typography>
                </Box>

                <Typography>
                  Even billionaires and powerful leaders have long relied on astrology and
                  prediction to navigate uncertainty.
                  <br />
                  But in the future envisioned by Fate OS, humanity gains access to tools that
                  enable them to design their own fate—transforming destiny from something unknown
                  to something settable.
                </Typography>

                <Box px={2} py={2} bgcolor={(theme) => theme.palette.grey[100]} borderRadius={2}>
                  <Typography variant="subtitle1" fontStyle="italic" gutterBottom>
                    As the Ode suggests:
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" fontStyle="italic" gutterBottom>
                    "The tube remains in hand, but the sticks are gone."
                  </Typography>
                  <Typography fontStyle="italic">
                    This means the old practice of fortune-telling will fade away, and the power of
                    destiny will truly return to the hands of each individual.
                  </Typography>
                </Box>

                <Typography variant="h6" fontWeight="bold" color="primary" mt={2}>
                  Fate OS serves not only all of humanity today, but also every future life yet to
                  come into this world
                </Typography>
              </Stack>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <Box sx={{ mt: { xs: 0, md: 10 } }}>
                <JwtSignUpView showLess></JwtSignUpView>
              </Box>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </DashboardContent>
  );
};

export default AboutUs;
