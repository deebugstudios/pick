import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "./Shadow/Pages/Contexts/RiderContext";

export const UserProtectedRoutes = ({ children }) => {
  const value = useContext(userContext);
  const { token } = value;
  if (!token) {
    return <Navigate to="/login-as" />;
  }
  return children;
};
