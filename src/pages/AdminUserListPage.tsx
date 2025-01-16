import React from 'react';
import { useGetAllUsersQuery } from '../features/user/userQuery';
import UserCard from '../components/molecules/UserCard';

const AdminUserListPage: React.FC = () => {
  const { data: users, isLoading } = useGetAllUsersQuery({});

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  return (
    <div>
      <h2>All Users</h2>
      {users?.items.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default AdminUserListPage;
