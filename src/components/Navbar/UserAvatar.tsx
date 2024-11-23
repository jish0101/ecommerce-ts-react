import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { Settings, UserPen } from 'lucide-react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

type Props = {};

const UserAvatar = ({}: Props) => {
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger>
          <DropdownMenuTrigger className="w-10 h-10 rounded-full">
            <Button
              className="w-10 h-10 rounded-full"
              variant="ghost"
              size="icon"
            >
              <Avatar className="text-foreground border-none">
                <AvatarFallback>J</AvatarFallback>
                <AvatarImage src={''} />
              </Avatar>
            </Button>
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
