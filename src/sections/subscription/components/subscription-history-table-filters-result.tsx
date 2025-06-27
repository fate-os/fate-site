import { useCallback } from 'react';

import Chip from '@mui/material/Chip';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

// ----------------------------------------------------------------------

export function HistoryFiltersResult({ filters, onResetPage, totalResults, sx }: any) {
  const handleRemoveKeyword = useCallback(() => {
    onResetPage();
    filters.setState({ name: '' });
  }, [filters, onResetPage]);

  const handleRemoveRole = useCallback(
    (inputValue: string) => {
      const newValue = filters.state.status.filter((item: any) => item !== inputValue);

      onResetPage();
      filters.setState({ status: newValue });
    },
    [filters, onResetPage]
  );

  const handleReset = useCallback(() => {
    onResetPage();
    filters.onResetState();
  }, [filters, onResetPage]);

  return (
    <FiltersResult totalResults={totalResults} onReset={handleReset} sx={sx}>
      {/* <FiltersBlock label="Status:" isShow={filters.state.status !== 'all'}>
        <Chip
          {...(chipProps as any)}
          label={filters.state.status}
          onDelete={handleRemoveStatus}
          sx={{ textTransform: 'capitalize' }}
        />
      </FiltersBlock> */}

      <FiltersBlock label="Status:" isShow={!!filters.state.status.length}>
        {filters.state.status.map((item: any) => (
          <Chip
            {...(chipProps as any)}
            key={item}
            label={item}
            onDelete={() => handleRemoveRole(item)}
          />
        ))}
      </FiltersBlock>

      <FiltersBlock label="Keyword:" isShow={!!filters.state.name}>
        <Chip {...(chipProps as any)} label={filters.state.name} onDelete={handleRemoveKeyword} />
      </FiltersBlock>
    </FiltersResult>
  );
}
