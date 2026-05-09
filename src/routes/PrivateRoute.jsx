import React from 'react';
import useAuth from '../hooks/useAuth';
import Loging from '../Loding/Loging';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
  const { user, loding } = useAuth();
  const location = useLocation();
  if (loding) {
    return <Loging></Loging>;
  }
  if (!user) {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }
  return children;
};

export default PrivateRoute;
