import Li from '../typography/Li';
import { Link, useLocation } from 'react-router-dom';
import { NavOption } from '../layout/Navbar';
import { cn } from '@/lib/utils';

type Props = {
  option: NavOption;
};

const Navlink = ({ option }: Props) => {
  const path = useLocation().pathname;
  return (
    <Li className={'!mt-0 list-none font-medium leading-6'}>
      <Link
        className={cn(
          path === option.href
            ? 'underline'
            : 'hover:underline hover:opacity-65'
        )}
        to={option.href}
      >
        {option.label}
      </Link>
    </Li>
  );
};

export default Navlink;
