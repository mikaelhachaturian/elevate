import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../stores/auth';

const ProtectedRoutes = () => {
  const isAuthenticated = useAuth((state) => state.session?.isAuthenticated);
  const showPrivateRoutes =
    isAuthenticated === undefined ? false : isAuthenticated;

  return showPrivateRoutes ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
