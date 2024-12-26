import { Button } from '../ui/button';
import { Minus, Plus } from 'lucide-react';
import MutedPara from '../typography/MutedPara';

type Props = {
  isLoading: boolean;
  quantity: number;
  quantityChangeHandler: (value: number) => void;
};

const CartButtons = ({ isLoading, quantity, quantityChangeHandler }: Props) => {
  return (
    <div className="flex flex-col items-center sm:flex-row">
      <Button
        disabled={isLoading}
        className="h-7 w-7 rounded-full xl:h-9 xl:w-9 [&_svg]:size-4 xl:[&_svg]:size-5"
        onClick={() => quantityChangeHandler(quantity - 1)}
      >
        <Minus size={24} />
      </Button>
      <div className="flex min-w-12 items-center justify-center px-2">
        <MutedPara className="text-xl">{quantity}</MutedPara>
      </div>
      <Button
        disabled={isLoading}
        className="h-7 w-7 rounded-full xl:h-9 xl:w-9 [&_svg]:size-4 xl:[&_svg]:size-5"
        onClick={() => quantityChangeHandler(quantity + 1)}
      >
        <Plus size={24} />
      </Button>
    </div>
  );
};

export default CartButtons;
