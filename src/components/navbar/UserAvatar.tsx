import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { asyncWrapper, cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { Button, buttonVariants } from '../ui/button';
import useUserState from '@/store/user/useUserState';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { logout } from '@/api/auth';
import { useToast } from '@/hooks/use-toast';
import useLoader from '@/store/loader/useLoader';
import useSheetState from '@/store/navbar/useSheetState';
import { Heart, Settings, UserPen } from 'lucide-react';

export const UserAvatarOptions = [
  {
    title: 'Wishlist',
    href: '/settings/user/wishlist',
    icon: <Heart size={18} />
  },
  {
    title: 'Profile',
    href: '/settings/user/profile',
    icon: <UserPen size={18} />
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: <Settings size={18} />
  }
];

type Option = {
  title: string;
  href: string;
  icon: JSX.Element;
};

type Props = {
  options: Option[];
};

const UserAvatar = ({ options }: Props) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isLoading, toggle } = useLoader();
  const { isOpen, toggleSheet } = useSheetState();

  const user = useUserState((state) => state.user);
  const resetUser = useUserState((state) => state.resetUser);

  const handleLogout = async () => {
    try {
      if (isOpen) {
        toggleSheet();
      }

      toggle(true);
      const { response, error } = await asyncWrapper(logout);

      if (error !== null) {
        toggle(false);
        return toast({
          title: 'Failed',
          description: error.message
        });
      }

      const {
        data: { status, message }
      } = response!;

      if (status === 200) {
        toggle(false);
        toast({
          title: 'Success',
          description: message
        });
        resetUser();
        navigate('/auth/login');
      } else {
        toggle(false);
        toast({
          title: 'Failed',
          description: message
        });
      }
    } catch (error: any) {
      toggle(false);
      toast({
        title: 'Failed',
        description: error.message
      });
    }
  };

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger>
          <DropdownMenuTrigger asChild>
            <Avatar
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'h-10 w-10 rounded-full'
              )}
            >
              <AvatarFallback>
                {user ? user.fullName.at(0)?.toUpperCase() : null}
              </AvatarFallback>
              <AvatarImage src={user ? user.profileImage : ''} />
            </Avatar>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>More Options</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end">
        {options.map((link) => (
          <div key={link.href}>
            <Link className="block w-full" to={link.href}>
              <DropdownMenuItem className="cursor-pointer py-0">
                <DropdownMenuLabel className="text-base font-normal">
                  {link.title}
                </DropdownMenuLabel>
                <DropdownMenuShortcut>{link.icon}</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
          </div>
        ))}
        <DropdownMenuItem className="cursor-pointer p-0">
          <Button
            disabled={isLoading}
            onClick={handleLogout}
            className="w-full"
            variant={'destructive'}
          >
            <DropdownMenuLabel className="text-base font-normal">
              Logout
            </DropdownMenuLabel>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
