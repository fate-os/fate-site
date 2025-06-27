import { useState, forwardRef } from 'react';
import PhoneNumberInput from 'react-phone-number-input/input';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { getCountryCode } from './utils';
import { CountryListPopover } from './list';

// ----------------------------------------------------------------------

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  country?: string;
  disableSelect?: boolean;
  [key: string]: any;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, placeholder, country: inputCountryCode, disableSelect, ...other }, ref) => {
    const defaultCountryCode = getCountryCode(value, inputCountryCode);

    const [selectedCountry, setSelectedCountry] = useState<string>(defaultCountryCode);

    return (
      <PhoneNumberInput
        ref={ref}
        country={selectedCountry as any}
        inputComponent={CustomInput}
        value={value}
        onChange={onChange}
        placeholder={placeholder ?? 'Enter phone number'}
        InputProps={
          disableSelect
            ? undefined
            : {
                startAdornment: (
                  <InputAdornment position="start" sx={{ ml: 1 }}>
                    <CountryListPopover
                      countryCode={selectedCountry}
                      onClickCountry={(inputValue: string) => setSelectedCountry(inputValue)}
                    />
                  </InputAdornment>
                ),
              }
        }
        {...other}
      />
    );
  }
);

// ----------------------------------------------------------------------

const CustomInput = forwardRef<HTMLInputElement, any>((props, ref) => (
  <TextField inputRef={ref} {...props} />
));
