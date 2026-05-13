// import React, { useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import { MapPin } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../assets/logo/logo.png";

// const Navbar = () => {
//   const navigate = useNavigate();

//   const [location, setLocation] = useState("Indore");
//   const [showLocationList, setShowLocationList] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showSuggestions, setShowSuggestions] = useState(false);

//   const products = ["Mobile", "Laptop", "PS", "Gaming Console", "CD", "Headphones", "Watch"];

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       navigate(`/search?q=${searchTerm}`);
//       setSearchTerm("");
//       setShowSuggestions(false);
//     }
//   };

//   const filteredSuggestions = products.filter((p) =>
//     p.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
//       <div className="flex items-center max-w-7xl mx-auto justify-between px-4 py-3">

//         {/* Logo */}
//         <Link to="/" className="flex items-center space-x-2">
//        <img src={logo} alt="TechBy Logo" className="h-12 md:h-18" />
//         </Link>

//         {/* Location Button */}
//         <div className="relative">
//           <button
//             type="button"
//             onClick={() => setShowLocationList(!showLocationList)}
//             className="flex items-center  border border-gray-300 px-3 py-2 rounded-full hover:border-green-600 transition"
//           >
//             <MapPin className="text-green-600 mr-1" size={18} />
//             <span className="font-medium text-gray-700 text-sm">{location}</span>
//           </button>
//         </div>

//         {/* Desktop Search */}
//         <div className="hidden lg:flex flex-1 justify-center relative mx-6">
//           <form
//             onSubmit={handleSearch}
//             className="w-full max-w-xl"
//             autoComplete="off"
//           >
//             <div className="flex items-center border border-gray-400 rounded-full overflow-hidden">
//               <div
//                 className="pl-3 text-gray-400 cursor-pointer"
//                 onClick={handleSearch}
//               >
//                 <FaSearch />
//               </div>

//               <input
//                 type="text"
//                 placeholder="Search for products"
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   setShowSuggestions(true);
//                 }}
//                 className="flex-1 px-3 py-2 focus:outline-none text-gray-700"
//               />
//             </div>

//             {showSuggestions && searchTerm && filteredSuggestions.length > 0 && (
//               <div className="absolute w-150 top-12 left-20 right-0 bg-white border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
//                 {filteredSuggestions.map((item) => (
//                   <div
//                     key={item}
//                     className="px-4 py-2 hover:bg-green-50 cursor-pointer"
//                     onClick={() => {
//                       setSearchTerm(item);
//                       navigate(`/search?q=${item}`);
//                       setShowSuggestions(false);
//                     }}
//                   >
//                     {item}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </form>
//         </div>

//         {/* App Store Badges */}
//         <div className="hidden lg:flex items-center gap-4">
//           <div className="flex gap-3">
//             {/* Apple Store */}
//             <div className="relative">
//               <img
//                 src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
//                 alt="App Store"
//                 className="h-10 opacity-60"
//               />
//               <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white bg-black/60 rounded">
//                 Coming Soon
//               </span>
//             </div>

//             {/* Play Store */}
//             <div className="relative">
//               <img
//                 src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
//                 alt="Play Store"
//                 className="h-10 opacity-60"
//               />
//               <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white bg-black/60 rounded">
//                 Coming Soon
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Search */}
//       <div className="block lg:hidden px-4 pb-2 relative">
//         <form onSubmit={handleSearch} autoComplete="off">
//           <div className="flex items-center border border-gray-300 rounded-full">
//             <div
//               className="pl-3 text-gray-400 cursor-pointer"
//               onClick={handleSearch}
//             >
//               <FaSearch />
//             </div>

//             <input
//               type="text"
//               placeholder="Search for products"
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setShowSuggestions(true);
//               }}
//               className="flex-1 px-3 py-2 focus:outline-none"
//             />
//           </div>

//           {showSuggestions && searchTerm && filteredSuggestions.length > 0 && (
//             <div className="absolute top-14 left-0 right-0 bg-white border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
//               {filteredSuggestions.map((item) => (
//                 <div
//                   key={item}
//                   className="px-4 py-2 hover:bg-green-50 cursor-pointer"
//                   onClick={() => {
//                     setSearchTerm(item);
//                     navigate(`/search?q=${item}`);
//                     setShowSuggestions(false);
//                   }}
//                 >
//                   {item}
//                 </div>
//               ))}
//             </div>
//           )}
//         </form>
//       </div>
//     </header>
//   );
// };

// export default Navbar;















