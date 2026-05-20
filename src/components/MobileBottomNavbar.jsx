// import React from "react";

// import {
//   Link,
//   useLocation,
// } from "react-router-dom";

// import {
//   FaHome,
//   FaUser,
//   FaThLarge,
// } from "react-icons/fa";

// const MobileBottomNavbar = () => {
//   const location = useLocation();

//   const navItems = [
//     {
//       name: "Home",
//       icon: <FaHome />,
//       path: "/",
//     },

//     {
//       name: "All Products",
//       icon: <FaThLarge />,
//       path: "/all-products",
//     },

//     {
//       name: "Profile",
//       icon: <FaUser />,
//       path: "/account",
//     },
//   ];

//   return (
//     <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.08)] lg:hidden z-50">

//       <div className="flex justify-around items-center h-16">

//         {navItems.map((item) => {

//           const isActive =
//             location.pathname === item.path;

//           return (
//             <Link
//               key={item.name}
//               to={item.path}
//               className="flex flex-col items-center justify-center flex-1 relative"
//             >

//               {/* ICON */}
//               <div
//                 className={`text-xl transition-all duration-300 ${
//                   isActive
//                     ? "text-green-600 scale-110"
//                     : "text-gray-500"
//                 }`}
//               >
//                 {item.icon}
//               </div>

//               {/* LABEL */}
//               <span
//                 className={`text-[11px] mt-1 font-medium ${
//                   isActive
//                     ? "text-green-600"
//                     : "text-gray-500"
//                 }`}
//               >
//                 {item.name}
//               </span>

//               {/* ACTIVE TOP LINE */}
//               {isActive && (
//                 <span className="absolute top-0 w-10 h-1 rounded-full bg-green-600"></span>
//               )}

//             </Link>
//           );
//         })}

//       </div>

//     </nav>
//   );
// };

// export default MobileBottomNavbar;























import React from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FaHome,
  FaUser,
  FaThLarge,
  FaPlusCircle,
  FaClipboardList,
} from "react-icons/fa";

const MobileBottomNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      icon: <FaHome />,
      path: "/",
    },

    {
      name: "Products",
      icon: <FaThLarge />,
      path: "/all-products",
    },

    {
      name: "Sell",
      icon: <FaPlusCircle />,
      path: "/sell",
      center: true,
    },

    {
      name: "My Ads",
      icon: <FaClipboardList />,
      path: "/my-listings",
    },

    {
      name: "Profile",
      icon: <FaUser />,
      path: "/account",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.08)] lg:hidden z-48">

      <div className="flex justify-around items-center h-16 px-1">

        {navItems.map((item) => {

          const isActive =
            location.pathname === item.path;

          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center flex-1 relative"
            >

              {/* SELL BUTTON */}
              {item.center ? (
                <div className="absolute -top-8 bg-green-600 w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-white">

                  <FaPlusCircle className="text-white text-2xl" />

                </div>
              ) : (
                <div
                  className={`text-xl transition-all duration-300 ${
                    isActive
                      ? "text-green-600 scale-110"
                      : "text-gray-500"
                  }`}
                >
                  {item.icon}
                </div>
              )}

              {/* LABEL */}
              <span
                className={`text-[10px] mt-1 font-medium ${
                  item.center
                    ? "mt-7"
                    : ""
                } ${
                  isActive
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {item.name}
              </span>

              {/* ACTIVE LINE */}
              {isActive && !item.center && (
                <span className="absolute top-0 w-10 h-1 rounded-full bg-green-600"></span>
              )}

            </button>
          );
        })}

      </div>

    </nav>
  );
};

export default MobileBottomNavbar;