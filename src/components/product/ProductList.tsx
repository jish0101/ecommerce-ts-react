import { Product } from "@/types/product"
import P from "../typography/P"

type Props = {
  product: Product
}

const ProductList = ({product}: Props) => {
  return (
    <div>
      <div className="flex gap-4 items-center">
        <img src={product.imageLinks[0]} className="w-[48px] h-[48px] rounded-full" alt={product.name} />

        <P className="capitalize">{product.name}</P>
      </div>
    </div>
  )
}

export default ProductList