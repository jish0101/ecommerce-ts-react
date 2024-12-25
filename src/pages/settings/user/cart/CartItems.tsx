import CartItem from './CartItem';
import P from '@/components/typography/P';
import Li from '@/components/typography/Li';
import Ul from '@/components/typography/Ul';
import { Cart as CartT } from '@/types/cart';
import { Button } from '@/components/ui/button';
import { numberFormatter } from '@/lib/utils';
import { Equal } from 'lucide-react';

type Props = {
  cartData: CartT;
};

const CartItems = ({ cartData }: Props) => {
  const data = formatCartData(cartData);
  const total = data.reduce(
    (acc, item) => (acc += item.product.price * item.quantity),
    0
  );

  function formatCartData(data: CartT) {
    return data.items.map((item) => ({
      quantity: item.quantity,
      product: item.productId
    }));
  }

  return (
    <div className="xl:basis-[75%]">
      <Ul>
        <div className="flex justify-between border-b">
          <div className="w-full">
            <P className="text-base font-medium md:text-lg xl:col-span-3">
              Product
            </P>
          </div>
          <div className="flex w-full justify-center">
            <P className="text-base font-medium md:text-lg">Quantity</P>
          </div>
          <div className="flex w-full justify-center">
            <P className="text-base font-medium md:text-lg">Total</P>
          </div>
        </div>
        {data
          ? data.map((item) => (
              <Li key={item.product._id} className="flex w-full">
                <CartItem item={item} />
              </Li>
            ))
          : null}
      </Ul>
      <div className="flex">
        <div className="w-full ml-6">
          <P className="text-base font-medium md:text-lg">Total</P>
        </div>
        <div className="w-full flex items-start justify-center">
          <Equal />
        </div>
        <div className="w-full flex flex-col items-center gap-4">
          <P className="text-base sm:text-lg md:text-2xl">
            Rs. {numberFormatter(total)}
          </P>
          <Button className="w-fit rounded-none" size={'lg'}>
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
