import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../stores/auth';

const ProtectedRoutes = () => {
  const is_authenticated = useAuth((state) => state.is_authenticated);

  return is_authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
