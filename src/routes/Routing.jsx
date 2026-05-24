import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "../components/ProductDetails";
import Home from "../pages/home/page";
import SearchPage from "../pages/SerchPage/page";
import SellerDashboard from "../pages/Seller-Dashboard/page";
import AccountDashboard from "../pages/Accounts/page";
import SellerLogin from "../pages/sellerLogin/Page";
import AllProductsPage from "../pages/AllProducts/page";
import AboutUs from "../pages/Account pages/About";
import AdminProtectedRoute from "./AdminProtectedRoutes";
import SellerProtectedRoute from "./StoreRoutes";
import AdminDashboard from "../pages/AdminDashboard/page";
import AdminLogin from "../pages/AdminLogin/page";
import PricingPage from "../components/Pricing";
import BlogPage from "../components/Blog";
import UserLoginPage from "../pages/UserLogin/page";
import SellPage from "../pages/sell/page";
import MyListingsPage from "../pages/MyListing/page";
import InboxPage from "../pages/chat/dextop/page";
import ChatPage from "../pages/chat/dextop/Chat";
import TermsCondition from "../pages/Account pages/TermsCondition";
import PrivacyPolicy from "../pages/Account pages/PrivacyPolicy";
import WalletJackpotPage from "../components/WalletJackpotPage";
import ReferEarnPage from "../components/ReferEarn";
import ProfilePage from "../pages/Account pages/Profile";


const Routing = () => {
  return (
    <Routes>

      {/* Home */}
      <Route path="/" element={<Home />} />
       <Route path="/jackpot" element={<WalletJackpotPage />} />

      {/* Products */}
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/all-products" element={<AllProductsPage />} />
  
      <Route path="/sell" element={<SellPage/>} />


      <Route path="/login" element={<UserLoginPage/>} />
      <Route path="/my-listings" element={<MyListingsPage/>} />
      <Route path="/chat" element={<InboxPage/>} />
      {/* <Route path="/chat" element={<ChatPage/>} /> */}
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


      <Route path="/blogs" element={<BlogPage />} />
        {/* <Route path="/blogs/:id" element={<BlogsPage />} /> */}

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
       <Route path="/price" element={<PricingPage/>} />
       <Route path="/profile" element={<ProfilePage/>} />
       <Route path="/refer-earn" element={<ReferEarnPage />} />
      <Route path="/terms-condition" element={<TermsCondition />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/search" element={<SearchPage />} />


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
