import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';

// ----------------------------------------------------------------------

interface RHFAutocompleteProps<T>
  extends Omit<AutocompleteProps<T, boolean, boolean, boolean>, 'renderInput'> {
  name: string;
  label?: string;
  helperText?: string;
  hiddenLabel?: boolean;
  placeholder?: string;
}

export function RHFAutocomplete<T>({
  name,
  label,
  helperText,
  hiddenLabel,
  placeholder,
  ...other
}: RHFAutocompleteProps<T>) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          id={`rhf-autocomplete-${name}`}
          onChange={(_, newValue) => setValue(name, newValue, { shouldValidate: true })}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              error={!!error}
              helperText={error ? error?.message : helperText}
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
          {...other}
        />
      )}
    />
  );
}
