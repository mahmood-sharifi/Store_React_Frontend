import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const UserCard: React.FC<{ user: any }> = ({ user }) => {
  return (
    <Box mb={2} p={2} border="1px solid #ddd" borderRadius="4px">
      <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
      <Typography>Email: {user.email}</Typography>
      <Button variant="contained" color="primary">
        Edit User
      </Button>
    </Box>
  );
};

export default UserCard;
