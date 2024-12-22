type Props = {
    images: string[]
}

const ProductImages = ({images}: Props) => {
  return (
    <div className="flex w-full h-full">
      <img className='w-full max-h-[550px]' src={images.at(0)} alt='product' />
    </div>
  )
}

export default ProductImages