// import React from "react";
// import { Routes, Route } from "react-router-dom";

// import HeroSection from "../components/HeroSection";
// import FeaturesSection from "../components/FeaturesSection";
// import FeaturedProducts from "../components/FeaturedProducts";
// import ProductDetails from "../components/ProductDetails";

// import Wishlist from "../pages/Wishlist/page";
// import Cart from "../pages/Cart/page";
// import Checkout from "../pages/Checkout/page";
// import BillingPage from "../DashboardComponents/StorePlans/page";
// import ProductsPage from "../components/ProductPage";
// import Home from "../pages/home/page";
// import SearchPage from "../pages/SerchPage/page";
// import SellerDashboard from "../pages/Seller-Dashboard/page";
// import BecomeSeller from "../pages/becomeSeller/page";
// import Orders from "../pages/MyOrders/page";
// import AccountDashboard from "../pages/Accounts/page";
// import AuthPage from "../pages/login/page";
// import SellerLogin from "../pages/sellerLogin/Page";
// import AllProductsPage from "../components/AllProductsPage";
// import AboutUs from "../pages/about/page";
// import GenerateCodePage from "../components/GenrateCodePage";
// import SellerRegisterPage from "../pages/SellerRegister/page";

// const Routing = () => {
//   return (
//     <Routes>
//       {/* Home Page */}
//       <Route
//         path="/"
//         element={
//             <>
//             <Home/>
//           </>
//         }
//       />

//       {/* Products */}
//       <Route path="/products" element={<ProductsPage />} />
//       <Route path="/product/:id" element={<ProductDetails />} />
//       <Route path="/seller-dashboard" element={<SellerDashboard />} />
//       <Route path="/becomeseller" element={<BecomeSeller/>} />
//       <Route path="/account" element={<AccountDashboard/>} />
//       <Route path="/seller-login" element={<SellerLogin/>} />
//        <Route path="/all-products" element={<AllProductsPage/>} />
//       <Route path="/generate-code" element={<GenerateCodePage/>} /> 
//       <Route path="/seller-register" element={<SellerRegisterPage />} /> 

//       {/* Functional Pages */}
//       <Route path="/about" element={<AboutUs />} />
//       {/* <Route path="/login" element={<AuthPage />} /> */}
//       {/* <Route path="/cart" element={<Cart />} /> */}
//       {/* <Route path="/checkout" element={<Checkout />} /> */}
//       {/* <Route path="/billing" element={<BillingPage />} /> */}
//       {/* <Route path="/myorders" element={<Orders />} /> */}
      
// <Route path="/search" element={<SearchPage />} />

//       {/* Fallback */}
//       <Route
//         path="*"
//         element={
//           <div className="flex flex-col items-center justify-center h-[70vh] text-center">
//             <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
//             <p className="text-gray-600 mb-6">Page Not Found</p>
//           </div>
//         }
//       />
//     </Routes>
//   );
// };

// export default Routing;


import React from "react";
import { Routes, Route } from "react-router-dom";

import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import FeaturedProducts from "../components/FeaturedProducts";
import ProductDetails from "../components/ProductDetails";
import ProductsPage from "../components/ProductPage";
import Home from "../pages/home/page";
import SearchPage from "../pages/SerchPage/page";
import SellerDashboard from "../pages/Seller-Dashboard/page";

import AccountDashboard from "../pages/Accounts/page";
import AuthPage from "../pages/login/page";
import SellerLogin from "../pages/sellerLogin/Page";
import AllProductsPage from "../pages/AllProducts/page";
import AboutUs from "../pages/about/page";
import GenerateCodePage from "../components/GenrateCodePage";
import SellerRegisterPage from "../AdminDashboardComponents/SellerRegister/page";
import AdminProtectedRoute from "./AdminProtectedRoutes";
import SellerProtectedRoute from "./StoreRoutes";
import WinnerCheckPage from "../components/WinnerCheckPage";
import AdminDashboard from "../pages/AdminDashboard/page";

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
      <Route path="/seller-register" element={<SellerRegisterPage />} />

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
