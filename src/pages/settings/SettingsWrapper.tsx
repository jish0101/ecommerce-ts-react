import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';

type Props = {};

const SettingsWrapper = ({}: Props) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 py-4">
      <div className="flex h-12 items-center">
        <Button onClick={() => navigate(-1)} className="rounded-full" size={'icon'}>
          <ArrowLeft />
        </Button>
      </div>
      <Outlet />
    </div>
  );
};

export default SettingsWrapper;
