import NavLink from './NavLink';
import { NavOption } from './types';
import NavDropdown from './NavDropdown';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from '@/components/ui/navigation-menu';

type Props = {
  navOptions: NavOption[];
};

const NavOptions = ({ navOptions }: Props) => {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          {navOptions.map((opt) => {
            if (!opt.listOptions) {
              return (
                <NavigationMenuItem key={opt.label}>
                  <NavLink option={opt} />
                </NavigationMenuItem>
              );
            } else {
              return <NavDropdown key={opt.label} option={opt} />;
            }
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default NavOptions;