import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const [location, setLocation] = useState(
    localStorage.getItem("selectedCity") || "Indore"
  );

  const [showLocationList, setShowLocationList] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Animated Placeholder State
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const placeholders = [
    "Search for mobiles",
    "Search for laptops",
    "Search for sellers",
    "Search for gaming consoles",
    "Search for tablets",
    "Search for accessories",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) =>
        prev === placeholders.length - 1 ? 0 : prev + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const products = [
    "Mobile",
    "Laptop",
    "PS",
    "Gaming Console",
    "CD",
    "Headphones",
    "Watch",
  ];

  const handleLocationChange = (city) => {
    setLocation(city);
    localStorage.setItem("selectedCity", city);
    setShowLocationList(false);
    window.location.reload();
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
      setSearchTerm("");
      setShowSuggestions(false);
    }
  };

  const filteredSuggestions = products.filter((p) =>
    p.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cities = ["Indore"];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">

      <div className="flex items-center max-w-7xl mx-auto justify-between px-4 py-3">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="TechBy Logo" className="h-12 md:h-18" />
        </Link>

        {/* Location */}
        <div className="relative">

          <button
            type="button"
            onClick={() => setShowLocationList(!showLocationList)}
            className="flex items-center justify-between w-full sm:w-auto border border-gray-300 px-3 py-2 rounded-full hover:border-green-600 transition"
          >
            <MapPin className="text-green-600 mr-1" size={18} />

            <span className="font-medium text-gray-700 text-sm">
              {location}
            </span>

            <span className="ml-2 text-gray-500">
              &#9662;
            </span>
          </button>

          {/* Location Dropdown */}
          {showLocationList && (
            <div
              className={`
                absolute mt-2 bg-white border rounded-lg shadow-lg z-50
                w-36 sm:w-56 md:w-60
                ${
                  window.innerWidth < 640
                    ? "left-1/2 -translate-x-1/2"
                    : "left-0"
                }
              `}
            >

              {cities.map((city) => (
                <div
                  key={city}
                  onClick={() => handleLocationChange(city)}
                  className={`px-4 py-2 cursor-pointer hover:bg-green-50 ${
                    location === city
                      ? "bg-green-100 font-semibold"
                      : ""
                  }`}
                >
                  {city}
                </div>
              ))}

            </div>
          )}

        </div>

        {/* Desktop Search */}
        <div className="hidden lg:flex flex-1 justify-center relative mx-6">

          <form
            onSubmit={handleSearch}
            className="w-full max-w-xl"
            autoComplete="off"
          >

            <div className="flex items-center border border-gray-400 rounded-full overflow-hidden">

              <div
                className="pl-3 text-gray-400 cursor-pointer"
                onClick={handleSearch}
              >
                <FaSearch />
              </div>

              <input
                type="text"
                placeholder={placeholders[placeholderIndex]}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                }}
                className="flex-1 px-3 py-2 focus:outline-none text-gray-700"
              />

            </div>

            {/* Suggestions */}
            {showSuggestions &&
              searchTerm &&
              filteredSuggestions.length > 0 && (
                <div className="absolute w-full top-12 left-0 bg-white border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">

                  {filteredSuggestions.map((item) => (
                    <div
                      key={item}
                      className="px-4 py-2 hover:bg-green-50 cursor-pointer"
                      onClick={() => {
                        setSearchTerm(item);
                        navigate(`/search?q=${item}`);
                        setShowSuggestions(false);
                      }}
                    >
                      {item}
                    </div>
                  ))}

                </div>
              )}

          </form>

        </div>

        {/* App Store Badges */}
        <div className="hidden lg:flex items-center gap-4">

          <div className="flex gap-3">

            {/* Apple Store */}
            <div className="relative">

              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="h-10 opacity-60"
              />

              <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white bg-black/60 rounded">
                Coming Soon
              </span>

            </div>

            {/* Play Store */}
            <div className="relative">

              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Play Store"
                className="h-10 opacity-60"
              />

              <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white bg-black/60 rounded">
                Coming Soon
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Mobile Search */}
      <div className="block lg:hidden px-4 pb-2 relative">

        <form onSubmit={handleSearch} autoComplete="off">

          <div className="flex items-center border border-gray-300 rounded-full">

            <div
              className="pl-3 text-gray-400 cursor-pointer"
              onClick={handleSearch}
            >
              <FaSearch />
            </div>

            <input
              type="text"
              placeholder={placeholders[placeholderIndex]}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              className="flex-1 px-3 py-2 focus:outline-none"
            />

          </div>

          {/* Suggestions */}
          {showSuggestions &&
            searchTerm &&
            filteredSuggestions.length > 0 && (
              <div className="absolute top-14 left-0 right-0 bg-white border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">

                {filteredSuggestions.map((item) => (
                  <div
                    key={item}
                    className="px-4 py-2 hover:bg-green-50 cursor-pointer"
                    onClick={() => {
                      setSearchTerm(item);
                      navigate(`/search?q=${item}`);
                      setShowSuggestions(false);
                    }}
                  >
                    {item}
                  </div>
                ))}

              </div>
            )}

        </form>

      </div>

    </header>
  );
};

export default Navbar;