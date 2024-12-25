import P from '../typography/P';
import { AxiosError } from 'axios';
import Loader from '../ButtonLoader';
import { Button } from '../ui/button';
import { updateCart } from '@/api/cart';
import { toast } from '@/hooks/use-toast';
import { Product } from '@/types/product';
import { useMutation, useQueryClient } from 'react-query';
import { numberFormatter } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { Card, CardContent, CardFooter } from '../ui/card';

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();
  const client = useQueryClient();
  const axios = useAxiosPrivate();

  const { mutateAsync: updateCartAsync, isLoading } = useMutation({
    mutationKey: 'cart',
    mutationFn: (product: Product) =>
      updateCart({ items: [{ productId: product._id, quantity: 1 }] }, axios)
  });

  const handleAddToCart = async () => {
    if (isLoading) return;
    const result = await updateCartAsync(product);

    if (result instanceof AxiosError) {
      return toast({
        title: 'Info',
        description: result.response?.data?.message
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
      toast({
        title: 'Success',
        description: message
      });
      client.invalidateQueries(['cart']);
      return navigate('/settings/user/cart');
    } else {
      return toast({
        title: 'Info',
        description: message
      });
    }
  };

  const handleNavigate = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <Card className="overflow-hidden rounded-md border-none shadow-none">
      <CardContent
        onClick={handleNavigate}
        className="h-[275px] min-w-[100%] cursor-pointer p-0 md:p-0"
      >
        <img
          loading="lazy"
          alt={product.name}
          src={product.imageLinks.at(0)}
          className="max-h-[275px] min-w-[100%] rounded-2xl object-cover"
        />
      </CardContent>
      <CardFooter className="flex-col items-start p-0 pt-0">
        <div className="grid gap-2 py-3">
          <P className="font-medium capitalize md:text-lg">{product.name}</P>
          <P className="md:text-lg [&:not(:first-child)]:mt-0">
            Rs. {numberFormatter(product.price)}
          </P>
        </div>
        <Button
          disabled={isLoading}
          onClick={handleAddToCart}
          className="w-full"
        >
          {isLoading ? <Loader /> : 'Add to cart'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
