import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const PrivateRoutes = () => {
  const { authUser } = useAuthContext();

  
  return authUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
