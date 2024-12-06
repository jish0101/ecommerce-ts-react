import useUserState from '@/store/user/useUserState';
import { PayloadUser } from '@/types/user';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

type Props = {
  roles: PayloadUser['role'][];
};

export default function CheckAuth({ roles }: Props) {
  const location = useLocation();
  const user = useUserState((state) => state.user);

  if (!user) {
    return <Navigate to={'/auth/login'} state={location} />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to={'/auth/unauthorised'} state={location} />;
  }

  return <Outlet />;
}
