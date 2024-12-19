import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import NavLink from './NavLink';
import { NavOption } from './types';
import { Separator } from '@/components/ui/separator';

type Props = {
  option: NavOption;
};

const NavDropdown = ({ option }: Props) => {
  if (!option.listOptions) {
    return null;
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{option.label}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="flex flex-col min-w-[150px] gap-1 p-2">
          {option.listOptions.map((op, idx) => (
            <div key={op.label}>
              <NavLink option={op} />
              {option.listOptions && option.listOptions.length > idx + 1 && (
                <Separator />
              )}
            </div>
          ))}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default NavDropdown;
