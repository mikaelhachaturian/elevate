import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import { Home } from './pages/Home';
import Layout from './pages/Layout';
import { Login } from './pages/Login';
import ProtectedRoutes from './routes/ProtectedRoutes';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <ProtectedRoutes />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [{ index: true, element: <Home /> }],
      },
    ],
  },
]);

export default router;
