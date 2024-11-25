import { Link } from 'react-router-dom';
import { NavOption } from '../layout/Navbar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '../ui/navigation-menu';
import MutedPara from '../typography/MutedPara';

type Props = {
  navOptions: NavOption[];
};

const NavOptions = ({ navOptions }: Props) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navOptions.map((opt) => (
          <div key={opt.label}>
            {opt.listOptions ? (
              <NavigationMenuItem>
                <NavigationMenuTrigger>{opt.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {opt.listOptions.map((op) => (
                      <Link
                        className={`${navigationMenuTriggerStyle()} h-auto flex-col max-w-fit`}
                        key={op.href}
                        to={op.href}
                      >
                        <div className="space-y-1">
                          <span className="font-medium">{op.label}</span>
                          <MutedPara>{op.description}</MutedPara>
                        </div>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem>
                <Link className={navigationMenuTriggerStyle()} to={opt.href}>
                  {opt.label}
                </Link>
              </NavigationMenuItem>
            )}
          </div>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavOptions;
