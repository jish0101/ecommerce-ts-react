import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {}

const Loader = ({ className, ...rest }: LoaderProps) => {
  return (
    <div
      className={cn(
        'h-6 w-6 animate-spin rounded-full border-4 border-white border-t-transparent',
        className
      )}
      {...rest}
    ></div>
  );
};

export default Loader;
