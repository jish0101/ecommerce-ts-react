import { AxiosResponse } from 'axios';
import axiosInstance from '../axios';
import { CreateResponse } from '@/types/api';
import { PayloadUser } from '@/types/user';

export const login = async (
  payload: Record<string, any>
): Promise<AxiosResponse<CreateResponse<PayloadUser>>> => {
  return await axiosInstance.post('/auth/login', payload);
};

export const logout = async (): Promise<
  AxiosResponse<CreateResponse<true>>
> => {
  return await axiosInstance.post(
    '/auth/logout',
    {},
    { withCredentials: true }
  );
};

export const verifyUser = async (
  payload: Record<string, any>
): Promise<AxiosResponse<CreateResponse<true>>> => {
  return await axiosInstance.post('/auth/verify-user', payload);
};

export const reSendOtp = async (
  payload: Record<string, any>
): Promise<AxiosResponse<CreateResponse<true>>> => {
  return await axiosInstance.post('/auth/send-otp', payload);
};
