import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactElement;
  role?: string;
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("usuario") || "null");

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    } else if (role && user.role !== role) {
      navigate("/", { replace: true });
    }
  }, [user, role, navigate]);

  if (!user || (role && user.role !== role)) {
    return null; 
  }

  return children;
};

export default ProtectedRoute;
