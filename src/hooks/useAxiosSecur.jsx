import { useEffect } from 'react';
import useAuth from './useAuth';
import axios from 'axios';
import { useNavigate } from 'react-router';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

const useAxiosSecur = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = axiosInstance.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${user.accessToken}`;

      return config;
    });
  }, [user]);

  return axiosInstance;
};

export default useAxiosSecur;
