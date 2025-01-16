import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface AdminRouteProps {
  children: JSX.Element;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const profile = useSelector((state: RootState) => state.auth.profile);

  if (!profile) {
    return <Navigate to="/login" />;
  }

  if (profile.role !== 'Admin') {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
