import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface RedirectRouteProps {
  children: JSX.Element;
}

const RedirectRoute: React.FC<RedirectRouteProps> = ({ children }) => {
  const token = useSelector((state: RootState) => state.auth.token);

  if (token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RedirectRoute;
