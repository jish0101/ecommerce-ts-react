import { Product } from '@/types/product';
import ProductCard from './ProductCard';

type Props = {
  products: Product[];
};

const ProductCards = ({ products }: Props) => {
  return (
    <>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </>
  );
};

export default ProductCards;
