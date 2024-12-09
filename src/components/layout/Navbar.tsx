import { Link } from 'react-router-dom';
import NavExtras from '../navbar/NavExtras';
import Searchbar from '../navbar/Searchbar';

export type ListOption = {
  href: string;
  label: string;
  description: string;
};

export type NavOption = {
  href: string;
  label: string;
  icon?: React.ReactNode;
  listOptions?: ListOption[];
};

type Props = {};

const Navbar = ({}: Props) => {
  return (
    <div
      className={`flex h-[70px] items-center justify-between border-b p-3 shadow-sm`}
    >
      <Link to={'/'}>
        <img src={'/logo.svg'} className="w-12 md:mx-2" loading="eager" />
      </Link>

      <Searchbar className="hidden md:flex" />
      <NavExtras />
    </div>
  );
};

export default Navbar;
