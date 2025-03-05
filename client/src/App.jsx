import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import NotFound from "./pages/not-found";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import Loader from "./components/common/loader";
import UserViewLayout from "./components/user-view/layout";
import Home from "./pages/user-view/home";
import AdminViewLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Loader/>;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
    <Routes>
      <Route
        path="/"
        element={
          <CheckAuth
            isAuthenticated={isAuthenticated}
            user={user}
          ></CheckAuth>
        }
      />
      <Route
        path="/auth"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }
      >
        <Route path="login" element={<AuthLogin />} />
        <Route path="register" element={<AuthRegister />} />
      </Route>
      <Route
        path="/admin"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminViewLayout/>
          </CheckAuth>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>
      <Route
        path="/user"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <UserViewLayout/>
          </CheckAuth>
        }
      >
        <Route path="home" element={<Home/>} />

      </Route>
      <Route path="/unauth-page" element={<UnauthPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>
  )
}

export default App
