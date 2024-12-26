import { useEffect } from 'react';
import { toast } from './use-toast';
import axiosInstance from '@/api/axios';
import { refreshToken } from '@/api/auth';
import useUserState from '@/store/user/useUserState';
import { useLocation, useNavigate } from 'react-router-dom';

const useAxiosPrivate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, setUser, resetUser } = useUserState();

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

    const resposneInterceptors = axiosInstance.interceptors.response.use(
      (response) => Promise.resolve(response),
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401) {
          if (!originalRequest._retry) {
            try {
              originalRequest._retry = true;
              const { data, status } = await refreshToken({});

              if (status === 400) {
                toast({ title: 'Session expired, login again' });
                resetUser();
                return navigate('/auth/login', { state: location });
              }

              setUser(data.data);
              originalRequest.headers['Authorization'] =
                `Bearer ${data.data.accessToken}`;

              return axiosInstance(originalRequest);
            } catch (error) {
              toast({ title: 'Session expired, login again' });
              resetUser();
              navigate('/auth/login', { state: location });
            }
          }
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptors);
      axiosInstance.interceptors.response.eject(resposneInterceptors);
    };
  }, [user]);

  return axiosInstance;
};

export default useAxiosPrivate;
