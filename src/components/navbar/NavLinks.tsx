import Navlink from './Navlink';
import Ul from '../typography/Ul';
import { NavOption } from '../layout/Navbar';

type Props = {
  options: NavOption[];
};

const NavLinks = ({ options }: Props) => {
  return (
    <Ul className="hidden tracking-wide lg:flex lg:items-center lg:gap-8 xl:text-lg">
      {options.map((option) => (
        <Navlink key={option.href} option={option} />
      ))}
    </Ul>
  );
};

export default NavLinks;
