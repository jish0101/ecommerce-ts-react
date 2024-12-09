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
import { cn } from '@/lib/utils';

type Props = {
  navOptions: NavOption[];
};

const NavOptions = ({ navOptions }: Props) => {
  return (
    <NavigationMenu orientation="vertical">
      <NavigationMenuList className={`hidden lg:flex`}>
        {navOptions.map((opt) => (
          <div key={opt.label}>
            {opt.listOptions ? (
              <NavigationMenuItem>
                <NavigationMenuTrigger>{opt.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="flex w-[200px] flex-col gap-3 p-4 md:w-[300px]">
                    {opt.listOptions.map((op) => (
                      <Link
                        className={`${navigationMenuTriggerStyle()} h-auto max-w-fit flex-col`}
                        key={op.href}
                        to={op.href}
                      >
                        <div className="max-w-fit space-y-1">
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
                <Link
                  className={cn(navigationMenuTriggerStyle())}
                  to={opt.href}
                >
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
