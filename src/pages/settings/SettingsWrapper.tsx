import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Outlet } from 'react-router-dom';

type Props = {};

const SettingsWrapper = ({}: Props) => {
  return (
    <div className='space-y-6'>
      <div className='h-12 flex items-center'>
        <Button className='rounded-full' size={"icon"}>
          <ArrowLeft />
        </Button>
      </div>
      <Outlet />
    </div>
  );
};

export default SettingsWrapper;
