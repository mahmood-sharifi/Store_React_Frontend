import React from 'react';
import { Button as MuiButton } from '@mui/material';

interface ButtonProps {
  type: 'button' | 'submit';
  children: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ type, children, disabled }) => {
  return (
    <MuiButton
      type={type}
      variant="contained"
      color="primary"
      fullWidth
      sx={{ mt: 2 }}
      disabled={disabled}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
