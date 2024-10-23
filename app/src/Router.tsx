import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home.page';
import RegisterPage from './pages/Register.page';
import WelcomePage from './pages/Welcome.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/welcome',
    element: <WelcomePage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
