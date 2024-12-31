import CartItems from './CartItems';
import { GetResponse } from '@/types/api';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import { Cart as CartT } from '@/types/cart';
import useGetQuery from '@/hooks/useGetQuery';
import Loader from '@/components/ButtonLoader';
import CartInvoice from './CartInvoice';

type Props = {};

const Cart = ({}: Props) => {
  const { data, isLoading, error } = useGetQuery<GetResponse<CartT>>({
    queryKey: 'cart',
    endpoint: '/api/cart/get'
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-170px)] items-center justify-center">
        <Loader className="h-10 w-10 border-foreground border-t-transparent" />
      </div>
    );
  }

  if (
    !data ||
    !Array.isArray(data.data) ||
    data.data.length < 1 ||
    data.data[0].items.length < 1
  ) {
    return (
      <div className="flex items-center justify-center">
        <H3>Your cart is empty</H3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center">
        <H3>{error?.message ?? 'Some error occured'}</H3>
      </div>
    );
  }

  return (
    <div>
      <H2 className="border-none">Your Cart</H2>

      <div className="flex flex-col xl:flex-row">
        <CartItems cartData={data.data[0]} />
        <CartInvoice />
      </div>
    </div>
  );
};

export default Cart;
