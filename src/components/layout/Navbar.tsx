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
      className={`flex items-center justify-between p-3 shadow-sm h-[70px] border-b`}
    >
      <Link to={'/'}>
        <img src={'/logo.svg'} className="w-12 md:mx-2" loading="eager" />
      </Link>

      <Searchbar className="md:flex hidden" />
      <NavExtras />
    </div>
  );
};

export default Navbar;
