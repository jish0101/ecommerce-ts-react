import Loader from './Loader';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const SuspenseWrapper = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  );
};

export default SuspenseWrapper;
