import CartItem from './CartItem';
import P from '@/components/typography/P';
import Li from '@/components/typography/Li';
import Ul from '@/components/typography/Ul';
import { Cart as CartT } from '@/types/cart';

type Props = {
  cartData: CartT;
};

const CartItems = ({ cartData }: Props) => {
  const data = formatCartData(cartData);

  function formatCartData(data: CartT) {
    return data.items.map((item) => ({
      quantity: item.quantity,
      product: item.productId
    }));
  }

  return (
    <Ul>
      <div className="flex border-b">
        <P className="basis-[70%] text-base font-medium md:text-lg">Product</P>
        <P className="basis-[15%] text-base font-medium md:text-lg">Quantity</P>
        <P className="basis-[15%] text-base font-medium md:text-lg">Total</P>
      </div>
      {data
        ? data.map((item) => (
            <Li key={item.product._id} className="flex justify-between">
              <CartItem item={item} />
            </Li>
          ))
        : null}
    </Ul>
  );
};

export default CartItems;
