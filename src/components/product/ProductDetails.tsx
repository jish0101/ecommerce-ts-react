import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import P from '../typography/P';
import H1 from '../typography/H1';
import { Product as ProductT } from '@/types/product';
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import CartButtons from '../cart/CartButtons';
import { useMutation, useQueryClient } from 'react-query';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import { updateCart } from '@/api/cart';
import { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast';

type CartItem = {
  product: ProductT;
  quantity: number;
};

type Props = {
  product: ProductT;
};

const ProductDetails = ({ product }: Props) => {
  const navigate = useNavigate();
  const axios = useAxiosPrivate();
  const client = useQueryClient();
  const [quantity, setQuantity] = useState(1);

  const { mutateAsync: updateCartAsync, isLoading } = useMutation({
    mutationKey: 'cart',
    mutationFn: async ({ product, quantity }: CartItem) =>
      await updateCart({ items: [{ productId: product._id, quantity }] }, axios)
  });

  const handleUpdateCart = async (newValue: number) => {
    if (isLoading) return;
    if (product.stock < newValue) return;

    const result = await updateCartAsync({
      product: product,
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
      navigate('/settings/user/cart');
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

  function quantityChangeHandler(value: number) {
    setQuantity((q) => {
      if (value === 0 || value === product.stock) return q;
      return value;
    });
  }

  return (
    <div className="w-full space-y-5 py-10 md:min-h-[70vh] md:p-16">
      <H1 className="text-4xl capitalize">{product.name}</H1>
      <P className="text-base md:text-3xl">
        Rs. {product.price.toFixed(2).toLocaleString()}
      </P>

      <Accordion type="single" collapsible>
        <AccordionItem value="Details">
          <AccordionTrigger>
            <P className="text-base">Description</P>
          </AccordionTrigger>
          <AccordionContent>
            <P>{product.desc}</P>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Free Shipping & Exchange">
          <AccordionTrigger>
            <P className="text-base">Free Shipping & Exchange</P>
          </AccordionTrigger>
          <AccordionContent>
            <P>
              Enjoy free shipping on all orders at Falcon Clothing. If you're
              not completely satisfied, take advantage of our hassle-free
              exchange policy. Shop with confidence and convenience today!
            </P>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Secure Payment">
          <AccordionTrigger>
            <P className="text-base">Secure Payment</P>
          </AccordionTrigger>
          <AccordionContent>
            <P>
              Your security is our priority. At Falcon Clothing, we use advanced
              encryption and comply with top industry standards. Choose from
              trusted payment options like credit cards and PayPal, and shop
              with confidence every time.
            </P>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex flex-col gap-10">
        <CartButtons
          quantity={quantity}
          quantityChangeHandler={quantityChangeHandler}
          isLoading={false}
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <Button
            onClick={() => handleUpdateCart(quantity)}
            className="border border-foreground/50"
            variant={'ghost'}
            size={'lg'}
          >
            <ShoppingCart /> Add to cart
          </Button>
          <Button size={'lg'}>Buy now</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
