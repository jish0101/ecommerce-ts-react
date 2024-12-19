import SubCategories from '@/components/home/categories/SubCategories';
import { Outlet } from 'react-router-dom';

type Props = {};

const Layout = ({}: Props) => {
  return (
    <div>
      <SubCategories />
      <div className="flex">
        <div className="basis-[400px]">
          <h1>Product Layout</h1>
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
