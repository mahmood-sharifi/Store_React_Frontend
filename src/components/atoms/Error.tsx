import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

interface ErrorProps {
  error: FetchBaseQueryError | SerializedError;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  const getErrorMessage = () => {
    if ('status' in error) {
      return JSON.stringify(error.data) || error.status;
    }
    return error.message;
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Typography variant="h6" color="error">
        {getErrorMessage() || 'An unexpected error occurred'}
      </Typography>
    </Box>
  );
};

export default Error;
