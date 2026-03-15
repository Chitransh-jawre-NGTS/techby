import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("adminToken") || "{}");

    if (stored.token && Date.now() < stored.expiry) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  if (authenticated === null) return <div>Loading...</div>;

  if (!authenticated) return <Navigate to="/seller-login" replace />;

  return children;
};

export default AdminProtectedRoute;