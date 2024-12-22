import H4 from '@/components/typography/H4';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {}

const ProductsHeader = ({ children, ...rest }: Props) => {
  return (
    <>
      <div className="flex h-[40px] items-center justify-between">
        <H4>Products</H4>
      </div>

      <div
        className="grid gap-4 md:gap-10"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}
        {...rest}
      >
        {children}
      </div>
    </>
  );
};

export default ProductsHeader;
