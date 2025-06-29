import { Controller, useFormContext } from 'react-hook-form';
import { PhoneInput } from '../phone-input';

// ----------------------------------------------------------------------

interface RHFPhoneInputProps {
  name: string;
  helperText?: string;
  [key: string]: any;
}

export function RHFPhoneInput({ name, helperText, ...other }: RHFPhoneInputProps) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <PhoneInput
          {...field}
          fullWidth
          value={field.value}
          onChange={(newValue: string) => setValue(name, newValue, { shouldValidate: true })}
          error={!!error}
          helperText={error ? error.message : helperText}
          {...other}
        />
      )}
    />
  );
}
