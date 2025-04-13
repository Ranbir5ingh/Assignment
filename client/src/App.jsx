import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import NotFound from "./pages/not-found";
import CheckAuth from "./components/common/check-auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import Loader from "./components/common/loader";
import Dashboard from "./pages/dashboard";

function App() {
  const {isAuthenticated, isLoading } = useSelector(
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
          
          ></CheckAuth>
        }
      />
      <Route
        path="/auth"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} >
            <AuthLayout />
          </CheckAuth>
        }
      >
        <Route path="login" element={<AuthLogin />} />
        <Route path="register" element={<AuthRegister />} />
      </Route>
      
      <Route path="/dashboard" element={<CheckAuth isAuthenticated={isAuthenticated} ><Dashboard/></CheckAuth>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>
  )
}

export default App
