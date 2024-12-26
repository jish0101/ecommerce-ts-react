import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import P from '@/components/typography/P';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import MutedPara from '@/components/typography/MutedPara';

type Props = {
  option: { label: string; href?: string; description?: string };
};

const NavLink = ({ option }: Props) => {
  return (
    <div>
      {!option.href ? (
        <P className={cn(navigationMenuTriggerStyle())}>{option.label}</P>
      ) : (
        <Link
          className={cn(navigationMenuTriggerStyle(), 'h-auto w-full flex-col')}
          to={option.href}
          key={option.href}
        >
          {option.label}
          {option.description && <MutedPara>{option.description}</MutedPara>}
        </Link>
      )}
    </div>
  );
};

export default NavLink;
