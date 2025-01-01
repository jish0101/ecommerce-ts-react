import Footer from './Footer';
import Loader from '../Loader';
import { Outlet } from 'react-router-dom';
import NavExtras from '../navbar/NavExtras';
import Navbar, { NavOption } from './Navbar';
import { SidebarProvider } from '../ui/sidebar';
import useLoader from '@/store/loader/useLoader';
import { ScrollArea } from '@/components/ui/scroll-area';
import SidebarComponent from '@/components/navbar/Sidebar';

export const NAV_LINKS: NavOption[] = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Products',
    href: '/products'
  },
  {
    label: 'Track order',
    href: '/track-order'
  },
  {
    label: 'Return order',
    href: '/return-order'
  }
];

const Layout = () => {
  const { isLoading } = useLoader();

  return (
    <div className="flex h-screen">
      <SidebarProvider defaultOpen={false}>
        <SidebarComponent
          options={NAV_LINKS}
          FooterContent={<NavExtras isSheet />}
        />
        <div className="max-h-screen flex-1">
          {isLoading ? <Loader /> : null}
          <Navbar options={NAV_LINKS} />
          <ScrollArea type="scroll" className={`h-[calc(100vh-70px)]`}>
            <div
              className={`mx-auto min-h-[calc(100vh-70px)] max-w-[1180px] p-2`}
            >
              <Outlet />
            </div>
            <Footer />
          </ScrollArea>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
