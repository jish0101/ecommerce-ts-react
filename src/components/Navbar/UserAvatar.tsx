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
import { LayoutDashboard, Settings, UserPen } from 'lucide-react';
import useUserState from '@/store/user/useUserState';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { logout } from '@/api/auth';
import { useToast } from '@/hooks/use-toast';
import useLoader from '@/store/loader/useLoader';
import useSheetState from '@/store/navbar/useSheetState';

type Props = {};

const UserAvatar = ({}: Props) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { resetUser } = useUserState();
  const { isLoading, toggle } = useLoader();
  const { isOpen, toggleSheet } = useSheetState();
  const user = useUserState((state) => state.user);

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

  const links = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard size={18} />
    },
    {
      title: "Profile",
      href: "/settings/user/profile",
      icon: <UserPen size={18} />
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings size={18} />
    },
  ]

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger>
          <DropdownMenuTrigger asChild>
            <Avatar
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'w-10 h-10 rounded-full'
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
          <p>User Options</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end">
        {
          links.map((link) => (
            <div key={link.href}>
              <Link className="w-full block" to={link.href}>
              <DropdownMenuItem className="cursor-pointer py-0">
                <DropdownMenuLabel className="text-base font-normal">
                  {link.title}
                </DropdownMenuLabel>
                <DropdownMenuShortcut>
                  {link.icon}
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
            </div>
          ))
        }
        <DropdownMenuItem className="p-0 cursor-pointer">
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
