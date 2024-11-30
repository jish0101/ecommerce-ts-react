import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
// import { useSidebar } from '../ui/sidebar';
import UserAvatar from '../Navbar/UserAvatar';
import ThemeToggle from '../Navbar/ThemeToggle';
import { Button, buttonVariants } from '../ui/button';
import { ChevronsLeft, Heart, Menu, ShoppingCart } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { useSidebar } from '../ui/sidebar';

type Props = {
  isSheet?: boolean;
};

const NavExtras = ({ isSheet }: Props) => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className={isSheet ? 'h-[70px] flex items-center justify-center' : ''}>
      <div
        className={`${isSheet ? 'flex flex-wrap' : 'sm:flex hidden'} gap-1 justify-center items-center`}
      >
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

        <ThemeToggle />
        <UserAvatar />
      </div>
      <Button
        className="flex sm:hidden"
        onClick={toggleSidebar}
        size={'icon'}
        variant={'ghost'}
      >
        {isSheet ? <ChevronsLeft /> : <Menu />}
      </Button>
    </div>
  );
};

export default NavExtras;
