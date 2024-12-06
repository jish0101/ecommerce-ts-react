import { NavOption } from "@/components/layout/Navbar";
import Loader from "@/components/Loader";
import SidebarComponent from "@/components/Navbar/Sidebar"
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider } from "@/components/ui/sidebar"
import useLoader from "@/store/loader/useLoader";
import { Outlet } from "react-router-dom";

type Props = {}

const DashboardLayout = ({}: Props) => {
    const { isLoading } = useLoader();

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
                'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            },
            {
              label: 'Categories',
              href: '/product-categories2',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            },
            {
              label: 'Categories',
              href: '/product-categories3',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            },
            {
              label: 'Categories',
              href: '/product-categories4',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            }
          ]
        }
      ];

  return (
      <SidebarProvider defaultOpen={true}>
        <SidebarComponent navOptions={navOptions} />
        <div className="flex-1 flex flex-col">
          {isLoading ? <Loader /> : null}
          <ScrollArea type="scroll" className={`h-[calc(100vh-70px)]`}>
            <Outlet />
          </ScrollArea>
        </div>
      </SidebarProvider>
  )
}

export default DashboardLayout