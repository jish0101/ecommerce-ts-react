import { useEffect } from 'react';
import { GetResponse } from '@/types/api';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import useGetQuery from '@/hooks/useGetQuery';
import { Product as ProductT } from '@/types/product';
import ProductImages from '@/components/product/ProductImages';
import ProductDetails from '@/components/product/ProductDetails';
import ProductHeader from '@/components/product/ProductHeader';
import { Skeleton } from '@/components/ui/skeleton';

const Product = () => {
  const { id } = useParams();
  const client = useQueryClient();
  const { isLoading, data: response } = useGetQuery<GetResponse<ProductT>>({
    endpoint: '/api/products/get',
    queryKey: id ? `products/${id}` : 'products/all',
    params: { page: 1, limit: 1, id: id ?? '' }
  });

  useEffect(() => {
    if (!id) return;

    client.invalidateQueries(`products/${id}`)
  }, [id]);

  if (isLoading || !response || !response.data || response.data.length < 1) {
    return (
      <ProductHeader>
        <div className="flex min-w-[300px] lg:col-span-2">
          <Skeleton className='w-full md:max-h-[500px] min-h-[350px]' />
        </div>
        <div className="flex min-w-[300px] lg:col-span-3 justify-center">
          <div className='md:min-h-[70vh] md:py-10 w-full space-y-5 md:p-10'>
            <Skeleton className='md:h-12 h-8 w-full' />
            <Skeleton className='md:h-12 h-8 w-full' />
            <Skeleton className='md:h-12 h-8 w-full' />
            <Skeleton className='md:h-12 h-8 w-full' />
            <Skeleton className='md:h-12 h-8 w-full' />
            <Skeleton className='md:h-12 h-8 w-full' />
            <Skeleton className='md:h-12 h-8 w-full' />
          </div>
        </div>
      </ProductHeader>
    );
  }

  const { data } = response;

  return (
    <ProductHeader>
      <div className="flex lg:col-span-2">
        <ProductImages images={data[0].imageLinks} />
      </div>
      <div className="flex lg:col-span-3 justify-center">
        <ProductDetails product={data[0]} />
      </div>
    </ProductHeader>
  );
};

export default Product;
