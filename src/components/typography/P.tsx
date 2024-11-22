import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLParagraphElement> {}

export default function P({ children, className, ...rest }: Props) {
  return (
    <p
      {...rest}
      className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
    >
      {children}
    </p>
  );
}
