import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { NavOption } from '../layout/Navbar';
import { useNavigate } from 'react-router-dom';

type Props = { options: NavOption[] }

export default function CommandPallete({ options }: Props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleRoute = (path: string) => {
    setOpen(false);
    return navigate(path);
  };

  return (
    <div className="grid items-center h-[60px] w-[100%] md:min-w-[650px]">
      <Button
        variant={'secondary'}
        onClick={() => setOpen(true)}
        className="w-full md:[&_svg]:size-6 text-sm h-12 border flex items-center justify-between gap-3 cursor-pointer text-muted-foreground bg-card"
      >
        <Search size={20} />
        <kbd className="pointer-events-none p-3 bg-card inline-flex h-5 select-none items-center gap-1 rounded font-medium text-muted-foreground opacity-100 border">
          <span>⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandGroup heading="Navigation">
            {options.map((option) => (
              <CommandItem
                key={option.href}
                onSelect={() => handleRoute(option.href)}
              >
                {option.icon}
                <span>{option.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
