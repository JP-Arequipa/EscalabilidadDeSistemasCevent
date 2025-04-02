import React from 'react';
import { TextField, FormControl } from '@mui/material';

interface ReusableFieldProps {
  label: string;
  name: string;
  value: string | number | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

const RedeemFormField: React.FC<ReusableFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error = false,
  helperText = '',
  disabled = false,
}) => {
  return (
    <FormControl variant="outlined" fullWidth>
      <TextField
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
        variant="outlined"
        fullWidth
        disabled={disabled}
        className="text-field"
      />
    </FormControl>
  );
};

export default RedeemFormField;
