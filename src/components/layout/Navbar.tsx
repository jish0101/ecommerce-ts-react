import { Link } from 'react-router-dom';
import NavExtras from '../navbar/NavExtras';
import Ul from '../typography/Ul';
import Li from '../typography/Li';

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
          <Ul className='hidden lg:flex lg:gap-8 lg:items-center xl:text-lg tracking-wide'>
            {options.map(option => (
              <Li key={option.label} className='list-none font-medium hover:underline hover:opacity-65'>
                <Link to={option.href}>{option.label}</Link>
              </Li>
            ))}
          </Ul>
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
