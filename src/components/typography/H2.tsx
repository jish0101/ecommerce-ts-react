import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLHeadingElement> {}

export default function H2({ children, className, ...rest }: Props) {
  return (
    <h2
      {...rest}
      className={cn(
        'scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0 md:text-3xl',
        className
      )}
    >
      {children}
    </h2>
  );
}
