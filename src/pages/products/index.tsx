import { useState } from 'react';
import H4 from '@/components/typography/H4';
import { GetResponse } from '@/types/api';
import { Product } from '@/types/product';
import ProductCards from '@/components/product/ProductCards';
import TablePagination from '@/components/tables/Pagination';
import Fallback from '@/components/home/categories/Fallback';
import useGetQuery, { Pagination } from '@/hooks/useGetQuery';

type Props = {};

const Products = ({}: Props) => {
  const [params, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 100
  });
  const {
    isLoading,
    isError,
    data: response
  } = useGetQuery<GetResponse<Product>>({
    endpoint: '/api/products/get',
    queryKey: 'products/all',
    params
  });

  if (isLoading || isError || !response) {
    return (
      <div className="flex w-full items-center justify-center border py-8">
        <Fallback
          isError={isError}
          isLoading={isLoading}
          errorMessage="No products found"
          fallBackMessaage="No products found"
        />
      </div>
    );
  }

  const { data } = response;

  return (
    <div className="grid gap-8">
      <div className="flex h-[40px] items-center justify-between">
        <H4>Products</H4>
      </div>

      <ProductCards products={data} />
      <div className="flex justify-center">
        <TablePagination
          currentPage={params.page}
          pageSize={params.limit}
          total={params.total ?? 0}
          onPageChange={(page) => setPagination({ ...params, page })}
        />
      </div>
    </div>
  );
};

export default Products;
