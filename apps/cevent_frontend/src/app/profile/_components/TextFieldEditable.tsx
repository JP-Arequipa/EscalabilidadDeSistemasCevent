import { FormHelperText, TextField } from '@mui/material';
import { useState } from 'react';

interface TextFieldEditableProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
  regexValidation?: RegExp;
  errorMessage?: string;
  setIsValid?: (value: boolean) => void;
}

const TextFieldEditable = ({
  label,
  value,
  setValue,
  regexValidation,
  errorMessage,
  setIsValid,
}: TextFieldEditableProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      (regexValidation && !regexValidation.test(e.target.value)) ||
      e.target.value === ''
    ) {
      setIsValid && setIsValid(false);
    } else {
      setIsValid && setIsValid(true);
    }
    setValue(e.target.value);
  };

  return (
    <TextField
      id="outlined-basic"
      label={label}
      variant="outlined"
      defaultValue={value}
      fullWidth
      value={value}
      onChange={handleChange}
      error={
        regexValidation
          ? regexValidation.test(value)
            ? value === ''
            : true
          : value === ''
      }
      helperText={
        regexValidation && !regexValidation.test(value)
          ? errorMessage
          : value === ''
            ? 'This field is required'
            : ''
      }
    />
  );
};

export default TextFieldEditable;
