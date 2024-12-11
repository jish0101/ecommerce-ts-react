import { User } from '@/types/user';
import axiosInstance from '../axios';
import { AxiosResponse } from 'axios';
import { CreateResponse, GetResponse } from '@/types/api';

export const getUsers = async (
  payload: Record<string, any>
): Promise<AxiosResponse<GetResponse<User>>> => {
  return await axiosInstance.get('/api/users/get', payload);
};

export const createUser = async (
  payload: Record<string, any>
): Promise<AxiosResponse<CreateResponse<true>>> => {
  return await axiosInstance.post('/api/users/create', payload);
};
