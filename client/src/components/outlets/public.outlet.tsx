import { Navigate, Outlet } from 'react-router-dom';


function NavigateToHome() {
    return <Navigate to="/" />;
  }
  
  export function PublicOutlet() {
    // const { user } = useCurrentUser();
  
    // eslint-disable-next-line
    return false ? <NavigateToHome /> : <Outlet />;
  }
  