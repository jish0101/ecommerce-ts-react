type Props = {
  images: string[];
};

const ProductImages = ({ images }: Props) => {
  return (
    <div className="flex h-full w-full">
      <img className="max-h-[550px] w-full" src={images.at(0)} alt="product" />
    </div>
  );
};

export default ProductImages;
