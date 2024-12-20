import { useParams } from 'react-router-dom';

const Product = () => {
  const { id } = useParams();
  console.log('🚀 ~ Product ~ id:', id);

  return <div className="h-[100vh]">Product Page</div>;
};

export default Product;
