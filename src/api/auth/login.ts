import { AxiosResponse } from 'axios';
import axiosInstance from '../axios';
import { CreateResponse } from '@/types/api';
import { PayloadUser } from '@/types/user';

export const login = async (
  payload: Record<string, any>
): Promise<AxiosResponse<CreateResponse<PayloadUser>>> => {
  return await axiosInstance.post('/auth/login', payload);
};
