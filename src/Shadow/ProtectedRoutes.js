import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { RiderContext } from "./Pages/Contexts/RiderContext";

export const ProtectedRoutes = ({ children }) => {
  const [state, setState] = useState(false);
  const value = useContext(RiderContext);
  const { token } = value;

  if (!state) {
    return <Navigate to="/login-as" />;
  }
  return children;
};
