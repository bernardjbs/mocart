import { useLocation, Navigate, Outlet } from "react-router-dom";
import useUserContext from '../hooks/useUserContext';
import Auth from '../utils/auth'
const RequireAuth = () => {
  const user = useUserContext();
  const location = useLocation();

  return (
    Auth.loggedIn()
      ? <Outlet />
      : <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
