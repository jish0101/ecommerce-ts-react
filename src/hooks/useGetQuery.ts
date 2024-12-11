import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import useAxiosPrivate from './useAxiosPrivate';

export type Pagination = {
  page: number;
  pageSize: number;
  total: number;
};

type UseDataQueryOptions = {
  endpoint: string;
  pagination: Pagination;
  queryKey: string;
};

const useGetQuery = <T,>(options: UseDataQueryOptions) => {
    const axiosPrivate = useAxiosPrivate();
    const { endpoint, pagination, queryKey } = options;

  const { data, isLoading, isError, error } = useQuery(
    [queryKey, pagination],
    getData,
    {
      staleTime: Infinity,
      retry: 1,
    }
  );

  async function getData(): Promise<AxiosResponse<T>['data']> {
    const response = (await axiosPrivate.get(endpoint, { params: pagination })) as AxiosResponse<T>;

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
    error: error as any,
  };
};

export default useGetQuery;
