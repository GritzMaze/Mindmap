
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function NavigateToLogin() {
    const location = useLocation();
  
    return <Navigate to="/login" state={{ location: location.pathname }} />;
  }

export function PrivateOutlet() {
    // const {user} = useCurrentUser();
  
    // eslint-disable-next-line
    return true ? (
      <>
        <Outlet />
      </>
    ) : (
      <NavigateToLogin />
    );
  }