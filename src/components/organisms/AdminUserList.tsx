// src/components/organisms/AdminUserList.tsx
import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { useDeleteUserMutation } from '../../features/user/userQuery';

interface AdminUserListProps {
  users: any[];
  refetchUsers: () => void;
}

const AdminUserList: React.FC<AdminUserListProps> = ({ users, refetchUsers }) => {
  const [deleteUser] = useDeleteUserMutation();

  const handleDeleteUser = async (userId: number) => {
    await deleteUser(userId);
    refetchUsers();
  };

  return (
    <Box>
      {users.map((user) => (
        <Card key={user.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography>Email: {user.email}</Typography>
            <Box mt={2}>
              <Button variant="outlined" color="error" onClick={() => handleDeleteUser(user.id)}>
                Delete User
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default AdminUserList;
