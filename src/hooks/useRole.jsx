import React from 'react';
import useAuth from './useAuth';

const useRole = () => {
  const { user } = useAuth();
  const { isLoding: roleLoding };
  return <div></div>;
};

export default useRole;
