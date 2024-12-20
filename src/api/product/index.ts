import { CreateResponse } from '@/types/api';
import { Product } from '@/types/product';
import { AxiosInstance, AxiosResponse } from 'axios';

type ProductApiResponse = AxiosResponse<CreateResponse<Partial<Product>>>;

export async function createProduct(payload: any, axios: AxiosInstance) {
  try {
    const response = (await axios.post(
      '/api/products/create',
      payload
    )) as ProductApiResponse;
    return response.data;
  } catch (error) {
    return error as Error;
  }
}
