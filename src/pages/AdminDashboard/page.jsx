import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaMobileAlt,
  FaBars,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

import Dashboard from "../../DashboardComponents/Dashboard/page";
import SellerRegisterPage from "../../AdminDashboardComponents/SellerRegister/page";

import logo from "../../assets/logo/logo.png";
import AllSellers from "../../AdminDashboardComponents/Allsellers/page";
import ComingSoon from "../../components/ComingSoon";
import AdminDeliveryPage from "../../AdminDashboardComponents/AcceptDilivery/page";
import AdminDashboard from "../../AdminDashboardComponents/Dashboard/page";
import AdminPayments from "../../AdminDashboardComponents/Admin Payment Approval page/page";

const SellerDashboard = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [activeMenu, setActiveMenu] = useState(
    localStorage.getItem("activeMenu") || "Dashboard"
  );

  const storeProfile = {
    name: "Chitransh jawre",
    shopLogo: "https://i.pravatar.cc/100",
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "Register Seller", icon: <FaMobileAlt /> },
    { name: "All Sellers", icon: <FaMobileAlt /> },
    { name: "Accept Payment", icon: <FaMobileAlt /> },
    { name: "Delivery Orders", icon: <FaMobileAlt /> },
  ];

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
    localStorage.setItem("activeMenu", menuName);
    setSidebarOpen(false);
  };

const handleLogout = () => {
  // Remove active menu
  localStorage.removeItem("activeMenu");

  // Remove auth token
  localStorage.removeItem("adminToken"); // <-- change this to whatever key you use for the token

  // Redirect to home or login page
  navigate("/");
};

  return (
    <div className="flex h-screen bg-red-50 overflow-hidden font-sans">

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden bg-black bg-opacity-30 transition-opacity ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 h-full bg-white text-gray-800 flex flex-col transition-transform duration-300
        w-64 shadow-xl
        transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } 
        lg:relative lg:translate-x-0 lg:w-64`}
      >

        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="TechBy Logo" className="h-12 md:h-16" />
          </Link>

          <button
            className="text-gray-600 lg:hidden p-2 rounded hover:bg-red-50"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars />
          </button>
        </div>

        {/* Menu */}
        <nav className="mt-8 flex-1 flex flex-col px-2">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className={`flex items-center gap-4 cursor-pointer px-4 py-3 rounded-xl transition-all mb-2 hover:bg-red-50 hover:text-red-700 ${
                activeMenu === item.name
                  ? "bg-gradient-to-r from-red-100 to-red-200 text-red-700 font-semibold shadow-md"
                  : "text-gray-700 border border-gray-200"
              }`}
              onClick={() => handleMenuClick(item.name)}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </nav>

        {/* Profile */}
        <div className="border-t border-gray-200 p-4 mt-auto bg-red-50">

          <div className="flex items-center gap-3">

            <img
              src={storeProfile.shopLogo}
              alt="Profile"
              className="h-12 w-12 rounded-full object-cover border"
            />

            <div className="flex flex-col flex-1">

              <p className="text-sm font-semibold text-gray-800">
                {storeProfile.name}
              </p>

              <button className="flex items-center text-xs text-red-600 hover:underline mt-1">
                <FaUserCircle className="mr-1" />
                Profile
              </button>

            </div>

          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="mt-4 w-full px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white shadow px-6 py-6 border-b border-gray-200">

          <div className="flex items-center gap-4">

            {!sidebarOpen && (
              <button
                className="text-gray-600 lg:hidden p-2 rounded hover:bg-red-50"
                onClick={() => setSidebarOpen(true)}
              >
                <FaBars />
              </button>
            )}

            <h1 className="text-xl font-semibold text-gray-800">
              {activeMenu}
            </h1>

          </div>

          <div className="flex items-center gap-4">

            <span className="text-gray-600 hidden md:block font-medium">
              {storeProfile.name}
            </span>

            <img
              src={storeProfile.shopLogo}
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover border"
            />

          </div>

        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">

          {activeMenu === "Dashboard" && <AdminDashboard />}

          {activeMenu === "Register Seller" && <SellerRegisterPage />}
          {activeMenu === "Delivery Orders" && <AdminDeliveryPage />}
          {activeMenu === "All Sellers" && <AllSellers />}
          {activeMenu === "Accept Payment" && <AdminPayments />}
        </main>

      </div>

    </div>
  );
};

export default SellerDashboard;