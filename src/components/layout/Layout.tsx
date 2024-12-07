import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Navbar, { NavOption } from './Navbar';
import { SidebarProvider } from '../ui/sidebar';
import SidebarComponent from '../navbar/Sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import Loader from '../Loader';
import useLoader from '@/store/loader/useLoader';
import NavExtras from '../navbar/NavExtras';

export const NAV_LINKS: NavOption[] = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Category',
    href: '/product-categories'
  },
  {
    label: 'Categories',
    href: '',
    listOptions: [
      {
        label: 'Categories',
        href: '/product-categories1',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
      },
      {
        label: 'Categories',
        href: '/product-categories2',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
      },
      {
        label: 'Categories',
        href: '/product-categories3',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
      },
      {
        label: 'Categories',
        href: '/product-categories4',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
      }
    ]
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
        <div className="flex-1 flex flex-col">
          {isLoading ? <Loader /> : null}
          <Navbar />
          <ScrollArea type="scroll" className={`h-[calc(100vh-70px)]`}>
            <Outlet />
            <Footer />
          </ScrollArea>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
