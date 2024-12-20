import { CreateResponse } from '@/types/api';
import { Product } from '@/types/product';
import { AxiosInstance, AxiosResponse } from 'axios';

type ProductApiResponse = AxiosResponse<CreateResponse<Partial<Product>>>;

export async function addToCart(payload: any, axios: AxiosInstance) {
  try {
    const response = (await axios.post(
      '/api/cart/create',
      payload
    )) as ProductApiResponse;
    return response.data;
  } catch (error) {
    return error as Error;
  }
}

export async function deleteFromCart(payload: any, axios: AxiosInstance) {
  try {
    const response = (await axios.delete(
      '/api/cart/delete',
      payload
    )) as ProductApiResponse;
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
    )) as ProductApiResponse;
    return response.data;
  } catch (error) {
    return error as Error;
  }
}
