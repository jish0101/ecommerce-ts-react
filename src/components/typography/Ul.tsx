import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLUListElement> {}

export default function Ul({ children, className, ...rest }: Props) {
  return (
    <ul {...rest} className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)}>
      {children}
    </ul>
  );
}
