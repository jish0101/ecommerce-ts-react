import {
Sheet,
SheetContent,
SheetHeader,
SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { FormEvent } from 'react';
import MutedPara from "../typography/MutedPara";

const Searchbar = () => {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert('Test');
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"ghost"} className="h-10 w-10 rounded-full">
          <Search size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[85%]">
        <SheetHeader>
          <MutedPara className="mb-3 mt-8 text-xs md:text-lg px-1 md:px-2 text-start">Look for your favorite piece of cloth</MutedPara>
        </SheetHeader>
        <form className="relative" onSubmit={handleSubmit}>
          <Input
            placeholder="Search.."
            className="rounded-full indent-2 placeholder:text-sm md:placeholder:text-lg md:h-12 md:text-lg text-sm"
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
