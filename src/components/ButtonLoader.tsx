import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {}

const Loader = ({ className, ...rest }: LoaderProps) => {
  return (
    <div
      className={cn(
        'h-5 w-5 animate-spin rounded-full border-[3px] border-t-transparent',
        className
      )}
      {...rest}
    ></div>
  );
};

export default Loader;
