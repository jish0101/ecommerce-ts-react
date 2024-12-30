import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import axiosInstance from '@/api/axios';

export type Pagination = {
  page?: number;
  limit?: number;
  total?: number;
};

export type UseDataQueryOptions = {
  endpoint: string;
  params?: Pagination & Record<string, string | number>;
  queryKey: string;
  enabled?: boolean;
};

const useGetQuery = <T>(options: UseDataQueryOptions) => {
  const { endpoint, params, queryKey, enabled=true } = options;

  const { data, isLoading, isError, error } = useQuery(
    [queryKey, params],
    getData,
    {
      enabled,
      retry: 1,
      staleTime: Infinity
    }
  );

  async function getData(): Promise<AxiosResponse<T>['data']> {
    const response = (await axiosInstance.get(endpoint, {
      params
    })) as AxiosResponse<T>;

    if (!response) {
      throw new Error('Failed to fetch data');
    }

    const { data, status } = response;

    if (status === 200) {
      return data;
    }

    throw new Error('Unexpected status code received');
  }

  return {
    data,
    isLoading,
    isError,
    error: error as any
  };
};

export default useGetQuery;
