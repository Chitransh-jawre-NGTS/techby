import React from "react";
import {
  MdArrowBack,
  MdKeyboardArrowRight,
} from "react-icons/md";

import {
  FaBoxOpen,
  FaHeadset,
  FaShieldAlt,
  FaInfoCircle,
  FaFileContract,
  FaSignOutAlt,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.png";

const AccountPage = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const menuItems = [
    {
      title: "My Listings",
      icon: <FaBoxOpen />,
      path: "/my-listings",
      protected: true,
    },

    {
      title: "Help & Support",
      icon: <FaHeadset />,
      path: "/support",
    },

    {
      title: "Privacy Policy",
      icon: <FaShieldAlt />,
      path: "/privacy-policy",
    },

    {
      title: "Terms & Conditions",
      icon: <FaFileContract />,
      path: "/terms-condition",
    },

    {
      title: "About Us",
      icon: <FaInfoCircle />,
      path: "/about",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f5f7f6]">

      {/* ================= HEADER ================= */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">

        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">

          {/* BACK */}
          <button
            onClick={() => window.history.back()}
            className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <MdArrowBack className="text-2xl text-gray-700" />
          </button>

          {/* LOGO */}
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="h-12 object-contain"
            />
          </Link>

          <div className="w-11"></div>

        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-md mx-auto pb-32">

        {/* ================= PROFILE CARD ================= */}
        <div className="relative px-4 pt-5">

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-[32px] p-6 shadow-lg overflow-hidden relative">

            {/* BG CIRCLES */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>

            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>

            {user ? (
              <div className="relative z-10">

                <div className="flex flex-col items-center text-center">

                  {/* PROFILE IMAGE */}
                  <div className="relative">

                    <img
                      src={
                        user?.profileImage ||
                        "https://i.pravatar.cc/150"
                      }
                      alt="profile"
                      className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-xl"
                    />

                    <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-300 border-2 border-white rounded-full"></div>
                  </div>

                  {/* NAME */}
                  <h2 className="text-white text-2xl font-bold mt-4">
                    {user?.name}
                  </h2>

                  {/* EMAIL */}
                  <p className="text-green-100 text-sm mt-1 break-all">
                    {user?.email}
                  </p>

                  {/* EDIT BUTTON */}
                  <button
                    onClick={() => navigate("/edit-profile")}
                    className="mt-5 bg-white text-green-600 px-6 py-3 rounded-2xl font-semibold shadow-md hover:scale-105 transition"
                  >
                    Edit Profile
                  </button>

                </div>
              </div>
            ) : (
              <div className="relative z-10 flex flex-col items-center text-center">

                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-4xl text-white">
                  👋
                </div>

                <h2 className="text-white text-3xl font-bold mt-5">
                  Welcome to Techby
                </h2>

                <p className="text-green-100 mt-2 text-sm">
                  Login to manage your listings & account
                </p>

                <button
                  onClick={() => navigate("/login")}
                  className="mt-6 bg-white text-green-600 px-8 py-3 rounded-2xl font-semibold shadow-md"
                >
                  Login / Register
                </button>

              </div>
            )}
          </div>
        </div>

        {/* ================= MENU SECTION ================= */}
        <div className="px-4 mt-6">

          <h3 className="text-gray-800 text-lg font-bold mb-4 px-1">
            Account Settings
          </h3>

          <div className="space-y-4">

            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() =>
                  item.protected && !user
                    ? navigate("/login")
                    : navigate(item.path)
                }
                className="w-full bg-white rounded-3xl px-5 py-5 flex items-center justify-between shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >

                {/* LEFT */}
                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-lg">
                    {item.icon}
                  </div>

                  <div className="text-left">

                    <h4 className="font-semibold text-gray-800">
                      {item.title}
                    </h4>

                    <p className="text-xs text-gray-500 mt-1">
                      Manage your {item.title.toLowerCase()}
                    </p>

                  </div>
                </div>

                {/* RIGHT */}
                <MdKeyboardArrowRight className="text-3xl text-gray-300" />
              </button>
            ))}
          </div>

          {/* ================= LOGOUT ================= */}
          {user && (
            <button
              onClick={handleLogout}
              className="w-full mt-8 bg-red-500 hover:bg-red-600 text-white rounded-3xl py-4 flex items-center justify-center gap-3 font-semibold shadow-lg transition"
            >

              <FaSignOutAlt className="text-lg" />

              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;