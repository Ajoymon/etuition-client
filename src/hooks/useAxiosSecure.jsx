import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosInstance = axios.create({
  baseURL: 'https://etuitionbd-server-smoky.vercel.app/',
});

const useAxiosSecur = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = axiosInstance.interceptors.request.use(
      async config => {
        if (user) {
          const token = await user.getIdToken();

          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
    );

    const resInterceptor = axiosInstance.interceptors.response.use(
      response => response,
      error => {
        const statusCode = error.response?.status;
        if (statusCode === 401 || statusCode === 403) {
          logOut().then(() => {
            navigate('/login');
          });
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptor);
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosInstance;
};

export default useAxiosSecur; // ✅ এটা যোগ করুন
