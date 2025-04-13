import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    
    if (formData.userName.trim() && formData.email.trim() && formData.password.trim()) {
      dispatch(registerUser(formData))
        .unwrap()
        .then((data) => {
          if (data.success) {
            toast.success("Registration successful", {
              description: data.message || "Your account has been created",
            });
            navigate("/auth/login");
          }
        })
        .catch((error) => {
          toast.error("Registration failed", {
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
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={isLoading ? "Signing Up..." : "Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}

export default AuthRegister;