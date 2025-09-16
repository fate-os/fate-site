import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';
import { useDebouncedCallback } from 'use-debounce';

// ----------------------------------------------------------------------

export function CouponTableToolbar({ filters, onResetPage }) {
  const handleFilterName = useDebouncedCallback((value) => {
    onResetPage();
    filters.setState({ name: value });
  }, 400);

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <TextField
            fullWidth
            value={filters.state.first_name}
            onChange={(e) => handleFilterName(e.target.value)}
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Stack>
    </>
  );
}
