import { Cart } from '@/types/cart';
import { CreateResponse } from '@/types/api';
import { AxiosError, AxiosInstance } from 'axios';

export type CartUpdateResponse = CreateResponse<Cart>;

export async function updateCart(
  payload: any,
  axios: AxiosInstance
): Promise<CartUpdateResponse | Error> {
  try {
    const response = await axios.put('/api/cart/update', payload);
    return response?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error;
    }
    return error as AxiosError;
  }
}

export async function deleteFromCart(payload: any, axios: AxiosInstance) {
  try {
    const response = (await axios.delete(
      '/api/cart/delete',
      payload
    )) as CartUpdateResponse;
    return response.data;
  } catch (error) {
    return error as Error;
  }
}

export async function getCart(payload: any, axios: AxiosInstance) {
  try {
    const response = (await axios.get(
      '/api/cart/get',
      payload
    )) as CartUpdateResponse;
    return response.data;
  } catch (error) {
    return error as Error;
  }
}
