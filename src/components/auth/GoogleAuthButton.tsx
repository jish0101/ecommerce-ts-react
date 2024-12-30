import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import getEnv from '@/lib/envConfig';
import GoogleIcon from '/google-icon.svg';
import { toast } from '@/hooks/use-toast';
import { refreshToken } from '@/api/auth';
import { buttonVariants } from '../ui/button';
import useUserState from '@/store/user/useUserState';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

type Props = {};

const GoogleAuthButton = ({}: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { setUser } = useUserState();
  const [params] = useSearchParams();

  const objParams = Object.fromEntries(params.entries());
  const redirectTo = location.state?.pathname ? location.state?.pathname : '/';

  async function getAuth() {
    try {
      const { data, status } = await refreshToken({});

      if (status === 400) {
        toast({ title: 'Failed to login' });
        return navigate('/auth/login', { state: location });
      }

      setUser(data.data);
      return navigate(redirectTo);
    } catch (error: any) {
      toast({ title: error.message });
    }
  }

  useEffect(() => {
    if (objParams.auth === 'success') {
      getAuth();
    }
  }, [objParams.auth]);

  return (
    <a
      className={cn(buttonVariants({ variant: 'default' }), 'w-full')}
      href={`${getEnv('VITE_APP_BASE_API')}/auth/google`}
    >
      <div className="flex items-center gap-2">
        <img src={GoogleIcon} className="h-[24px] w-[24px]" /> Login with Google
      </div>
    </a>
  );
};

export default GoogleAuthButton;
