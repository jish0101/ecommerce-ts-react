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

const Navbar = ({options}: Props) => {
  return (
    <div
      className={`flex h-[70px] items-center border-b px-3 py-3 shadow-sm`}
    >
        <nav className='flex basis-[50%] items-center h-[70px]'>
          <NavLinks options={options} />
          <div className='lg:ml-auto'>
            <Link to={'/'}>
              <img src={'/logo.svg'} className="w-14 md:mx-2" loading="eager" />
            </Link>
          </div>
        </nav>
      
      <div className='basis-[50%] flex justify-end'>
        <NavExtras />
      </div>
    </div>
  );
};

export default Navbar;
