import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLLIElement> {}

export default function Li({ children, className, ...rest }: Props) {
  return (
    <li {...rest} className={cn('', className)}>
      {children}
    </li>
  );
}
