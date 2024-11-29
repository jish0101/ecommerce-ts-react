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
      <NavigationMenuList className={`hidden sm:flex`}>
        {navOptions.map((opt) => (
          <div key={opt.label}>
            {opt.listOptions ? (
              <NavigationMenuItem>
                <NavigationMenuTrigger>{opt.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="flex flex-col w-[200px] gap-3 p-4 md:w-[300px]">
                    {opt.listOptions.map((op) => (
                      <Link
                        className={`${navigationMenuTriggerStyle()} h-auto flex-col max-w-fit`}
                        key={op.href}
                        to={op.href}
                      >
                        <div className="space-y-1 max-w-fit">
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
