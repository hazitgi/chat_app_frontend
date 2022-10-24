import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, ...props }) => {
  const isLoggedIn = useSelector((state) => state.authReducer.isLogged);
  console.log("isLoggedIn", isLoggedIn);
  if (isLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
