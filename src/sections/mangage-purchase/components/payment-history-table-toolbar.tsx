import React, { useCallback } from 'react';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';

// ----------------------------------------------------------------------

type HistoryTableToolbarProps = {
  filters: any;
  options: { status: string[] };
  onResetPage: () => void;
};

export function HistoryTableToolbar({ filters, options, onResetPage }: HistoryTableToolbarProps) {
  const handleFilterStatus = useCallback(
    (event: any) => {
      const newValue =
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value;

      onResetPage();
      filters.setState({ status: newValue });
    },
    [filters, onResetPage]
  );

  return (
    <Stack
      spacing={2}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      direction={{ xs: 'column', md: 'row' }}
      sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
    >
      <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 200 } }} size="small">
        <InputLabel size="small">Status</InputLabel>
        <Select
          size="small"
          multiple
          value={filters.state.status}
          onChange={handleFilterStatus}
          input={<OutlinedInput label="Status" size="small" />}
          renderValue={(selected) => selected.map((value: any) => value).join(', ')}
          inputProps={{ id: 'status' }}
          MenuProps={{ PaperProps: { sx: { maxHeight: 240 } } }}
        >
          {options.status.map((option: any) => (
            <MenuItem key={option} value={option}>
              <Checkbox
                disableRipple
                size="small"
                checked={filters.state.status.includes(option)}
              />
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
