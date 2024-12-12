import { useEffect } from 'react';
import axiosInstance from '@/api/axios';
import useUserState from '@/store/user/useUserState';

const useAxiosPrivate = () => {
  const user = useUserState((state) => state.user);

  useEffect(() => {
    const requestInterceptors = axiosInstance.interceptors.request.use(
      (config) => {
        if (user) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptors);
    };
  }, []);

  return axiosInstance;
};

export default useAxiosPrivate;
