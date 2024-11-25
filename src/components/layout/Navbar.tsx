import logoSrc from '/logo.svg';
import { Link } from 'react-router-dom';
import NavExtras from '../Navbar/NavExtras';
import NavOptions from '../Navbar/NavOptions';

export type ListOption = {
  href: string;
  label: string;
  description: string;
};

export type NavOption = {
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
          href: '/product-categories1',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere fuga pariatur fugit dolor, aliquid nesciunt '
        },
        {
          label: 'Categories',
          href: '/product-categories2',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere fuga pariatur fugit dolor, aliquid nesciunt '
        },
        {
          label: 'Categories',
          href: '/product-categories3',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere fuga pariatur fugit dolor, aliquid nesciunt '
        },
        {
          label: 'Categories',
          href: '/product-categories4',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere fuga pariatur fugit dolor, aliquid nesciunt '
        }
      ]
    }
  ];

  return (
    <div
      className={`flex items-center justify-between p-3 shadow-sm border h-[70px]`}
    >
      <Link to={'/'}>
        <img src={logoSrc} className="w-12 md:mx-2" loading="eager" />
      </Link>

      <NavOptions navOptions={navOptions} />

      <NavExtras />
    </div>
  );
};

export default Navbar;
