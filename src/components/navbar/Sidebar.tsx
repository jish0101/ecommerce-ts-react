import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem
} from '../ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '../ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { NavOption } from '../layout/Navbar';

type Props = {
  options: NavOption[];
  FooterContent?: React.ReactNode;
};

const SidebarComponent = ({ options, FooterContent }: Props) => {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-0">
        <div className="flex h-[70px] items-center justify-start p-3">
          <Link to={'/'}>
            <img src={'/logo.svg'} className="w-12 md:mx-2" loading="eager" />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-2 py-0">
          <SidebarMenu className="justify-center">
            {options.map((option) => (
              <div key={option.href}>
                {!option.listOptions && (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      size={'lg'}
                      isActive={option.href === location.pathname}
                      className="mx-2 rounded-l-full hover:bg-accent data-[active=true]:bg-primary data-[active=true]:text-neutral-100"
                    >
                      <Link to={option.href}>
                        <div className="flex items-center space-x-2 px-2">
                          <span>{option.label}</span>
                        </div>
                        <SidebarMenuBadge className="text-current">
                          {option.icon}
                        </SidebarMenuBadge>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}

                {option.listOptions && (
                  <Collapsible defaultOpen className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          size={'lg'}
                          className="justify-between hover:bg-accent data-[state=open]:hover:bg-accent"
                        >
                          <div className="flex items-center space-x-2 px-2">
                            <span>{option.label}</span>
                          </div>
                          <ChevronDown className="transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <ul className="space-y-1">
                            {option.listOptions.map((op) => (
                              <SidebarMenuSubItem key={op.href}>
                                <SidebarMenuButton
                                  asChild
                                  size={'lg'}
                                  tooltip={op.label}
                                  className="hover:bg-accent data-[active=true]:bg-primary data-[active=true]:text-neutral-100"
                                  isActive={op.href === location.pathname}
                                >
                                  <Link to={op.href}>
                                    <div className="flex items-center space-x-3 px-1">
                                      <span>{op.label}</span>
                                    </div>
                                  </Link>
                                </SidebarMenuButton>
                              </SidebarMenuSubItem>
                            ))}
                          </ul>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                )}
              </div>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      {FooterContent && <SidebarFooter>{FooterContent}</SidebarFooter>}
    </Sidebar>
  );
};

export default SidebarComponent;
