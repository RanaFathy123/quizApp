import React from "react";
import { Navigate } from "react-router-dom";
// Adjust the import path based on your project structure
import { ReactNode } from "react";

import { useSelector } from "react-redux";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { loginData } = useSelector((state: any) => state.login);

  if (localStorage.getItem("token") || loginData) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
