import SubCategories from '@/components/home/categories/SubCategories';
import Searchbar from '@/components/navbar/Searchbar';
import H4 from '@/components/typography/H4';
import { Outlet } from 'react-router-dom';

type Props = {};

const Layout = ({}: Props) => {
  return (
    <div>
      <SubCategories />
      <div className="flex gap-4 p-2 md:p-6">
        <div className="basis-[400px]">
          <div className="flex h-[40px] items-center justify-between">
            <H4>Filters</H4>
            <Searchbar />
          </div>
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
