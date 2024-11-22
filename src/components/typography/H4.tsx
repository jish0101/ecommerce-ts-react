import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLHeadingElement> {}

export default function H4({ children, className, ...rest }: Props) {
  return (
    <h4
      {...rest}
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
    >
      {children}
    </h4>
  );
}
