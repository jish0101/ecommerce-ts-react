import { Product } from '@/types/product';
import ProductCard from './ProductCard';

type Props = {
  products: Product[];
};

// Make grid responsive by minmax grid
const ProductCards = ({ products }: Props) => {
  return (
    <div
      className="grid gap-4 md:gap-10"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductCards;
