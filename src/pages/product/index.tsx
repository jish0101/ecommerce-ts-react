import { GetResponse } from '@/types/api';
import { useParams } from 'react-router-dom';
import useGetQuery from '@/hooks/useGetQuery';
import { Skeleton } from '@/components/ui/skeleton';
import { Product as ProductT } from '@/types/product';
import ProductHeader from '@/components/product/ProductHeader';
import ProductImages from '@/components/product/ProductImages';
import ProductDetails from '@/components/product/ProductDetails';

const Product = () => {
  const { id } = useParams();

  const { isLoading, data: response } = useGetQuery<GetResponse<ProductT>>({
    endpoint: '/api/products/get',
    queryKey: id ? `products/${id}` : 'products/all',
    params: { page: 1, limit: 1, id: id ?? '' }
  });

  if (isLoading || !response || !response.data || response.data.length < 1) {
    return (
      <ProductHeader>
        <div className="flex min-w-[300px] lg:col-span-2">
          <Skeleton className="min-h-[350px] w-full md:max-h-[500px]" />
        </div>
        <div className="flex min-w-[300px] justify-center lg:col-span-3">
          <div className="w-full space-y-5 md:min-h-[70vh] md:p-10 md:py-10">
            <Skeleton className="h-8 w-full md:h-12" />
            <Skeleton className="h-8 w-full md:h-12" />
            <Skeleton className="h-8 w-full md:h-12" />
            <Skeleton className="h-8 w-full md:h-12" />
            <Skeleton className="h-8 w-full md:h-12" />
            <Skeleton className="h-8 w-full md:h-12" />
            <Skeleton className="h-8 w-full md:h-12" />
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
      <div className="flex justify-center lg:col-span-3">
        <ProductDetails product={data[0]} />
      </div>
    </ProductHeader>
  );
};

export default Product;
