import React from 'react';
import { useBoolean } from 'src/hooks/use-boolean';

import { today, fIsAfter } from 'src/utils/format-time';
import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { schemaHelper } from 'src/components/hook-form';
import { Field, Form } from '@/components/hook-form';
import { Box, Button, MenuItem, Stack, Typography, Alert } from '@mui/material';
import dayjs from 'dayjs';
import { DestinyFormValues } from '@/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  destinyFormInit,
  setFateQuoteResult,
  setFateQuoteError,
} from '@/store/features/app.reducer';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_FATE_QUOTE } from '@/graphql/query/FateQuote';
import { MARK_CREDIT_USED } from '@/graphql/mutation/payment';
import { FateQuoteResponse } from '@/types';
import moment from 'moment';

type Props = {};

export const DestinySchema = zod.object({
  year: schemaHelper.date({ message: { required_error: 'Year is required!' } }),
  month: schemaHelper.date({ message: { required_error: 'Month is required!' } }),
  day: schemaHelper.date({ message: { required_error: 'Day is required!' } }),
  time: schemaHelper.date({ message: { required_error: 'Time is required!' } }),
  gender: zod.string().min(1, { message: 'Gender is required!' }),
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
      gender: '',
    }),
    []
  );

  const [getFateQuote, { loading: queryLoading, error: queryError }] =
    useLazyQuery<FateQuoteResponse>(GET_FATE_QUOTE, {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    });

  const [markCreditUsed, { loading: markCreditLoading }] = useMutation(MARK_CREDIT_USED, {
    errorPolicy: 'all',
  });

  const methods = useForm<DestinyFormValues>({
    mode: 'all',
    resolver: zodResolver(DestinySchema),
    defaultValues,
  });

  const dispatch = useAppDispatch();
  const { destinyForm, fateQuoteResult } = useAppSelector((state) => state.app);

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    control,
  } = methods;

  // Check if form has been submitted and has results
  const hasSubmittedForm = destinyForm;

  // Watch the year, month, and day fields
  const yearValue = useWatch({ control, name: 'year' });
  const monthValue = useWatch({ control, name: 'month' });
  const dayValue = useWatch({ control, name: 'day' });

  // When year changes, set month and day to Jan 1 of that year
  React.useEffect(() => {
    if (yearValue) {
      if (!dayjs(yearValue).isValid()) {
        return;
      }
      const date = dayjs(yearValue).startOf('year');
      setValue('month', date.toISOString());
      setValue('day', date.toISOString());
      // Don't auto-set time - let user select it
    } else {
      setValue('month', null);
      setValue('day', null);
      setValue('time', null);
    }
  }, [yearValue, setValue]);

  // When month changes, set day to the first day of that month
  React.useEffect(() => {
    if (yearValue && monthValue) {
      if (!dayjs(monthValue).isValid()) {
        return;
      }
      // monthValue is an ISO string, get the year and month from it
      const date = dayjs(monthValue).startOf('month');
      setValue('day', date.toISOString());
      // Don't auto-set time - let user select it
    }
  }, [monthValue, yearValue, setValue]);

  // When day changes, don't auto-set time - let user select it
  // Removed the useEffect that was setting time to start of day

  const handleConfirm = handleSubmit(async (data) => {
    try {
      // Combine the selected day with the selected time in UTC using moment.js
      let combinedDate;
      if (data.day && data.time) {
        // Get the date part from day and time part from time
        const dayDate = moment(data.day);
        const timeDate = moment(data.time);

        // Combine them in UTC: use day's date with time's time
        combinedDate = moment.utc([
          dayDate.year(),
          dayDate.month(),
          dayDate.date(),
          timeDate.hour(),
          timeDate.minute(),
          timeDate.second(),
          timeDate.millisecond(),
        ]);
      } else {
        // Fallback to just the time if day is not available
        combinedDate = moment.utc(data.time);
      }

      const formattedDate = combinedDate.toISOString();

      // Get shine and history parameters from URL
      const urlParams = new URLSearchParams(window.location.search);
      const shine = urlParams.get('shine') === 'true';
      const history_id = urlParams.get('history');

      // Call the GraphQL query
      const { data: queryData } = await getFateQuote({
        variables: {
          date: formattedDate,
          gender: data.gender,
          shine: shine,
          history_id: history_id,
        },
      });

      // Dispatch the form data first
      dispatch(destinyFormInit(data));

      // If successful, dispatch the result
      if (queryData?.getFateQuote?.success && queryData.getFateQuote?.result) {
        dispatch(setFateQuoteResult(queryData.getFateQuote.result));
        dispatch(setFateQuoteError(null)); // Clear any previous errors

        // Mark credit as used if history_id is provided and user is not super admin
        if (history_id && history_id !== 'admin-bypass') {
          try {
            await markCreditUsed({
              variables: {
                history_id: history_id,
                used_date: moment(combinedDate).toISOString(),
              },
            });
          } catch (markError) {
            console.error('Error marking credit as used:', markError);
            // Don't throw error here as the main operation was successful
          }
        }
      } else {
        // If not successful, dispatch the error message
        const errorMessage =
          queryData?.getFateQuote.message || 'Failed to retrieve fate quote. Please try again.';
        dispatch(setFateQuoteError(errorMessage));
        dispatch(setFateQuoteResult(null)); // Clear any previous results
      }
    } catch (error) {
      console.error(error);
    }
  });

  const handleReset = () => {
    // Reset the form to default values
    reset(defaultValues);

    // Clear the Redux state
    dispatch(destinyFormInit(null));
    dispatch(setFateQuoteResult(null));
    dispatch(setFateQuoteError(null));
  };

  return (
    <Box>
      <Stack spacing={4}>
        <Typography variant="h5">Please provide your information</Typography>

        <Form methods={methods} onSubmit={handleConfirm}>
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
            <Field.Select fullWidth name="gender" label="Gender" disabled={!yearValue}>
              {['male', 'female'].map((option) => (
                <MenuItem key={option} value={option} sx={{ textTransform: 'capitalize' }}>
                  {option}
                </MenuItem>
              ))}
            </Field.Select>

            {queryError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {queryError.message}
              </Alert>
            )}

            {hasSubmittedForm && (
              <Box>
                <Button size="small" variant="text" onClick={handleReset} sx={{ mb: 2 }}>
                  Reset
                </Button>
              </Box>
            )}

            <Button
              fullWidth
              color="primary"
              type="submit"
              size="large"
              variant="contained"
              loading={isSubmitting || queryLoading || markCreditLoading}
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
