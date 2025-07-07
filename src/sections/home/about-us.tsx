import React from 'react';
import { Image } from '@/components/image/image';
import { DashboardContent } from '@/layouts/dashboard';
import { Box, CardContent, Card, Typography, Stack, Grid2 } from '@mui/material';
import { JwtSignUpView } from 'src/sections/auth/jwt/jwt-sign-up-view';
import { useTranslate } from '@/locales';

const AboutUs = () => {
  const { t } = useTranslate('app');

  // Helper for <br />
  const renderWithBreaks = (key: string) =>
    t(key)
      .split('<br />')
      .map((line, idx, arr) =>
        idx < arr.length - 1 ? (
          <React.Fragment key={idx}>
            {line}
            <br />
          </React.Fragment>
        ) : (
          <React.Fragment key={idx}>{line}</React.Fragment>
        )
      );

  return (
    <DashboardContent sx={{ justifyContent: 'center', py: 10 }}>
      <Card sx={{ boxShadow: 'none', border: '1px dashed #ddd' }}>
        <CardContent>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 8 }}>
              <Stack spacing={3}>
                <Grid2 container spacing={5}>
                  <Grid2 size={{ md: 3, sm: 4, xs: 12 }}>
                    <Image
                      alt="Mei Zhu He – Founder of Fate OS Inc."
                      src="/assets/images/founder.png"
                      width={145}
                      height={195}
                      imageSx={{ borderRadius: 1 }}
                    ></Image>
                  </Grid2>

                  <Grid2 mt={3} size={{ md: 9, sm: 8, xs: 12 }}>
                    <Stack spacing={3} mt={3}>
                      <Typography variant="h4" fontWeight="bold">
                        {t('main.aboutTitle')}
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {t('main.founderTitle')}
                      </Typography>
                      <Typography variant="h6">{t('main.founderBio')}</Typography>
                    </Stack>
                  </Grid2>
                </Grid2>

                <Typography>{t('main.visionary')}</Typography>

                <Typography>{t('main.inspiration')}</Typography>

                <Typography>{t('main.platform')}</Typography>

                <Typography>{t('main.origin')}</Typography>

                <Typography>{t('main.order')}</Typography>

                <Typography>{t('main.decode')}</Typography>

                <Typography>{t('main.seeDestiny')}</Typography>

                <Typography>{renderWithBreaks('main.structure')}</Typography>

                <Typography>{renderWithBreaks('main.calculation')}</Typography>

                <Typography>{t('main.newEra')}</Typography>

                <Box px={2} py={2} bgcolor={(theme) => theme.palette.grey[100]} borderRadius={2}>
                  <Typography variant="subtitle1" fontStyle="italic" gutterBottom>
                    {t('main.tbtIntro')}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" fontStyle="italic" gutterBottom>
                    {t('main.tbtOde')}
                  </Typography>
                  <Typography fontStyle="italic">{renderWithBreaks('main.tbtMeaning')}</Typography>
                </Box>

                <Typography>{renderWithBreaks('main.designFate')}</Typography>

                <Box px={2} py={2} bgcolor={(theme) => theme.palette.grey[100]} borderRadius={2}>
                  <Typography variant="subtitle1" fontStyle="italic" gutterBottom>
                    {t('main.tbtOde2Intro')}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" fontStyle="italic" gutterBottom>
                    {t('main.tbtOde2')}
                  </Typography>
                  <Typography fontStyle="italic">
                    {renderWithBreaks('main.tbtOde2Meaning')}
                  </Typography>
                </Box>

                <Typography variant="h6" fontWeight="bold" color="primary" mt={2}>
                  {t('main.future')}
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
