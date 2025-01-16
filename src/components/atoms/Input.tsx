import React from 'react';
import { TextField } from '@mui/material';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  label: string;
  type: string;
  register: UseFormRegisterReturn;
  error?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ label, type, register, error }) => {
  return (
    <TextField
      label={label}
      type={type}
      variant="outlined"
      fullWidth
      margin="normal"
      {...register}
      error={!!error}
      helperText={error}
    />
  );
};

export default Input;
