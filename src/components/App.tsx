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

  // Products
  const ProductsLayout = lazy(() => import('@/pages/products/Layout'));
  const Product = lazy(() => import('@/pages/product'));
  const Products = lazy(() => import('@/pages/products'));

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

  // Settings/User
  const Cart = lazy(() => import('@/pages/settings/user/cart'));
  const Orders = lazy(() => import('@/pages/settings/user/order'));
  const Address = lazy(() => import('@/pages/settings/user/address'));
  const Wishlist = lazy(() => import('@/pages/settings/user/wishlist'));
  const UserProfile = lazy(() => import('@/pages/settings/user/profile'));

  return (
    <Routes>
      <Route element={<SuspenseWrapper />}>
        <Route element={<Layout />}>
          {/* PUBLIC ROUTES */}
          <Route element={<SuspenseWrapper />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<SuspenseWrapper />}>
            <Route element={<ProductsLayout />}>
              <Route element={<SuspenseWrapper />}>
                <Route path="/products" element={<Products />} />
              </Route>
              <Route element={<SuspenseWrapper />}>
                <Route path="/product/:id" element={<Product />} />
              </Route>
            </Route>
          </Route>

          {/* SETTINGS ROUTES */}
          <Route element={<SuspenseWrapper />}>
            <Route
              path="/settings"
              element={<CheckAuth roles={['ADMIN', 'USER']} />}
            >
              <Route element={<SettingsWrapper />}>
                <Route element={<SuspenseWrapper />}>
                  <Route index element={<Settings />} />
                </Route>
                <Route element={<SuspenseWrapper />}>
                  <Route path="user/cart" element={<Cart />} />
                </Route>
                <Route element={<SuspenseWrapper />}>
                  <Route path="user/orders" element={<Orders />} />
                </Route>
                <Route element={<SuspenseWrapper />}>
                  <Route path="user/wishlist" element={<Wishlist />} />
                </Route>
                <Route element={<SuspenseWrapper />}>
                  <Route path="user/address" element={<Address />} />
                </Route>
                <Route element={<SuspenseWrapper />}>
                  <Route path="user/profile" element={<UserProfile />} />
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
