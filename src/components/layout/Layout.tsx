import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';

const Layout = () => {
  return (
    <>
      <Navbar />
      <ScrollArea className={`h-[calc(100vh-70px)]`}>
        <div>
          <Outlet />
          <Footer />
        </div>
      </ScrollArea>
    </>
  );
};

export default Layout;
