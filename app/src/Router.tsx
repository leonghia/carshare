import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import WelcomePage from './pages/Welcome.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/welcome',
    element: <WelcomePage />
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
