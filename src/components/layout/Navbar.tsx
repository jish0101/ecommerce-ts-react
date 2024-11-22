import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import logoSrc from '../../../public/logo.svg';
import MutedPara from '../typography/MutedPara';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '../ui/navigation-menu';
import UserAvatar from './UserAvatar';

type ListOption = {
  href: string;
  label: string;
  description: string;
};

type NavOption = {
  href: string;
  label: string;
  listOptions?: ListOption[];
};

const Navbar = () => {
  const navOptions: NavOption[] = [
    {
      label: 'Home',
      href: '/'
    },
    {
      label: 'Category',
      href: '/product-categories'
    },
    {
      label: 'Categories',
      href: '',
      listOptions: [
        {
          label: 'Categories',
          href: '/product-categories',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere fuga pariatur fugit dolor, aliquid nesciunt '
        },
        {
          label: 'Categories',
          href: '/product-categories',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere fuga pariatur fugit dolor, aliquid nesciunt '
        },
        {
          label: 'Categories',
          href: '/product-categories',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere fuga pariatur fugit dolor, aliquid nesciunt '
        },
        {
          label: 'Categories',
          href: '/product-categories',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere fuga pariatur fugit dolor, aliquid nesciunt '
        }
      ]
    }
  ];

  return (
    <div className="flex items-center justify-between p-4">
      <img src={logoSrc} loading="eager" />
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
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {opt.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
            </>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex gap-3 items-center">
        <div>
          <ShoppingCart />
        </div>
        <div>
          <Heart />
        </div>
        <div>
          <UserAvatar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
