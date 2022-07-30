import { useLocation, Navigate, Outlet } from "react-router-dom";
import useUserContext from '../hooks/useUserContext';
import Auth from '../utils/auth'

const RequireAuth = ({ userType }) => {
  const user = useUserContext();
  const location = useLocation();
  return (
    (Auth.loggedIn() && user.userType === userType )
      ? <Outlet />
      : <Navigate to="/unauthorised" state={{ from: location }} replace />
  );
};

export default RequireAuth;
