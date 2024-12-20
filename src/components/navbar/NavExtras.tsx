import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { buttonVariants } from '../ui/button';
import ThemeToggle from './ThemeToggle';
import useUserState from '@/store/user/useUserState';
import ChevronSidebarButton from './ChevronSidebarButton';
import { LayoutDashboard, ShoppingCart } from 'lucide-react';
import UserAvatar, { UserAvatarOptions } from './UserAvatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import Searchbar from './Searchbar';

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
    <div className={isSheet ? 'flex h-[70px] items-center justify-center' : ''}>
      <div
        className={`${isSheet ? 'flex flex-wrap' : 'hidden lg:flex'} items-center justify-center gap-1`}
      >
        <Searchbar />
        <ThemeToggle />
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'h-10 w-10 rounded-full'
              )}
              to={'/settings/user/cart'}
            >
              <ShoppingCart />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Cart</p>
          </TooltipContent>
        </Tooltip>
        {!user ? (
          <Link
            className={buttonVariants({ variant: 'ghost' })}
            to={'/auth/login'}
          >
            Login
          </Link>
        ) : (
          <UserAvatar options={options} />
        )}
      </div>
      <ChevronSidebarButton isSheet />
    </div>
  );
};

export default NavExtras;
