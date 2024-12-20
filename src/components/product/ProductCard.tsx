import P from '../typography/P';
import Loader from '../ButtonLoader';
import { Button } from '../ui/button';
import { addToCart } from '@/api/cart';
import { toast } from '@/hooks/use-toast';
import { Product } from '@/types/product';
import { useMutation } from 'react-query';
import { numberFormatter } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { Card, CardContent, CardFooter } from '../ui/card';
import { AxiosError } from 'axios';

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();
  const axios = useAxiosPrivate();
  const { mutateAsync: addToCartAsync, isLoading } = useMutation({
    mutationKey: 'cart',
    mutationFn: (product: Product) =>
      addToCart({ productId: product._id }, axios)
  });

  const handleAddToCart = async () => {
    if (isLoading) return;
    const result = await addToCartAsync(product);

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
      return toast({
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

  const handleNavigate = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <Card className="overflow-hidden rounded-md border-none shadow-none">
      <CardContent
        onClick={handleNavigate}
        className="cursor-pointer p-0 md:p-0"
      >
        <img
          className="max-h-[275px] min-w-[100%] rounded-md object-cover"
          src={product.imageLinks.at(0)}
          alt={product.name}
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
