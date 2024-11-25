import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { buttonVariants } from '../ui/button';
import { Link } from 'react-router-dom';
import { Settings, UserPen } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type Props = {};

const UserAvatar = ({}: Props) => {
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
              <AvatarFallback>J</AvatarFallback>
              <AvatarImage src={''} />
            </Avatar>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>User Options</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end">
        <Link className="w-full block" to={'/settings/user/profile'}>
          <DropdownMenuItem className="cursor-pointer">
            <DropdownMenuLabel className="text-base font-normal">
              Profile
            </DropdownMenuLabel>
            <DropdownMenuShortcut>
              <UserPen size={18} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link className="w-full block" to={'/settings'}>
          <DropdownMenuItem className="cursor-pointer">
            <DropdownMenuLabel className="text-base font-normal">
              Settings
            </DropdownMenuLabel>
            <DropdownMenuShortcut>
              <Settings size={18} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
