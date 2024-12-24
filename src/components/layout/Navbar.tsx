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
    <div className={`flex h-[70px] items-center border-b px-1 py-3 shadow-sm`}>
      <nav className="flex h-[70px] basis-[50%] items-center">
        <NavLinks options={options} />
        <div className="lg:ml-auto">
          <Link to={'/'}>
            <img src={'/logo.svg'} className="w-12 md:mx-2" loading="eager" />
          </Link>
        </div>
      </nav>

      <div className="flex basis-[50%] justify-end">
        <NavExtras />
      </div>
    </div>
  );
};

export default Navbar;
