import { useNavigate } from 'react-router-dom';
import H2 from './typography/H2';
import { Button } from './ui/button';
import { ArrowLeft, OctagonMinus } from 'lucide-react';

type Props = {};

const NotFound = ({}: Props) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-170px)] grid place-content-center">
      <div className="grid place-content-center gap-3">
        <H2 className="flex gap-2 items-center">
          <OctagonMinus /> Page not found
        </H2>
        <Button className="w-fit mx-auto" onClick={() => navigate(-1)}>
          <ArrowLeft />
          Go back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
