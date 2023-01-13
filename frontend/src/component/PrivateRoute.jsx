import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Loader from "./Loader";

function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <Loader />;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
