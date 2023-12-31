import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import { Home } from './pages/Home';
import Layout from './pages/Layout';
import { Login } from './pages/Login';
import ProtectedRoutes from './routes/ProtectedRoutes';
import { ThirdParty } from './pages/ThirdParty';
import Appointments from './pages/Appointments';
import { MortgageOffer } from './pages/MortgageOffer';
import { DoorChanges } from './pages/DoorChanges';
import Changes from './pages/Changes';
import { Approvals } from './pages/Approvals';

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
        children: [
          { index: true, element: <Home /> },
          { path: '/thirdparty', element: <ThirdParty /> },
          { path: '/appointments', element: <Appointments /> },
          { path: '/mortgages', element: <MortgageOffer /> },
          { path: '/changes', element: <Changes /> },
          { path: '/changes/doors', element: <DoorChanges /> },
          { path: '/approvals', element: <Approvals /> },
        ],
      },
    ],
  },
]);

export default router;
