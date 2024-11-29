import logoSrc from '/logo.svg';
import { Link } from 'react-router-dom';
import NavExtras from '../Navbar/NavExtras';
import NavOptions from '../Navbar/NavOptions';

export type ListOption = {
  href: string;
  label: string;
  description: string;
};

export type NavOption = {
  href: string;
  label: string;
  listOptions?: ListOption[];
};

type Props = {
  navOptions: NavOption[];
};

const Navbar = ({ navOptions }: Props) => {
  return (
    <div className={`flex items-center justify-between p-3 shadow-sm h-[70px]`}>
      <Link to={'/'}>
        <img src={logoSrc} className="w-12 md:mx-2" loading="eager" />
      </Link>

      <NavOptions navOptions={navOptions} />
      <NavExtras />
    </div>
  );
};

export default Navbar;
