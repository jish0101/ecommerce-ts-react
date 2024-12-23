import { AxiosResponse } from 'axios';
import { CreateResponse } from '@/types/api';
import { PayloadUser } from '@/types/user';
import axiosWithCredentials from '../axios-with-credentials';

export const login = async (
  payload: Record<string, any>
): Promise<AxiosResponse<CreateResponse<PayloadUser>>> => {
  return await axiosWithCredentials.post('/auth/login', payload);
};

export const refreshToken = async (
  payload: Record<string, any>
): Promise<AxiosResponse<CreateResponse<PayloadUser>>> => {
  return await axiosWithCredentials.post('/auth/refresh', payload);
};

export const logout = async (): Promise<
  AxiosResponse<CreateResponse<true>>
> => {
  return await axiosWithCredentials.post(
    '/auth/logout',
    {},
    { withCredentials: true }
  );
};

export const verifyUser = async (
  payload: Record<string, any>
): Promise<AxiosResponse<CreateResponse<true>>> => {
  return await axiosWithCredentials.post('/auth/verify-user', payload);
};

export const reSendOtp = async (
  payload: Record<string, any>
): Promise<AxiosResponse<CreateResponse<true>>> => {
  return await axiosWithCredentials.post('/auth/send-otp', payload);
};

export const resetPassword = async (
  payload: Record<string, any>
): Promise<AxiosResponse<CreateResponse<true>>> => {
  return await axiosWithCredentials.post('/auth/reset-password', payload);
};
