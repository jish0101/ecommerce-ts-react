import Loader from '@/components/Loader';
import { Outlet } from 'react-router-dom';
import DashboardNav from './DashboardNav';
import useLoader from '@/store/loader/useLoader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarProvider } from '@/components/ui/sidebar';
import SidebarComponent from '@/components/Navbar/Sidebar';
import ChevronSidebarButton from '@/components/Navbar/ChevronSidebarButton';
import { NavOption } from '@/components/layout/Navbar';
import {
  Car,
  HandCoins,
  LayoutDashboard,
  ShoppingBasket,
  Users
} from 'lucide-react';

type Props = {};

const options: NavOption[] = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: <LayoutDashboard />
  },
  {
    label: 'Users',
    href: '/admin/users',
    icon: <Users />
  },
  {
    label: 'Products',
    href: '/admin/products',
    icon: <ShoppingBasket />
  },
  {
    label: 'Orders',
    href: '/admin/orders',
    icon: <Car />
  },
  {
    label: 'Payments',
    href: '/admin/payments',
    icon: <HandCoins />
  }
];

const DashboardLayout = ({}: Props) => {
  const { isLoading } = useLoader();

  return (
    <SidebarProvider defaultOpen={true}>
      <SidebarComponent
        options={options}
        FooterContent={<ChevronSidebarButton className="ml-auto" isSheet />}
      />
      <div className="flex-1 flex flex-col">
        <DashboardNav />
        {isLoading ? <Loader /> : null}
        <ScrollArea type="scroll" className={`h-[calc(100vh-70px)]`}>
          <Outlet />
        </ScrollArea>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
