import { Link } from 'react-router-dom';
import NavLinks from '../navbar/NavLinks';
import NavExtras from '../navbar/NavExtras';

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

type Props = {
  options: NavOption[];
};

const Navbar = ({ options }: Props) => {
  return (
    <div className="flex h-[70px] items-center border-b px-1 py-3 shadow-sm">
      <div className={`mx-auto flex w-full max-w-[1280px] items-center`}>
        <nav className="flex h-[70px] w-full items-center justify-between">
          <Link to={'/'}>
            <img src={'/logo.svg'} className="w-12 md:mx-2" loading="eager" />
          </Link>
          <NavLinks options={options} />

          <NavExtras />
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
