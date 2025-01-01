import P from '../typography/P';
import { cn } from '@/lib/utils';
import { Product } from '@/types/product';
import { FC, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  product: Product;
}

const ProductList: FC<Props> = ({ product, className, ...props }) => {
  return (
    <div
      {...props}
      className={cn('flex cursor-pointer items-center gap-4', className)}
    >
      <img
        src={product.imageLinks[0]}
        className="h-[48px] w-[48px] rounded-full"
        alt={product.name}
      />

      <P className="capitalize">{product.name}</P>
    </div>
  );
};

export default ProductList;
