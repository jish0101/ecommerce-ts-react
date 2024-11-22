import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLHeadingElement> {}

export default function H1({ children, className, ...rest }: Props) {
  return (
    <h1
      {...rest}
      className={cn(
        'scroll-m-20 text-4xl font-[800] tracking-tight lg:text-5xl',
        className
      )}
    >
      {children}
    </h1>
  );
}
