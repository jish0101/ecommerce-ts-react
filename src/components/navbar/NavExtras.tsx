import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { buttonVariants } from '../ui/button';
import ThemeToggle from './ThemeToggle';
import useUserState from '@/store/user/useUserState';
import ChevronSidebarButton from './ChevronSidebarButton';
import { Heart, LayoutDashboard, ShoppingCart } from 'lucide-react';
import UserAvatar, { UserAvatarOptions } from './UserAvatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

type Props = {
  isSheet?: boolean;
};

const NavExtras = ({ isSheet }: Props) => {
  const user = useUserState((state) => state.user);
  const options = new Array(...UserAvatarOptions);

  if (user && user.role === 'ADMIN') {
    options.unshift({
      title: 'Dashboard',
      href: '/admin/dashboard',
      icon: <LayoutDashboard size={18} />
    });
  }

  return (
    <div className={isSheet ? 'h-[70px] flex items-center justify-center' : ''}>
      <div
        className={`${isSheet ? 'flex flex-wrap' : 'md:flex hidden'} gap-1 justify-center items-center`}
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
              to={'/wishlist'}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'rounded-full w-10 h-10'
              )}
            >
              <Heart />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Wishlist</p>
          </TooltipContent>
        </Tooltip>

        <ThemeToggle />
        <UserAvatar options={options} />
      </div>
      <ChevronSidebarButton isSheet />
    </div>
  );
};

export default NavExtras;
