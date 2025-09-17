import React, { useCallback } from 'react';
import Chip from '@mui/material/Chip';
import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

// ----------------------------------------------------------------------

type HistoryFiltersResultProps = {
  filters: any;
  onResetPage: () => void;
  totalResults: number;
  sx?: any;
};

export function HistoryFiltersResult({
  filters,
  onResetPage,
  totalResults,
  sx,
}: HistoryFiltersResultProps) {
  const handleRemoveKeyword = useCallback(() => {
    onResetPage();
    filters.setState({ name: '' });
  }, [filters, onResetPage]);

  const handleRemoveStatus = useCallback(
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
      <FiltersBlock label="Status:" isShow={!!filters.state.status.length}>
        {filters.state.status.map((item: any) => (
          <Chip
            {...(chipProps as any)}
            key={item}
            label={item}
            onDelete={() => handleRemoveStatus(item)}
          />
        ))}
      </FiltersBlock>

      <FiltersBlock label="Keyword:" isShow={!!filters.state.name}>
        <Chip {...(chipProps as any)} label={filters.state.name} onDelete={handleRemoveKeyword} />
      </FiltersBlock>
    </FiltersResult>
  );
}
