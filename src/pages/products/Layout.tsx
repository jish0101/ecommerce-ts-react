import { Outlet } from 'react-router-dom';
import SubCategories from '@/components/home/categories/SubCategories';

type Props = {};

const Layout = ({}: Props) => {
  return (
    <>
      <SubCategories />
      <div className="flex gap-4 p-2 md:p-6">
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
