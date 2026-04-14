import React, { useState, useEffect } from "react";
import {
  FaTachometerAlt,
  FaMobileAlt,
  FaCog,
  FaBars,
  FaUserCircle,
  FaClipboardList,
  FaSignOutAlt,
  FaStore
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { getSellerProfile, logoutSeller } from "../../Api/authApi";

import Dashboard from "../../DashboardComponents/Dashboard/page";
import UploadProduct from "../../DashboardComponents/UploadProducts/page";
import MyListings from "../../DashboardComponents/MyListings/page";
import VerifyCodePage from "../../DashboardComponents/VerifyCode/page";
import logo from "../../assets/logo/logo.png";
import { Link } from "react-router-dom";
import ComingSoon from "../../components/ComingSoon";
import Help from "../../DashboardComponents/Help/page";
import BookDelivery from "../../DashboardComponents/BookDilivery/page";

const SellerDashboard = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [activeMenu, setActiveMenu] = useState(
    localStorage.getItem("activeMenu") || "Dashboard"
  );

  const [storeProfile, setStoreProfile] = useState({
    name: "",
    shopLogo: "",
  });

  const [loading, setLoading] = useState(true);

  // ---------------- FETCH SELLER PROFILE ----------------

  useEffect(() => {
    fetchSellerProfile();
  }, []);

  const fetchSellerProfile = async () => {
    try {
      const res = await getSellerProfile();

      setStoreProfile({
        name: res.data.shopName || res.data.name,
        shopLogo: res.data.logo || "https://i.pravatar.cc/100",
      });

    } catch (error) {
      console.error("Profile fetch failed:", error);

      // token invalid → redirect to login
      navigate("/seller-login");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- LOGOUT ----------------

  const handleLogout = async () => {
    try {
      await logoutSeller();

      localStorage.removeItem("activeMenu");

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Try again.");
    }
  };

  // ---------------- MENU ----------------

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "Upload Products", icon: <FaMobileAlt /> },
    { name: "My Listings", icon: <FaClipboardList /> },
    { name: "Book Delivery", icon: <FaCog /> },
    { name: "Help & Support", icon: <FaCog /> },
  ];

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
    localStorage.setItem("activeMenu", menuName);
    setSidebarOpen(false);
  };

  if (loading) {
    return (
       <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      
      {/* Animated Spinner */}
      <div className="relative mb-6">
        <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
        
        {/* Center Icon */}
        <FaStore className="absolute text-blue-600 text-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Setting up your Seller Dashboard
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-sm mb-4 text-center max-w-md">
        Please wait while we fetch your data, products, and analytics. This will just take a moment.
      </p>

      {/* Progress Bar */}
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600 animate-pulse w-3/4"></div>
      </div>

      {/* Optional Tip */}
      <p className="text-xs text-gray-500 mt-4">
        Tip: You can manage products, orders, and earnings here.
      </p>
    </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">

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

          <div className="flex items-center space-x-2">

           <Link to="" className="flex items-center space-x-2">
       <img src={logo} alt="TechBy Logo" className="h-12 md:h-18" />
        </Link>
          </div>

          <button
            className="text-gray-600 lg:hidden p-2 rounded hover:bg-gray-100"
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
              className={`flex items-center gap-4 cursor-pointer px-4 py-3 rounded-xl transition-all mb-2 hover:bg-green-50 hover:text-green-700 ${
                activeMenu === item.name
                  ? "bg-gradient-to-r from-green-100 to-green-200 text-green-700 font-semibold shadow-md"
                  : "text-gray-700 border border-gray-300"
              }`}
              onClick={() => handleMenuClick(item.name)}
            >

              <span className="text-lg">{item.icon}</span>

              <span>{item.name}</span>

            </div>

          ))}

        </nav>

        {/* Profile */}

        <div className="border-t border-gray-200 p-4 mt-auto bg-gray-50">

          <div className="flex items-center gap-3">

            <img
              src={storeProfile.shopLogo || "https://i.pravatar.cc/100"}
              alt="Profile"
              className="h-12 w-12 rounded-full object-cover border"
            />

            <div className="flex flex-col flex-1">

              <p className="text-sm font-semibold text-gray-800">
                {storeProfile.name}
              </p>

              <button className="flex items-center text-xs text-blue-600 hover:underline mt-1">

                <FaUserCircle className="mr-1" />

                Profile

              </button>

            </div>

          </div>

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="mt-4 w-full px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </aside>

      {/* Main */}

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Navbar */}

        <header className="flex items-center justify-between bg-white shadow px-6 py-6  border-b border-gray-200">

          <div className="flex items-center gap-4">

            {!sidebarOpen && (

              <button
                className="text-gray-600 lg:hidden p-2 rounded hover:bg-gray-100"
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
              src={storeProfile.shopLogo || "https://i.pravatar.cc/100"}
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover border"
            />

          </div>

        </header>

        {/* Page Content */}

        <main className="flex-1 p-6 overflow-auto">

          {activeMenu === "Dashboard" && <Dashboard />}

          {activeMenu === "Upload Products" && <UploadProduct />}

          {activeMenu === "My Listings" && <MyListings />}

          {activeMenu === "Book Delivery" && <BookDelivery />}

          {activeMenu === "Help & Support" && <ComingSoon/>}

        </main>

      </div>

    </div>
  );
};

export default SellerDashboard;