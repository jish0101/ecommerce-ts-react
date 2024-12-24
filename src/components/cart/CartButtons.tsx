import { Minus, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import MutedPara from '../typography/MutedPara';
import { useState } from 'react';

type Props = {};

const CartButtons = ({}: Props) => {
  const [quantity, setQuantity] = useState(1);

  const handleCartUpdate = (newValue: number) => {
    setQuantity(newValue);
  };

  return (
    <div className="flex items-center">
      <Button className='rounded-full' size={"icon"} onClick={() => handleCartUpdate(quantity - 1)}>
        <Minus size={24} />
      </Button>
      <div className="min-w-12 px-2 flex items-center justify-center">
        <MutedPara className="text-xl">{quantity}</MutedPara>
      </div>
      <Button className='rounded-full' size={"icon"} onClick={() => handleCartUpdate(quantity + 1)}>
        <Plus size={24} />
      </Button>
    </div>
  );
};

export default CartButtons;
