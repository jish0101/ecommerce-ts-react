import React from 'react';
import H4 from '@/components/typography/H4';
import Searchbar from '@/components/navbar/Searchbar';

type Props = {
  children: React.ReactNode;
};

const Filters = ({ children }: Props) => {
  return (
    <div className='flex gap-4'>
      <div className="basis-[350px]">
        <div className="flex h-[40px] items-center justify-between">
          <H4>Filters</H4>
          <Searchbar />
        </div>
      </div>
      {children}
    </div>
  );
};

export default Filters;
