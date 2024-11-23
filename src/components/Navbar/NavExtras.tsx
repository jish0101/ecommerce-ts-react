import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import UserAvatar from '../Navbar/UserAvatar';
import { buttonVariants } from '../ui/button';
import ThemeToggle from '../Navbar/ThemeToggle';
import { Heart, ShoppingCart } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

type Props = {};

const NavExtras = ({}: Props) => {
  return (
    <div className="flex gap-1 items-center">
      <div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'rounded-full w-10 h-10'
              )}
              to={'/cart'}
            >
              <ShoppingCart />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Cart</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'rounded-full w-10 h-10'
              )}
              to={'/wishlist'}
            >
              <Heart />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Wishlist</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div>
        <ThemeToggle />
      </div>
      <div>
        <UserAvatar />
      </div>
    </div>
  );
};

export default NavExtras;
