import { User } from '@/types/user';
import { GetResponse } from '@/types/api';
import useGetQuery, { Pagination } from './useGetQuery';

const useUsers = (pagination: Pagination) => {
  return useGetQuery<GetResponse<User>>({
    endpoint: '/api/users/get',
    pagination,
    queryKey: 'users',
  });
};

export default useUsers;
