import { lazy } from 'react';
import CheckAuth from './auth/CheckAuth';
import SuspenseWrapper from './SuspenseWrapper';
import { Route, Routes } from 'react-router-dom';

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
  const Home = lazy(() => import('@/pages/home'));
  const Product = lazy(() => import('@/pages/product'));

  // Dashboard
  const DashboardLayout = lazy(() => import('@/pages/dashboard'));
  const Dashboard = lazy(() => import('@/pages/dashboard/pages'));
  const DashboardUsersPage = lazy(() => import('@/pages/dashboard/pages/user'));
  const DashboardProductPage = lazy(
    () => import('@/pages/dashboard/pages/product')
  );

  // Settings
  const SettingsWrapper = lazy(
    () => import('@/pages/settings/SettingsWrapper')
  );
  const Settings = lazy(() => import('@/pages/settings'));
  const Orders = lazy(() => import('@/pages/settings/user/Orders'));
  const UserProfile = lazy(() => import('@/pages/settings/user/UserProfile'));

  return (
    <Routes>
      <Route element={<SuspenseWrapper />}>
        <Route element={<Layout />}>
          {/* PUBLIC ROUTES */}
          <Route element={<SuspenseWrapper />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<SuspenseWrapper />}>
            <Route path="/products" element={<Product />} />
          </Route>

          {/* SETTINGS ROUTES */}
          <Route element={<SuspenseWrapper />}>
            <Route element={<CheckAuth roles={['ADMIN', 'USER']} />}>
              <Route path="/settings" element={<SettingsWrapper />}>
                {/* <Route index element={<Settings />} /> */}
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
      </Route>

      {/* ADMIN ROUTES */}
      <Route element={<SuspenseWrapper />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin" element={<CheckAuth roles={['ADMIN']} />}>
            <Route element={<SuspenseWrapper />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<SuspenseWrapper />}>
              <Route path="users" element={<DashboardUsersPage />} />
            </Route>
            <Route element={<SuspenseWrapper />}>
              <Route path="products" element={<DashboardProductPage />} />
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
  );
}

export default App;
