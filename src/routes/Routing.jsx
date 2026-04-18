import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "../components/ProductDetails";
import Home from "../pages/home/page";
import SearchPage from "../pages/SerchPage/page";
import SellerDashboard from "../pages/Seller-Dashboard/page";
import AccountDashboard from "../pages/Accounts/page";
import SellerLogin from "../pages/sellerLogin/Page";
import AllProductsPage from "../pages/AllProducts/page";
import AboutUs from "../pages/about/page";
import GenerateCodePage from "../components/GenrateCodePage";
import AdminProtectedRoute from "./AdminProtectedRoutes";
import SellerProtectedRoute from "./StoreRoutes";
import WinnerCheckPage from "../components/WinnerCheckPage";
import AdminDashboard from "../pages/AdminDashboard/page";
import BecomeSeller from "../components/BecomeSeller";
import AdminLogin from "../pages/AdminLogin/page";
import PricingPage from "../components/Pricing";

const Routing = () => {
  return (
    <Routes>

      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Products */}
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/all-products" element={<AllProductsPage />} />
      <Route path="/winner-check" element={<WinnerCheckPage />} />

      <Route
          path="/admin-dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />


      {/* Seller Auth */}
      <Route path="/seller-login" element={<SellerLogin />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/pricing" element={<PricingPage />} />
      {/* <Route path="/seller-register" element={<SellerRegisterPage />} /> */}

      {/* Seller Protected Routes */}
      <Route
        path="/seller-dashboard"
        element={
          <SellerProtectedRoute>
            <SellerDashboard />
          </SellerProtectedRoute>
        }
      />

      {/* Other Pages */}
      {/* <Route path="/becomeseller" element={<BecomeSeller />} /> */}
      <Route path="/account" element={<AccountDashboard />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/generate-code" element={<GenerateCodePage />} />


      {/* 404 Page */}
      <Route
        path="*"
        element={
          <div className="flex flex-col items-center justify-center h-[70vh] text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-gray-600 mb-6">Page Not Found</p>
          </div>
        }
      />

    </Routes>
  );
};

export default Routing;
