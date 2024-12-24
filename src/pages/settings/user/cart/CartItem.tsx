import { Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import P from '@/components/typography/P';
import { Button } from '@/components/ui/button';
import CartButtons from '@/components/cart/CartButtons';
import { Product } from '@/types/product';

type Props = {
  item: {
    quantity: number;
    product: Product;
  }
};

const CartItem = ({item}: Props) => {
  return (
    <>
      <div className="flex basis-[70%] gap-8">
        <img
          className="w-[100px]"
          src={item.product.imageLinks[0]}
        />
        <div className="flex flex-col justify-center gap-3">
          <Link to={`/product/id`}>
            <P className="text-base font-medium md:text-xl lg:text-lg">
              {item.product.name}
            </P>
          </Link>
          <Button
            className="rounded-full"
            variant={'destructive'}
            size={'icon'}
          >
            <Trash />
          </Button>
        </div>
      </div>
      <div className="basis-[15%] flex items-center">
        <CartButtons />
      </div>
      <div className="basis-[15%] flex items-center">
        <P className='text-base sm:text-lg md:text-2xl'>Rs. 499.00</P>
      </div>
    </>
  );
};

export default CartItem;
