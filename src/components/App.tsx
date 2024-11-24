import { lazy } from 'react';
import Layout from './layout/Layout';
import SuspenseWrapper from './SuspenseWrapper';
import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallBack, { errorResetHandler } from './ErrorFallback';

const NotFound = lazy(() => import('./NotFound')) ;
const HomePage = lazy(() => import('@/pages/HomePage/HomePage'));
const ProductPage = lazy(() => import('@/pages/ProductPage/ProductPage'));

function App() {
  return (
    <ErrorBoundary onReset={errorResetHandler} fallbackRender={ErrorFallBack}>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<SuspenseWrapper />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route element={<SuspenseWrapper />}>
            <Route path="/products" element={<ProductPage />} />
          </Route>
          <Route element={<SuspenseWrapper />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
