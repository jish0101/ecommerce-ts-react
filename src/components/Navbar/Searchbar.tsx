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
          className="md:text-base rounded-full indent-2 lg:w-[650px] md:w-[450px] md:h-12 placeholder:text-base"
        />
        <Button
          type="submit"
          className="flex md:[&_svg]:size-6 absolute h-full top-0 right-0 rounded-r-full rounded-l-none"
        >
          <Search />
        </Button>
      </form>
    </div>
  );
};

export default Searchbar;
