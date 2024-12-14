import { Category } from '@/types/category';
import { CreateResponse } from '@/types/api';
import { AxiosInstance, AxiosResponse } from 'axios';

type ApiResponse = AxiosResponse<CreateResponse<Partial<Category>>>;

export async function createCategory(payload: any, axios: AxiosInstance) {
  try {
    const response = (await axios.post(
      '/api/categories/create',
      payload
    )) as ApiResponse;
    return response.data;
  } catch (error) {
    return error as Error;
  }
}
