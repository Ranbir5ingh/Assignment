import React from "react";
import Navbar from "../common/navbar";
import { Outlet } from "react-router-dom";

export default function UserViewLayout() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}
