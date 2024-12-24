import { Outlet } from 'react-router-dom';
import SubCategories from '@/components/home/categories/SubCategories';

type Props = {};

const Layout = ({}: Props) => {
  return (
    <div className='space-y-6'>
      <SubCategories />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
