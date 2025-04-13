import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    // Show errors as toasts
    if (error) {
      toast.error("Error", {
        description: error,
      });
    }
  }, [error]);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (formData.email.trim() && formData.password.trim()) {
      dispatch(loginUser(formData))
        .unwrap()
        .then((data) => {
          if (data.success) {
            toast.success("Login successful", {
              description: data.message || "You have been logged in",
            });
          }
        })
        .catch((error) => {
          toast.error("Login failed", {
            description: error.message || "Something went wrong",
          });
        });
    } else {
      toast.warning("Missing information", {
        description: "Please fill in all required fields",
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={isLoading ? "Signing In..." : "Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}

export default AuthLogin;