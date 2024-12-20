import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger
} from '@/components/ui/sheet';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { Button, buttonVariants } from '../ui/button';
import { FormEvent, useEffect, useRef } from 'react';
import MutedPara from '../typography/MutedPara';
import { cn } from '@/lib/utils';
import useSearchBarSheet from '@/store/searchbar/useSearchBarSheet';

const Searchbar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isOpen, toggleSheet } = useSearchBarSheet();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert('Test');
  }

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (!inputRef.current) return;

        inputRef.current.focus();
      }, 0);
    }
  }, [isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={toggleSheet}>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'h-10 w-10 rounded-full'
        )}
      >
        <Search size={20} />
      </SheetTrigger>
      <SheetContent className="w-[85%]">
        <SheetHeader>
          <MutedPara className="mb-3 mt-8 px-1 text-start text-xs md:px-2 md:text-lg">
            Look for your favorite piece of cloth
          </MutedPara>
        </SheetHeader>
        <form className="relative" onSubmit={handleSubmit}>
          <Input
            ref={inputRef}
            placeholder="Search.."
            className="rounded-full indent-2 text-sm placeholder:text-sm md:h-12 md:text-lg md:placeholder:text-lg"
          />
          <Button
            type="submit"
            className="absolute right-0 top-0 flex h-full rounded-l-none rounded-r-full md:[&_svg]:size-6"
          >
            <Search />
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default Searchbar;
