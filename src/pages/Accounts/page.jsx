// ================= IMPORTS =================
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

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import logo from "../../assets/logo/logo.png";
import { logoutUser } from "../../store/slices/userSlice";

const AccountPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  // ================= MENU =================
  const menuItems = [
    { title: "My Listings", icon: <FaBoxOpen />, path: "/my-listings", protected: true },
    { title: "Help & Support", icon: <FaHeadset />, path: "/support" },
    { title: "Privacy Policy", icon: <FaShieldAlt />, path: "/privacy-policy" },
    { title: "Refer & Earn", icon: <FaShieldAlt />, path: "/refer-earn" },
    { title: "Terms & Conditions", icon: <FaFileContract />, path: "/terms-condition" },
    { title: "About Us", icon: <FaInfoCircle />, path: "/about" },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">

      {/* ================= HEADER ================= */}
      <div className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">

          <button
            onClick={() => window.history.back()}
            className="w-11 h-11 rounded-2xl bg-white shadow-md flex items-center justify-center border border-gray-100 hover:scale-105 transition"
          >
            <MdArrowBack className="text-2xl text-gray-700" />
          </button>

          <div className="flex flex-col items-center">
            <img src={logo} alt="logo" className="h-10" />
            <span className="text-[11px] text-gray-400 -mt-1">
              Account
            </span>
          </div>

          <div className="w-11 h-11" />
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-md mx-auto pb-28">

        {/* ================= PROFILE ================= */}
        <div className="px-4 pt-6">

          <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 shadow-xl p-6">

            <div className="absolute -top-10 -right-10 w-52 h-52 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

            {user ? (
              <>
                {/* PROFILE CARD */}
                <div className="relative z-10 flex items-center gap-6">

                  {/* IMAGE */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={user?.profileImage || "https://i.pravatar.cc/150"}
                      onError={(e) => {
                        e.target.src = "https://i.pravatar.cc/150";
                      }}
                      className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
                      alt="profile"
                    />

                    <div className="absolute bottom-2 right-2 w-5 h-5 bg-lime-400 border-2 border-white rounded-full"></div>
                  </div>

                  {/* DETAILS */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-white text-2xl font-bold truncate">
                      {user?.name || "User"}
                    </h2>

                    <p className="text-green-100 text-sm mt-1 break-all">
                      {user?.email || "No email"}
                    </p>

                    <div className="mt-3 inline-flex items-center bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white font-semibold border border-white/20">
                      🪙 {user?.coins ?? 0} Coins
                    </div>
                  </div>

                </div>

                {/* BUTTON */}
                <div className="mt-6">
                  <button
                    onClick={() => navigate("/edit-profile")}
                    className="w-full bg-white text-green-600 px-6 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition"
                  >
                    Edit Profile
                  </button>
                </div>
              </>
            ) : (
              <div className="relative z-10 flex flex-col items-center text-center py-6">

                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-4xl">
                  👋
                </div>

                <h2 className="text-white text-2xl font-bold mt-4">
                  Welcome to Techby
                </h2>

                <p className="text-green-100 text-xs mt-2">
                  Login to manage your account
                </p>

                <button
                  onClick={() => navigate("/login")}
                  className="mt-5 bg-white text-green-600 px-7 py-3 rounded-2xl font-bold shadow-md"
                >
                  Login / Register
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ================= MENU ================= */}
        <div className="px-4 mt-6">

          <h3 className="text-gray-800 text-lg font-bold mb-4 px-1">
            Account Settings
          </h3>

          <div className="space-y-4">

            {menuItems.map((item, i) => (
              <button
                key={i}
                onClick={() =>
                  item.protected && !user
                    ? navigate("/login")
                    : navigate(item.path || "/")
                }
                className="w-full bg-white rounded-3xl px-5 py-5 flex items-center justify-between shadow-sm border border-gray-100 hover:shadow-md transition"
              >

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

                <MdKeyboardArrowRight className="text-3xl text-gray-300" />
              </button>
            ))}
          </div>

          {/* LOGOUT */}
          {user && (
            <button
              onClick={handleLogout}
              className="w-full mt-8 bg-red-500 hover:bg-red-600 text-white rounded-3xl py-4 flex items-center justify-center gap-3 font-semibold shadow-lg"
            >
              <FaSignOutAlt />
              Logout
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default AccountPage;