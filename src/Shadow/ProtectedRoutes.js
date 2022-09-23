import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { RiderContext } from "./Pages/Contexts/RiderContext";

export const ProtectedRoutes = ({ children }) => {
  const value = useContext(RiderContext);
  const { token } = value;

  if (!token) {
    return <Navigate to="/login-as" />;
  }
  return children;
};
