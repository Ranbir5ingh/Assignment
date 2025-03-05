import React from "react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import { toast } from "sonner";

export default function Navbar() {
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logoutUser())
      .then((data) => {
        if (data?.payload?.success) {
          toast.success(data?.payload?.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });

  };
  return (
    <nav className="w-full h-[8vh] bg-muted flex justify-between items-center p-4">
      <h2 className="text-xl font-semibold">Assignment</h2>
      <Button onClick={handleLogout}>Logout</Button>
    </nav>
  );
}
