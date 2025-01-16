import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import UserProfileForm from '../components/molecules/UserProfileForm';

const UserProfilePage: React.FC = () => {
  const profile = useSelector((state: RootState) => state.auth.profile);

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div>
      <h2>Your Profile</h2>
      <UserProfileForm profile={profile} />
    </div>
  );
};

export default UserProfilePage;
