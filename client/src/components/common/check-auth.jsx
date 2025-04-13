import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, children }) {
  const location = useLocation();


  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      return <Navigate to="/dashboard"/>
    }
  }

  if (
    !isAuthenticated &&
    !(
      (location.pathname.includes("auth"))
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("auth"))
  ) {
    return <Navigate to='/dashboard'/>
  }

  return <>{children}</>;
}

export default CheckAuth;