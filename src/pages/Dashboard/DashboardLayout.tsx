import Loader from '@/components/Loader';
import { Outlet } from 'react-router-dom';
import DashboardNav from './DashboardNav';
import useLoader from '@/store/loader/useLoader';
import { NavOption } from '@/components/layout/Navbar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarProvider } from '@/components/ui/sidebar';
import SidebarComponent from '@/components/navbar/Sidebar';
import ChevronSidebarButton from '@/components/navbar/ChevronSidebarButton';
import {
  Car,
  HandCoins,
  LayoutDashboard,
  ShoppingBasket,
  Users
} from 'lucide-react';

type Props = {};

export const DASHBOARD_OPTIONS: NavOption[] = [
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
        options={DASHBOARD_OPTIONS}
        FooterContent={<ChevronSidebarButton className="ml-auto" isSheet />}
      />
      <div className="flex flex-1 flex-col">
        <DashboardNav />
        {isLoading ? <Loader /> : null}
        <ScrollArea type="scroll" className={`h-[calc(100vh-70px)] p-2 md:p-12`}>
          <Outlet />
        </ScrollArea>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
