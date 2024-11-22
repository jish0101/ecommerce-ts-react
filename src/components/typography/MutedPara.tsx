import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLParagraphElement> {}

export default function MutedPara({ children, className, ...rest }: Props) {
  return (
    <p {...rest} className={cn('text-muted-foreground', className)}>
      {children}
    </p>
  );
}
