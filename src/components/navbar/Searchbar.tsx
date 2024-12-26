import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger
} from '@/components/ui/sheet';
import { Search } from 'lucide-react';
import { Button, buttonVariants } from '../ui/button';
import { FormEvent, useEffect, useRef, useState, useCallback } from 'react';
import MutedPara from '../typography/MutedPara';
import { cn } from '@/lib/utils';
import useSearchBarSheet from '@/store/searchbar/useSearchBarSheet';
import useDebounced from '@/hooks/use-debounced';
import { useNavigate } from 'react-router-dom';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '../ui/command';
import ProductList from '../product/ProductList';

const Searchbar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isOpen, toggleSheet } = useSearchBarSheet();

  const [inputValue, setInputValue] = useState('');
  const [isPopOpen, setIsPopOpen] = useState(false);

  const debouncedValue = useDebounced(inputValue, 300);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!debouncedValue) return;

      setInputValue('');
      navigate(`/products?search=${debouncedValue}`);
      toggleSheet();
    },
    [debouncedValue, navigate, toggleSheet]
  );

  // Manage popover state
  useEffect(() => {
    if (debouncedValue) {
      setIsPopOpen(true);
    } else {
      setIsPopOpen(false);
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (isPopOpen === false) {
      const timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [isPopOpen, debouncedValue]);

  // Handle focus when the sheet is open
  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  return (
    <Sheet
      open={isOpen}
      modal={true}
      onOpenChange={(value) => {
        if (!value) setIsPopOpen(false);
        toggleSheet();
      }}
    >
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'h-10 w-10 rounded-full'
        )}
        aria-label="Open search bar"
      >
        <Search size={20} />
      </SheetTrigger>
      <SheetContent className="w-[275px] md:w-[475px]">
        <SheetHeader>
          <MutedPara className="mb-3 mt-8 px-1 text-start text-xs md:px-2 md:text-lg">
            Look for your favorite piece of cloth
          </MutedPara>
        </SheetHeader>
        <form
          className="relative h-[70vh] w-[225px] md:h-10 md:w-[325px]"
          onSubmit={handleSubmit}
        >
          <Command className="min-h-max">
            <CommandInput
              ref={inputRef}
              className={'h-10 rounded-full border border-input bg-transparent indent-4 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-lg md:placeholder:text-base'}
              placeholder="Search..."
            />
            {!debouncedValue ? (
              <CommandList>
                <>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem className='rounded-none my-2' value={'First'} onSelect={() => {}}>
                      <ProductList />
                    </CommandItem>
                    <CommandItem className='rounded-none my-2' value={'First2'} onSelect={() => {}}>
                      <ProductList />
                    </CommandItem>
                  </CommandGroup>
                </>
              </CommandList>
            ) : null}
          </Command>
          <Button
            type="submit"
            className="absolute right-0 top-0 flex h-10 rounded-l-none rounded-r-full md:[&_svg]:size-6"
            aria-label="Submit search"
          >
            <Search />
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default Searchbar;
