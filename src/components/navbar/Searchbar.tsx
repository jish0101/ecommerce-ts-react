import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { FormEvent, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Searchbar = ({ className, ...restProps }: Props) => {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert('Test');
  }

  return (
    <div {...restProps} className={cn('relative', className)}>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Search your favorite clothings"
          className="rounded-full indent-2 placeholder:text-base md:h-12 md:w-[400px] md:text-base lg:w-[550px]"
        />
        <Button
          type="submit"
          className="absolute right-0 top-0 flex h-full rounded-l-none rounded-r-full md:[&_svg]:size-6"
        >
          <Search />
        </Button>
      </form>
    </div>
  );
};

export default Searchbar;
