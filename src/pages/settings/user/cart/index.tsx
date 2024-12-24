import CartItems from './CartItems';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import { Cart as CartT } from '@/types/cart';
import useGetQuery from '@/hooks/useGetQuery';
import Loader from '@/components/ButtonLoader';

type Props = {};

const Cart = ({}: Props) => {
  const {data, isLoading, error} = useGetQuery<CartT>({
    endpoint: '/api/cart/get',
    queryKey: "cart"
  });

  if (isLoading) {
    return (
      <div className='flex items-center justify-center'>
        <Loader />
      </div>
    )
  }

  if (!Array.isArray(data) || data.length < 1) {
    return (
      <div className='flex items-center justify-center'>
        <H3>Your cart is empty</H3>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex items-center justify-center'>
        <H3>{error?.message ?? "Some error occured"}</H3>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <H2 className="border-none">Your Cart</H2>

      <CartItems cartData={data} />
    </div>
  );
};

export default Cart;
