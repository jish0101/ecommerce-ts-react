import { Home, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import useUserState from '@/store/user/useUserState';
import ThemeToggle from '@/components/navbar/ThemeToggle';
import UserAvatar, { UserAvatarOptions } from '@/components/navbar/UserAvatar';

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
      className={`flex items-center justify-between p-3 shadow-sm border-b h-[70px]`}
    >
      <Button
        className="flex rounded-full w-[50px] h-[50px] [&_svg]:size-6"
        onClick={toggleSidebar}
        variant={'ghost'}
      >
        <Menu size={80} />
      </Button>

      <div className="flex items-center justify-center gap-3">
        <ThemeToggle />
        <UserAvatar options={options} />
      </div>
    </nav>
  );
};

export default DashboardNav;
