import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { verifySeller } from "../Api/authApi";

const SellerProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    verifySeller()
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false));
  }, []);

  if (authenticated === null) return <div>Loading...</div>;

  if (!authenticated) {
    return <Navigate to="/seller-login" replace />;
    // return "SellerProtectedRoute: Access denied. Please log in as a seller to view this page.";
  }

  return children;
};

export default SellerProtectedRoute;