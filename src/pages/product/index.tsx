import H1 from '@/components/typography/H1';
import useGetQuery from '@/hooks/useGetQuery';
import { GetResponse } from '@/types/api';
import { Product as ProductT } from '@/types/product';
import { useParams } from 'react-router-dom';

const Product = () => {
  const { id } = useParams();
  const {
    isLoading,
    isError,
    data: response
  } = useGetQuery<GetResponse<ProductT>>({
    endpoint: '/api/products/get',
    queryKey: id ? `products/${id}` : 'products/all',
    params: {page: 1, limit: 1, id: id ?? ""}
  });

  return (
    <div className='max-w-[1380px] mx-auto bg-accent'>
      <div className='flex min-h-[70vh] items-center gap-2'>
        <div className='md:basis-[30%] border bg-white'>
          <img className='w-full h-full border' src='https://via.placeholder.com/300' alt='product' />
        </div>
        <div>
          <H1 className='text-4xl'>Product</H1>
          <p className='text-lg'>Description</p>
          <p className='text-lg'>Price</p>
          <p className='text-lg'>Category</p>
          <p className='text-lg'>Stock</p>
          <button className='bg-primary text-white p-2'>Add to cart</button>
        </div>
      </div>
    </div>
  )
};

export default Product;
