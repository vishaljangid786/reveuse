import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(token);
  }, []);

  if(hasToken){
    <Navigate to='/' />
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow p-6 bg-gray-100 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
