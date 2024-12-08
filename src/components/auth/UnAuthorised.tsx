import useUserState from '@/store/user/useUserState';
import H2 from '../typography/H2';
import { Button } from '../ui/button';
import { OctagonMinus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useSheetState from '@/store/navbar/useSheetState';
import useLoader from '@/store/loader/useLoader';
import { useToast } from '@/hooks/use-toast';
import { asyncWrapper } from '@/lib/utils';
import { logout } from '@/api/auth';
import { useLayoutEffect } from 'react';

type Props = {};

const UnAuthorised = ({}: Props) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isLoading, toggle } = useLoader();
  const { isOpen, toggleSheet } = useSheetState();
  const user = useUserState((state) => state.user);
  const resetUser = useUserState((state) => state.resetUser);

  useLayoutEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      if (isOpen) {
        toggleSheet();
      }

      toggle(true);
      const { response, error } = await asyncWrapper(logout);

      if (error !== null) {
        toggle(false);
        return toast({
          title: 'Failed',
          description: error.message
        });
      }

      const {
        data: { status, message }
      } = response!;

      if (status === 200) {
        toggle(false);
        toast({
          title: 'Success',
          description: message
        });
        resetUser();
        navigate('/auth/login');
      } else {
        toggle(false);
        toast({
          title: 'Failed',
          description: message
        });
      }
    } catch (error: any) {
      toggle(false);
      toast({
        title: 'Failed',
        description: error.message
      });
    }
  };

  return (
    <div className="md:min-h-[calc(90vh-70px)] grid place-content-center">
      <div className="grid place-content-center gap-3">
        <H2 className="flex gap-2 items-center">
          <OctagonMinus /> You are not authorised to view this page
        </H2>
        <div className="flex justify-center items-center gap-2">
          <Button
            disabled={isLoading}
            className="w-fit"
            onClick={() => navigate('/')}
          >
            Home
          </Button>
          <Button
            disabled={isLoading}
            onClick={handleLogout}
            variant={'destructive'}
            className="w-fit"
          >
            {isLoading ? 'Logging-out..' : 'Logout'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnAuthorised;
