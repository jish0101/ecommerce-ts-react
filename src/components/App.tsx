import { lazy } from 'react';
import CheckAuth from './auth/CheckAuth';
import SuspenseWrapper from './SuspenseWrapper';
import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallBack, { errorResetHandler } from './ErrorFallback';

function App() {
  const NotFound = lazy(() => import('./NotFound'));

  // Auth
  const AuthLayout = lazy(() => import('./layout/AuthLayout'));
  const Login = lazy(() => import('./auth/Login'));
  const Signup = lazy(() => import('./auth/Signup'));
  const VerifyUser = lazy(() => import('./auth/VerifyUser'));
  const ResetPassport = lazy(() => import('./auth/ResetPassword'));
  const UnAuthorised = lazy(() => import('./auth/UnAuthorised'));

  // General
  const Layout = lazy(() => import('./layout/Layout'));
  const HomePage = lazy(() => import('@/pages/HomePage/HomePage'));
  const ProductPage = lazy(() => import('@/pages/ProductPage/ProductPage'));

  // Layout
  const Dashboard = lazy(() => import('@/pages/Dashboard/Dashboard'));
  const DashboardLayout = lazy(
    () => import('@/pages/Dashboard/DashboardLayout')
  );

  // Settings
  const SettingsWrapper = lazy(
    () => import('@/pages/settings/SettingsWrapper')
  );
  const Settings = lazy(() => import('@/pages/settings/Settings'));
  const Orders = lazy(() => import('@/pages/settings/user/Orders'));
  const UserProfile = lazy(() => import('@/pages/settings/user/UserProfile'));

  return (
    <ErrorBoundary onReset={errorResetHandler} fallbackRender={ErrorFallBack}>
      <Routes>
        <Route element={<SuspenseWrapper />}>
          <Route element={<Layout />}>
            {/* PUBLIC ROUTES */}
            <Route element={<CheckAuth roles={['ADMIN', 'USER']} />}>
              <Route element={<SuspenseWrapper />}>
                <Route path="/" element={<HomePage />} />
              </Route>
              <Route element={<SuspenseWrapper />}>
                <Route path="/products" element={<ProductPage />} />
              </Route>

              {/* SETTINGS ROUTES */}
              <Route path="/settings" element={<SettingsWrapper />}>
                <Route index element={<Settings />} />
                <Route path=":subSettings" element={<Settings />} />
                <Route element={<SuspenseWrapper />}>
                  <Route path="user/profile" element={<UserProfile />} />
                </Route>
                <Route element={<SuspenseWrapper />}>
                  <Route path="user/orders" element={<Orders />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>

        {/* ADMIN ROUTES */}
        <Route element={<SuspenseWrapper />}>
          <Route element={<DashboardLayout />}>
            <Route path="/admin" element={<CheckAuth roles={['ADMIN']} />}>
              <Route element={<SuspenseWrapper />}>
                <Route path="dashboard" element={<Dashboard />} />
              </Route>
            </Route>
          </Route>
        </Route>

        {/* AUTH ROUTES */}
        <Route element={<SuspenseWrapper />}>
          <Route element={<AuthLayout />}>
            <Route element={<SuspenseWrapper />}>
              <Route path="/auth/login" element={<Login />} />
            </Route>
            <Route element={<SuspenseWrapper />}>
              <Route path="/auth/signup" element={<Signup />} />
            </Route>
            <Route element={<SuspenseWrapper />}>
              <Route path="/auth/verify-user" element={<VerifyUser />} />
            </Route>
            <Route element={<SuspenseWrapper />}>
              <Route path="/auth/reset-password" element={<ResetPassport />} />
            </Route>
            <Route element={<SuspenseWrapper />}>
              <Route path="/auth/unauthorised" element={<UnAuthorised />} />
            </Route>
            <Route element={<SuspenseWrapper />}>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
