'use client';
import React from 'react';
import DestinyForm from '../destiny-form';
import { DashboardContent } from '@/layouts/dashboard';
import { Grid2 } from '@mui/material';
import DestinyResult from '../destiny-result';

export const DestinyView = () => {
  return (
    <DashboardContent sx={{ justifyContent: 'center', py: 10 }}>
      <Grid2 container spacing={20}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <DestinyForm></DestinyForm>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <DestinyResult></DestinyResult>
        </Grid2>
      </Grid2>
    </DashboardContent>
  );
};
