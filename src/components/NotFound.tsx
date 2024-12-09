import { useNavigate } from 'react-router-dom';
import H2 from './typography/H2';
import { Button } from './ui/button';
import { ArrowLeft, OctagonMinus } from 'lucide-react';

type Props = {};

const NotFound = ({}: Props) => {
  const navigate = useNavigate();

  return (
    <div className="grid min-h-[calc(100vh-170px)] place-content-center">
      <div className="grid place-content-center gap-3">
        <H2 className="flex items-center gap-2">
          <OctagonMinus /> Page not found
        </H2>
        <Button className="mx-auto w-fit" onClick={() => navigate(-1)}>
          <ArrowLeft />
          Go back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
