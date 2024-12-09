import { Home, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import useUserState from '@/store/user/useUserState';
import ThemeToggle from '@/components/navbar/ThemeToggle';
import UserAvatar, { UserAvatarOptions } from '@/components/navbar/UserAvatar';
import CommandPallete from '@/components/navbar/CommandPallete';
import { DASHBOARD_OPTIONS } from './DashboardLayout';

type Props = {};

const DashboardNav = ({}: Props) => {
  const { toggleSidebar } = useSidebar();
  const user = useUserState((state) => state.user);
  const options = new Array(...UserAvatarOptions);

  if (user && user.role === 'ADMIN') {
    options.unshift({
      title: 'Home',
      href: '/',
      icon: <Home size={18} />
    });
  }

  return (
    <nav
      className={`flex gap-2 h-[70px] items-center justify-between border-b p-3 shadow-sm`}
    >
      <Button
        variant={'ghost'}
        onClick={toggleSidebar}
        size={'icon'}
        className="flex rounded-full w-[45px] h-[45px] aspect-[1] md:[&_svg]:size-5"
      >
        <Menu />
      </Button>

      <CommandPallete options={DASHBOARD_OPTIONS} />
      <div className="flex items-center justify-center gap-3">
        <ThemeToggle />
        <UserAvatar options={options} />
      </div>
    </nav>
  );
};

export default DashboardNav;
