import { useState } from 'react';
import { AxiosError } from 'axios';
import { Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { updateCart } from '@/api/cart';
import Loader from '@/components/Loader';
import { toast } from '@/hooks/use-toast';
import { Product } from '@/types/product';
import P from '@/components/typography/P';
import { numberFormatter } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import CartButtons from '@/components/cart/CartButtons';
import { useMutation, useQueryClient } from 'react-query';

type CartItem = {
  product: Product;
  quantity: number;
};

type Props = {
  item: CartItem;
};

const CartItem = ({ item }: Props) => {
  const axios = useAxiosPrivate();
  const client = useQueryClient();
  const [quantity, setQuantity] = useState(() => item?.quantity);

  const { mutateAsync: updateCartAsync, isLoading } = useMutation({
    mutationKey: 'cart',
    mutationFn: async ({ product, quantity }: CartItem) =>
      await updateCart({ items: [{ productId: product._id, quantity }] }, axios)
  });

  async function quantityChangeHandler(value: number) {
    if (value === item.product.stock + 1) return;
    await handleUpdateCart(value);
    if (value === 0) return;
    setQuantity(value);
  }

  const handleUpdateCart = async (newValue: number) => {
    if (isLoading) return;
    if (item.product.stock < newValue) return;

    const result = await updateCartAsync({
      product: item.product,
      quantity: newValue
    });

    if (result instanceof AxiosError) {
      return toast({
        title: 'Info',
        description: result.response?.data.message
      });
    }

    if (result instanceof Error) {
      return toast({
        title: 'Failed',
        description: result.message
      });
    }

    const { status, message } = result;

    if (status === 200) {
      client.invalidateQueries(['cart']);
      toast({
        title: 'Success',
        description: message
      });
    } else {
      return toast({
        title: 'Info',
        description: message
      });
    }
  };

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <>
      <div className="flex w-full flex-col gap-3 xl:flex-row xl:gap-8">
        <div className="h-[52px] w-[52px] xl:h-[100px] xl:w-[100px]">
          <img
            className="h-[52px] w-[52px] xl:h-[100px] xl:w-[100px]"
            src={item.product.imageLinks[0]}
          />
        </div>
        <div className="flex justify-center gap-3">
          <Link to={`/product/${item.product._id}`}>
            <P className="text-sm font-medium capitalize md:text-xl lg:text-lg xl:w-full">
              {item.product.name}
            </P>
          </Link>
        </div>
      </div>
      <div className="flex w-full items-center justify-center">
        <CartButtons
          quantityChangeHandler={quantityChangeHandler}
          isLoading={isLoading}
          quantity={quantity}
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row">
        <P className="text-base sm:text-lg md:text-2xl">
          Rs. {numberFormatter(item.product.price * item.quantity)}
        </P>

        <Button
          disabled={isLoading}
          variant={'destructive'}
          className="h-7 w-7 rounded-full xl:h-9 xl:w-9 [&_svg]:size-4 xl:[&_svg]:size-5"
          onClick={() => handleUpdateCart(0)}
        >
          <Trash />
        </Button>
      </div>
    </>
  );
};

export default CartItem;
