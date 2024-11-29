import { lazy } from 'react';
import Layout from './layout/Layout';
import CheckAuth from './auth/CheckAuth';
import SuspenseWrapper from './SuspenseWrapper';
import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallBack, { errorResetHandler } from './ErrorFallback';

const NotFound = lazy(() => import('./NotFound'));

const Login = lazy(() => import('./auth/Login'));
const Signup = lazy(() => import('./auth/Signup'));
const UnAuthorised = lazy(() => import('./auth/UnAuthorised'));

const HomePage = lazy(() => import('@/pages/HomePage/HomePage'));
const ProductPage = lazy(() => import('@/pages/ProductPage/ProductPage'));

function App() {
  return (
    <ErrorBoundary onReset={errorResetHandler} fallbackRender={ErrorFallBack}>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<CheckAuth roles={['USER']} />}>
            <Route element={<SuspenseWrapper />}>
              <Route path="/" element={<HomePage />} />
            </Route>
            <Route element={<SuspenseWrapper />}>
              <Route path="/products" element={<ProductPage />} />
            </Route>
          </Route>
        </Route>

          <Route element={<SuspenseWrapper />}>
            <Route path="/auth/login" element={<Login />} />
          </Route>
          <Route element={<SuspenseWrapper />}>
            <Route path="/auth/signup" element={<Signup />} />
          </Route>
          <Route element={<SuspenseWrapper />}>
            <Route path="/auth/unauthorised" element={<UnAuthorised />} />
          </Route>
        <Route element={<SuspenseWrapper />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
