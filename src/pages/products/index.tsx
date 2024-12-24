import Filters from './Filters';
import { useState } from 'react';
import { GetResponse } from '@/types/api';
import { Product } from '@/types/product';
import ProductsHeader from './ProductsHeader';
import { useSearchParams } from 'react-router-dom';
import CardFallback from '@/components/product/CardFallback';
import ProductCards from '@/components/product/ProductCards';
import TablePagination from '@/components/tables/Pagination';
import useGetQuery, { Pagination } from '@/hooks/useGetQuery';

type Props = {};

function generateKey (obj: Record<string, string>, prefix: string = "") {
  return Object.keys(obj).reduce((str, currKey) => {
    return str += `/${obj[currKey]}`
  }, prefix)
}

const Products = ({}: Props) => {
  const [params] = useSearchParams();
  const allParams = Object.fromEntries(params.entries())
  const key = generateKey(allParams, "products");

  const [pagination, setPagination] = useState<Pagination>({
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
    queryKey: key ? key : 'products/all',
    params: {
      ...allParams,
      ...pagination
    }
  });

  if (isLoading || isError || !response) {
    return (
      <Filters>
        <div className="w-full space-y-6">
          <ProductsHeader>
            {Array.from({ length: 10 }).map((_, idx) => (
              <CardFallback
                key={idx}
                isError={isError}
                isLoading={isLoading}
                errorMessage="No products found"
                fallBackMessaage="No products found"
              />
            ))}
          </ProductsHeader>
        </div>
      </Filters>
    );
  }

  const { data } = response;

  return (
    <Filters>
      <div className="w-full space-y-6">
        <ProductsHeader>
          <ProductCards products={data} />
        </ProductsHeader>
        <div className="flex w-full justify-center">
          <TablePagination
            pageSize={pagination.limit}
            currentPage={pagination.page}
            total={pagination.total ?? 0}
            onPageChange={(page) => setPagination({ ...pagination, page })}
          />
        </div>
      </div>
    </Filters>
  );
};

export default Products;
