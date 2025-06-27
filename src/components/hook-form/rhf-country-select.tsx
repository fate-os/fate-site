import { Controller, useFormContext } from 'react-hook-form';
import { CountrySelect } from 'src/components/country-select';

// ----------------------------------------------------------------------

interface RHFCountrySelectProps {
  name: string;
  helperText?: string;
  [key: string]: any;
}

export function RHFCountrySelect({ name, helperText, ...other }: RHFCountrySelectProps) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <CountrySelect
          id={`rhf-country-select-${name}`}
          value={field.value}
          onChange={(_event: any, newValue: string) =>
            setValue(name, newValue, { shouldValidate: true })
          }
          error={!!error}
          helperText={error?.message ?? helperText}
          {...other}
        />
      )}
    />
  );
}
