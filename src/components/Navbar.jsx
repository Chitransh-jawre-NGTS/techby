import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaUserCircle,
  FaHeart,
  FaComments,
  FaPlus,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
  FaQuestionCircle,
  FaWallet 
} from "react-icons/fa";

import { MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo/logo.png";
import LocationModal from "./LocationModal";
import CategoryBar from "./CategoryBar";

const Navbar = () => {
  const navigate = useNavigate();

  // ================= USER =================
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ================= LOCATION =================
  const [location, setLocation] = useState(
    localStorage.getItem("selectedCity") || "Indore"
  );

  const [showLocationModal, setShowLocationModal] =
    useState(false);

  // ================= WALLET =================
  const [walletCoins] = useState(1250);

  // ================= SEARCH =================
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] =
    useState(false);

  const products = [
    "Mobile",
    "Laptop",
    "PS5",
    "Gaming Console",
    "Car",
    "Bike",
  ];

  const filteredSuggestions = products.filter((p) =>
    p.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setShowProfileMenu(false);

    navigate("/");
  };

  // ================= SEARCH =================
  const handleSearch = (value) => {
    if (value.trim()) {
      navigate(`/search?q=${value}`);

      setSearchTerm("");
      setShowSuggestions(false);
    }
  };

  // ================= LOCATION =================
  const handleLocationChange = (city) => {
    setLocation(city);

    localStorage.setItem("selectedCity", city);

    window.location.reload();
  };

  return (
  <>
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* ================= DESKTOP ================= */}
        <div className="hidden lg:flex items-center justify-between gap-4">
          {/* LOGO */}
          <Link to="/">
            <img src={logo} alt="logo" className="h-14" />
          </Link>

          {/* LOCATION */}
            <button
              onClick={() => setShowLocationModal(true)}
              className="
                flex items-center gap-2
                border border-green-500
                px-4 py-2 rounded-full
                hover:bg-green-50
                transition
              "
            >
              <MapPin
                className="text-green-600"
                size={18}
              />

              <span className="font-medium text-sm">
                {location}
              </span>
            </button>

          {/* SEARCH */}
          <div className="flex-1 relative">
            <div className="flex items-center border-2 border-green-700 rounded-full px-4 py-2">
              <FaSearch
                className="text-gray-400 cursor-pointer"
                onClick={() => handleSearch(searchTerm)}
              />

              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(searchTerm);
                  }
                }}
                className="flex-1 px-3 outline-none"
              />
            </div>

            {/* SEARCH SUGGESTIONS */}
            {showSuggestions && searchTerm && (
              <div className="absolute top-14 bg-white border border-green-400 rounded-xl shadow-xl w-full z-50">
                {filteredSuggestions.map((item) => (
                  <div
                    key={item}
                    onClick={() => handleSearch(item)}
                    className="px-4 py-3 hover:bg-green-50 cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

        {/* RIGHT SIDE */}
<div className="flex items-center gap-5">

  {user && (
    <div
      className="
        flex items-center gap-2
        bg-green-50
        border border-green-300
        px-3 py-1.5
        rounded-full
      "
    >
      <div className="w-7 h-7 rounded-full bg-green-200 flex items-center justify-center">
        <FaWallet className="text-green-700 text-sm" />
      </div>

      <span className="font-bold text-green-700 text-sm">
        {walletCoins}
      </span>
    </div>
  )}


        

            {/* CHAT */}
            <Link to={"/inbox"} className="flex flex-col items-center text-sm">
              <FaComments className="text-xl text-green-700" />
              Chat
            </Link>

            {/* SELL BUTTON */}
            {user && (
              <button
                onClick={() => navigate("/sell")}
                className="
                  flex items-center gap-2
                  hidden md:flex
                  border-[5px]
                  border-green-500
                  px-6 py-2
                  rounded-full
                  font-bold
                  shadow-lg
                  hover:scale-105
                  transition
                "
              >
                <FaPlus />
                SELL
              </button>
            )}

            {/* LOGIN / PROFILE */}
            {!user ? (
              <button
                onClick={() => navigate("/login")}
                className="bg-green-600 text-white px-5 py-2 rounded-full"
              >
                Login
              </button>
            ) : (
              <div className="relative">
                {/* PROFILE BUTTON */}
                <button
                  onClick={() =>
                    setShowProfileMenu(!showProfileMenu)
                  }
                  className="flex items-center gap-2"
                >
                  <FaUserCircle className="text-4xl text-green-700" />
                </button>

                {/* PROFILE MENU */}
                {showProfileMenu && (
                  <div
                    className="
                      absolute right-0 mt-4 w-[340px]
                      bg-white rounded-2xl shadow-xl
                      border border-gray-100 overflow-hidden z-50
                    "
                  >
                    {/* TOP */}
                    <div className="p-5 bg-gradient-to-r from-green-50 to-white border-b">
                      <div className="flex items-center gap-4">
                        <FaUserCircle className="text-5xl text-green-700" />

                        <div className="min-w-0">
                          <h2 className="font-bold text-lg text-gray-800 truncate">
                            {user.name}
                          </h2>

                          <p className="text-sm text-gray-500">
                            Manage your account & listings
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => navigate("/profile")}
                        className="
                          w-full mt-4
                          bg-green-600 hover:bg-green-700
                          text-white py-2.5
                          rounded-xl font-semibold
                          transition
                        "
                      >
                        View Profile
                      </button>
                    </div>

                    {/* MENU */}
                    <div className="py-2">
                      <MenuItem
                        icon={<FaClipboardList />}
                        text="My Listings"
                        onClick={() =>
                          navigate("/my-listings")
                        }
                      />

                      <MenuItem
                        icon={<FaHeart />}
                        text="Wishlist"
                        onClick={() => navigate("/wishlist")}
                      />

                      <MenuItem
                        icon={<FaComments />}
                        text="Messages"
                        onClick={() => navigate("/chat")}
                      />

                      <MenuItem
                        icon={<FaQuestionCircle />}
                        text="Help & Support"
                        onClick={() => navigate("/help")}
                      />

                      <MenuItem
                        icon={<FaCog />}
                        text="Settings"
                        onClick={() => navigate("/settings")}
                      />

                      <div className="my-2 border-t border-gray-100"></div>

                      <MenuItem
                        icon={<FaSignOutAlt />}
                        text="Logout"
                        danger
                        onClick={handleLogout}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="lg:hidden flex flex-col">
          {/* TOP */}
          <div className="flex items-center justify-between">
            <Link to="/">
              <img src={logo} alt="logo" className="h-10" />
            </Link>

            <div className="flex items-center gap-3">
               {/* LOCATION */}
            <button
              onClick={() => setShowLocationModal(true)}
              className="flex items-center gap-1 border px-3 py-2 rounded-full"
            >
              <MapPin
                className="text-green-600"
                size={18}
              />

              <span className="text-xs">
                {location}
              </span>
            </button>
             

          
            </div>
          </div>

          {/* SEARCH */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex-1 flex items-center border-2 border-green-700 rounded-full px-3 py-2">
              <FaSearch className="text-gray-400" />

              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className="flex-1 px-2 outline-none text-sm"
              />
            </div>
             

{/* WALLET */}
<div
  className="
    flex items-center gap-2
    bg-green-50
    border border-green-300
    px-3 py-1.5
    rounded-full
  "
>
  <div className="w-7 h-7 rounded-full bg-green-200 flex items-center justify-center">
    <FaWallet className="text-green-700 text-sm" />
  </div>

  <span className="font-bold text-green-700 text-sm">
    {walletCoins}
  </span>
</div>
           
          </div>
        </div>
      </div>

      {/* LOCATION MODAL */}
      <LocationModal
        open={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        selectedCity={location}
        onSelectCity={handleLocationChange}
      />
    </header>
    <CategoryBar/>
    </>
  );
};

/* ================= MENU ITEM ================= */
const MenuItem = ({
  icon,
  text,
  onClick,
  danger,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        flex
        items-center
        gap-4
        px-5
        py-3
        hover:bg-gray-100
        transition

        ${danger ? "text-red-500" : "text-gray-700"}
      `}
    >
      <span className="text-lg">{icon}</span>

      <span className="font-medium">
        {text}
      </span>
    </button>
  );
};

export default Navbar;




























































































// import React, { useState, useEffect } from "react";

// import {
//   FaSearch,
//   FaUserCircle,
// } from "react-icons/fa";

// import { MapPin } from "lucide-react";

// import { useNavigate, useLocation } from "react-router-dom";

// import logo from "../assets/logo/logo.png";

// import LoginModal from "../pages/UserLogin/page";

// const Navbar = () => {
//   const navigate = useNavigate();

//   const locationPath = useLocation();

//   // LOGIN MODAL
//   const [showLoginModal, setShowLoginModal] =
//     useState(false);

//   // USER
//   const [user, setUser] = useState(null);

//   const [showProfileMenu, setShowProfileMenu] =
//     useState(false);

//   // LOCATION
//   const [location, setLocation] = useState(
//     localStorage.getItem("selectedCity") ||
//       "Indore"
//   );

//   const [showLocationList, setShowLocationList] =
//     useState(false);

//   // SEARCH
//   const [searchTerm, setSearchTerm] =
//     useState("");

//   const [showSuggestions, setShowSuggestions] =
//     useState(false);

//   // PLACEHOLDER
//   const [placeholderIndex, setPlaceholderIndex] =
//     useState(0);

//   const placeholders = [
//     "Search for mobiles",
//     "Search for laptops",
//     "Search for sellers",
//     "Search for gaming consoles",
//     "Search for tablets",
//     "Search for accessories",
//   ];

//   // PRODUCTS
//   const products = [
//     "Mobile",
//     "Laptop",
//     "PS",
//     "Gaming Console",
//     "CD",
//     "Headphones",
//     "Watch",
//   ];

//   const cities = ["Indore"];

//   // ACTIVE TAB
//   const isCommunityActive =
//     locationPath.pathname.includes(
//       "/community"
//     );

// const isDealerActive =
//   locationPath.pathname === "/";
//   // GET USER
//   useEffect(() => {
//     const storedUser =
//       localStorage.getItem("user");

//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   // PLACEHOLDER ANIMATION
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPlaceholderIndex((prev) =>
//         prev === placeholders.length - 1
//           ? 0
//           : prev + 1
//       );
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   // SEARCH
//   const handleSearch = (e) => {
//     e.preventDefault();

//     if (searchTerm.trim()) {
//       navigate(`/search?q=${searchTerm}`);

//       setSearchTerm("");

//       setShowSuggestions(false);
//     }
//   };

//   // LOCATION
//   const handleLocationChange = (city) => {
//     setLocation(city);

//     localStorage.setItem(
//       "selectedCity",
//       city
//     );

//     setShowLocationList(false);

//     window.location.reload();
//   };

//   // LOGOUT
//   const handleLogout = () => {
//     localStorage.removeItem("token");

//     localStorage.removeItem("user");

//     setUser(null);

//     navigate("/");
//   };

//   // FILTER SEARCH
//   const filteredSuggestions =
//     products.filter((p) =>
//       p
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//     );

//   return (
//     <>
//       <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">

//         {/* TOP NAVBAR */}
//         <div className="max-w-7xl mx-auto px-3 py-2">

//           {/* MOBILE TOP SECTION */}
//           <div className="flex lg:hidden items-center gap-3">

//             {/* COMMUNITY LOGO BUTTON */}
//             <button
//               onClick={() =>
//                 navigate(
//                   "/community-products"
//                 )
//               }
//               className={`flex-1 rounded-2xl py-2 px-3 flex flex-col items-center justify-center transition-all ${
//                 isCommunityActive
//                   ? "bg-yellow-400"
//                   : "bg-gray-100"
//               }`}
//             >
//               <img
//                 src={logo}
//                 alt="community"
//                 className="h-7 object-contain"
//               />

//               <span className="text-sm font-bold text-gray-800">
//                 Community
//               </span>
//             </button>

//             {/* DEALERS BUTTON */}
//             <button
//               onClick={() =>
//                 navigate("/dealers")
//               }
//               className={`flex-1 rounded-2xl py-2 px-3 flex flex-col items-center justify-center transition-all ${
//                 isDealerActive
//                   ? "bg-orange-100 border border-orange-400"
//                   : "bg-gray-100"
//               }`}
//             >
//               <span className="text-2xl">
//                 ✈️
//               </span>

//               <span className="text-sm font-bold text-gray-800">
//                 Dealers
//               </span>
//             </button>

//           </div>

//           {/* DESKTOP NAVBAR */}
//           <div className="hidden lg:flex items-center justify-between">

//             {/* LOGO */}
//             <div
//               onClick={() =>
//                 navigate("/")
//               }
//               className="flex items-center cursor-pointer"
//             >
//               <img
//                 src={logo}
//                 alt="TechBy Logo"
//                 className="h-12"
//               />
//             </div>

//             {/* SEARCH */}
//             <div className="flex-1 flex justify-center relative mx-6">

//               <form
//                 onSubmit={handleSearch}
//                 className="w-full max-w-xl"
//                 autoComplete="off"
//               >

//                 <div className="flex items-center border border-green-400 rounded-full overflow-hidden bg-white">

//                   <div
//                     className="pl-3 text-gray-400 cursor-pointer"
//                     onClick={handleSearch}
//                   >
//                     <FaSearch />
//                   </div>

//                   <input
//                     type="text"
//                     placeholder={
//                       placeholders[
//                         placeholderIndex
//                       ]
//                     }
//                     value={searchTerm}
//                     onChange={(e) => {
//                       setSearchTerm(
//                         e.target.value
//                       );

//                       setShowSuggestions(
//                         true
//                       );
//                     }}
//                     className="flex-1 px-3 py-2 focus:outline-none text-gray-700"
//                   />

//                 </div>

//                 {/* SEARCH SUGGESTIONS */}
//                 {showSuggestions &&
//                   searchTerm &&
//                   filteredSuggestions.length >
//                     0 && (
//                     <div className="absolute w-full top-12 left-0 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">

//                       {filteredSuggestions.map(
//                         (item) => (
//                           <div
//                             key={item}
//                             className="px-4 py-3 hover:bg-green-50 cursor-pointer"
//                             onClick={() => {
//                               setSearchTerm(
//                                 item
//                               );

//                               navigate(
//                                 `/search?q=${item}`
//                               );

//                               setShowSuggestions(
//                                 false
//                               );
//                             }}
//                           >
//                             {item}
//                           </div>
//                         )
//                       )}

//                     </div>
//                   )}

//               </form>

//             </div>

//             {/* RIGHT SIDE */}
//             <div className="flex items-center gap-3">

//               {/* COMMUNITY BUTTON */}
//               <button
//                 onClick={() =>
//                   navigate(
//                     "/community-products"
//                   )
//                 }
//                 className={`px-5 py-2 rounded-full transition text-sm font-semibold ${
//                   isCommunityActive
//                     ? "bg-green-600 text-white"
//                     : "border border-gray-300 hover:border-green-600 hover:text-green-600"
//                 }`}
//               >
//                 Community
//               </button>

//               {/* DEALERS BUTTON */}
//               <button
//                 onClick={() =>
//                   navigate("/")
//                 }
//                 className={`px-5 py-2 rounded-full transition text-sm font-semibold ${
//                   isDealerActive
//                     ? "bg-blue-600 text-white"
//                     : "border border-gray-300 hover:border-blue-600 hover:text-blue-600"
//                 }`}
//               >
//                 Dealers
//               </button>

//               {/* LOCATION */}
//               <div className="relative">

//                 <button
//                   onClick={() =>
//                     setShowLocationList(
//                       !showLocationList
//                     )
//                   }
//                   className="flex items-center border border-gray-300 px-4 py-2 rounded-full hover:border-green-600 transition"
//                 >

//                   <MapPin
//                     className="text-green-600 mr-1"
//                     size={18}
//                   />

//                   <span className="text-sm font-medium">
//                     {location}
//                   </span>

//                 </button>

//                 {/* LOCATION DROPDOWN */}
//                 {showLocationList && (
//                   <div className="absolute right-0 mt-2 bg-white border rounded-xl shadow-lg z-50 w-52 overflow-hidden">

//                     {cities.map((city) => (
//                       <div
//                         key={city}
//                         onClick={() =>
//                           handleLocationChange(
//                             city
//                           )
//                         }
//                         className={`px-4 py-3 hover:bg-green-50 cursor-pointer ${
//                           location === city
//                             ? "bg-green-100 font-semibold"
//                             : ""
//                         }`}
//                       >
//                         {city}
//                       </div>
//                     ))}

//                   </div>
//                 )}

//               </div>

//               {/* LOGIN / PROFILE */}
//               {!user ? (
//                 <button
//                   onClick={() =>
//                     setShowLoginModal(true)
//                   }
//                   className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full transition font-medium shadow-sm"
//                 >
//                   Login
//                 </button>
//               ) : (
//                 <div className="relative">

//                   <button
//                     onClick={() =>
//                       setShowProfileMenu(
//                         !showProfileMenu
//                       )
//                     }
//                     className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full hover:border-green-600 transition"
//                   >

//                     <FaUserCircle
//                       size={24}
//                       className="text-green-600"
//                     />

//                     <span className="font-medium text-sm">
//                       {user.name}
//                     </span>

//                   </button>

//                   {/* PROFILE MENU */}
//                   {showProfileMenu && (
//                     <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border overflow-hidden z-50">

//                       <div className="px-4 py-4 border-b">

//                         <p className="font-semibold text-gray-800">
//                           {user.name}
//                         </p>

//                         <p className="text-sm text-gray-500">
//                           {user.email}
//                         </p>

//                       </div>

//                       <button
//                         onClick={() =>
//                           navigate(
//                             "/profile"
//                           )
//                         }
//                         className="w-full text-left px-4 py-3 hover:bg-green-50"
//                       >
//                         My Profile
//                       </button>

//                       <button
//                         onClick={() =>
//                           navigate(
//                             "/community-products"
//                           )
//                         }
//                         className="w-full text-left px-4 py-3 hover:bg-green-50"
//                       >
//                         My Products
//                       </button>

//                       <button
//                         onClick={handleLogout}
//                         className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50"
//                       >
//                         Logout
//                       </button>

//                     </div>
//                   )}

//                 </div>
//               )}

//             </div>
//           </div>
//         </div>

//         {/* MOBILE SEARCH */}
//         <div className="block lg:hidden px-3 pb-3 relative">

//           <form
//             onSubmit={handleSearch}
//             autoComplete="off"
//           >

//             <div className="flex items-center border border-gray-300 rounded-full bg-white">

//               <div
//                 className="pl-3 text-gray-400 cursor-pointer"
//                 onClick={handleSearch}
//               >
//                 <FaSearch />
//               </div>

//               <input
//                 type="text"
//                 placeholder={
//                   placeholders[
//                     placeholderIndex
//                   ]
//                 }
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(
//                     e.target.value
//                   );

//                   setShowSuggestions(
//                     true
//                   );
//                 }}
//                 className="flex-1 px-3 py-2 focus:outline-none"
//               />

//             </div>

//             {/* MOBILE SUGGESTIONS */}
//             {showSuggestions &&
//               searchTerm &&
//               filteredSuggestions.length >
//                 0 && (
//                 <div className="absolute top-14 left-0 right-0 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">

//                   {filteredSuggestions.map(
//                     (item) => (
//                       <div
//                         key={item}
//                         className="px-4 py-3 hover:bg-green-50 cursor-pointer"
//                         onClick={() => {
//                           setSearchTerm(item);

//                           navigate(
//                             `/search?q=${item}`
//                           );

//                           setShowSuggestions(
//                             false
//                           );
//                         }}
//                       >
//                         {item}
//                       </div>
//                     )
//                   )}

//                 </div>
//               )}

//           </form>

//         </div>
//       </header>

//       {/* LOGIN MODAL */}
//       <LoginModal
//         isOpen={showLoginModal}
//         onClose={() =>
//           setShowLoginModal(false)
//         }
//       />
//     </>
//   );
// };

// export default Navbar;