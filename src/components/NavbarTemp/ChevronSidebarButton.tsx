import { Button, ButtonProps } from '../ui/button';
import { ChevronsLeft, Menu } from 'lucide-react';
import { useSidebar } from '../ui/sidebar';
import { cn } from '@/lib/utils';

interface Props extends ButtonProps {
  isSheet: boolean;
}

const ChevronSidebarButton = ({ isSheet, className, ...restProps }: Props) => {
  const { openMobile, toggleSidebar } = useSidebar();

  return (
    <Button
      size={'icon'}
      variant={'ghost'}
      onClick={toggleSidebar}
      className={cn('flex md:hidden', className)}
      {...restProps}
    >
      {openMobile && isSheet ? <ChevronsLeft /> : <Menu />}
    </Button>
  );
};

export default ChevronSidebarButton;
