import React from 'react';
import { useBoolean } from 'src/hooks/use-boolean';

import { today, fIsAfter } from 'src/utils/format-time';
import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { schemaHelper } from 'src/components/hook-form';
import { Field, Form } from '@/components/hook-form';
import { Box, Button, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { DestinyFormValues } from '@/types';
import { useAppDispatch } from '@/store/hooks';
import { destinyFormInit } from '@/store/features/app.reducer';

type Props = {};

export const DestinySchema = zod.object({
  year: schemaHelper.date({ message: { required_error: 'Year is required!' } }),
  month: schemaHelper.date({ message: { required_error: 'Month is required!' } }),
  day: schemaHelper.date({ message: { required_error: 'Day is required!' } }),
  time: schemaHelper.date({ message: { required_error: 'Time is required!' } }),
});
// .refine((data) => !fIsAfter(data.createDate, data.dueDate), {
//   message: 'Due date cannot be earlier than create date!',
//   path: ['dueDate'],
// });

const DestinyForm = (props: Props) => {
  const defaultValues = useMemo<DestinyFormValues>(
    () => ({
      year: null,
      month: null,
      day: null,
      time: null,
    }),
    []
  );

  const methods = useForm<DestinyFormValues>({
    mode: 'all',
    resolver: zodResolver(DestinySchema),
    defaultValues,
  });

  const dispatch = useAppDispatch();

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    control,
  } = methods;

  // Watch the year, month, and day fields
  const yearValue = useWatch({ control, name: 'year' });
  const monthValue = useWatch({ control, name: 'month' });
  const dayValue = useWatch({ control, name: 'day' });

  // When year changes, set month, day, and time to Jan 1, 00:00 of that year
  React.useEffect(() => {
    if (yearValue) {
      const date = dayjs(yearValue).startOf('year');
      setValue('month', date.toISOString());
      setValue('day', date.toISOString());
      setValue('time', date.toISOString());
    } else {
      setValue('month', null);
      setValue('day', null);
      setValue('time', null);
    }
  }, [yearValue, setValue]);

  // When month changes, set day and time to the first day of that month at 00:00
  React.useEffect(() => {
    if (yearValue && monthValue) {
      // monthValue is an ISO string, get the year and month from it
      const date = dayjs(monthValue).startOf('month');
      setValue('day', date.toISOString());
      setValue('time', date.toISOString());
    }
  }, [monthValue, yearValue, setValue]);

  // When day changes, set time to the start of that day (00:00)
  React.useEffect(() => {
    if (yearValue && monthValue && dayValue) {
      const date = dayjs(dayValue).startOf('day');
      setValue('time', date.toISOString());
    }
  }, [dayValue, yearValue, monthValue, setValue]);

  const handleCreateAndSend = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      dispatch(destinyFormInit(data));
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Box>
      <Stack spacing={4}>
        <Typography variant="h5">Please provide your information</Typography>

        <Form methods={methods} onSubmit={handleCreateAndSend}>
          <Stack spacing={4}>
            <Field.DatePicker
              name="year"
              label="Select Year"
              views={['year']}
              slotProps={{}}
              format={null}
              disableFuture
            />
            <Field.DatePicker
              name="month"
              label="Select Month"
              views={['month']}
              slotProps={{}}
              format={null}
              disabled={!yearValue}
            />
            <Field.DatePicker
              name="day"
              label="Select Day"
              views={['day']}
              slotProps={{}}
              format={null}
              disabled={!yearValue}
            />
            <Field.DesktopTimePicker
              name="time"
              label="Select Time"
              slotProps={{}}
              format={null}
              disabled={!yearValue}
            />

            <Button
              fullWidth
              color="primary"
              type="submit"
              size="large"
              variant="contained"
              loading={isSubmitting}
            >
              Confirm
            </Button>
          </Stack>
        </Form>
      </Stack>
    </Box>
  );
};

export default DestinyForm;
