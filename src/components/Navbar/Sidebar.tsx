import { Link } from 'react-router-dom';
import { NavOption } from '../layout/Navbar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
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
import P from '../typography/P';
import NavExtras from './NavExtras';
import { ChevronDown } from 'lucide-react';

type Props = {
  navOptions: NavOption[];
};

const SidebarComponent = ({ navOptions }: Props) => {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex justify-start items-center">
          <Link className={`flex gap-2 text-xl items-end`} to="/">
            <img src={'/logo.svg'} className="w-20 p-3" loading="eager" />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navOptions.map((option) => (
              <>
                {!option.listOptions && (
                  <SidebarMenuItem key={option.label}>
                    <SidebarMenuButton
                      asChild
                      size={'lg'}
                      isActive={option.href === 'path'}
                      className="data-[active=true]:bg-primary data-[active=true]:text-neutral-100 hover:bg-accent"
                    >
                      {option.href ? (
                        <Link to={option.href}>
                          <div className="flex items-center space-x-2 px-2">
                            <span>{option.label}</span>
                          </div>
                        </Link>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span>{option.label}</span>
                        </div>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}

                {option.listOptions && (
                  <Collapsible defaultOpen className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          size={'lg'}
                          className="justify-between data-[state=open]:hover:bg-accent hover:bg-accent"
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
                                  className="data-[active=true]:bg-primary data-[active=true]:text-neutral-100 hover:bg-accent"
                                  isActive={op.href === 'path'}
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
              </>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavExtras isSheet />
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarComponent;
