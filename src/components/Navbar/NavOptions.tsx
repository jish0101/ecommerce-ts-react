import { Link } from 'react-router-dom';
import { NavOption } from '../layout/Navbar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
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
          <>
            {opt.listOptions ? (
              <NavigationMenuItem key={opt.label}>
                <NavigationMenuTrigger>{opt.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {opt.listOptions.map((op) => (
                      <Link key={op.href} to={op.href}>
                        <NavigationMenuLink
                          className={`${navigationMenuTriggerStyle()} h-auto flex-col max-w-fit`}
                        >
                          <div className="space-y-1">
                            <span className="font-medium">{op.label}</span>
                            <MutedPara>{op.description}</MutedPara>
                          </div>
                        </NavigationMenuLink>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem key={opt.href}>
                <Link to={opt.href}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {opt.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
          </>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavOptions;
