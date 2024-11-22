import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const SuspenseWrapper = () => {
  return (
    <Suspense fallback={'Loading...'}>
      <Outlet />
    </Suspense>
  );
};

export default SuspenseWrapper;
