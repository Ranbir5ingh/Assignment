import React from "react";
import Navbar from "../common/navbar";
import { Outlet } from "react-router-dom";

export default function AdminViewLayout() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
