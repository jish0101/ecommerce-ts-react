import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLHeadingElement> {}

export default function H3({ children, className, ...rest }: Props) {
  return (
    <h3
      {...rest}
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className
      )}
    >
      {children}
    </h3>
  );
}
