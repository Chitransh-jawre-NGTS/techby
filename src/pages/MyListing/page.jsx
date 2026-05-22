import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  FaEye,
  FaHeart,
  FaEllipsisV,
  FaSearch,
} from "react-icons/fa";

import Navbar from "../../components/Navbar";
import MobileBottomNavbar from "../../components/MobileBottomNavbar";

import { fetchMyProducts } from "../../store/slices/productSlice";

const MyListingsPage = () => {
  const dispatch = useDispatch();

  const {
    myProducts,
    loading,
  } = useSelector(
    (state) => state.products
  );

  const [activeFilter, setActiveFilter] =
    useState("View all");

  const [search, setSearch] =
    useState("");

  // ======================================================
  // FETCH PRODUCTS
  // ======================================================

  useEffect(() => {
    dispatch(fetchMyProducts());
  }, [dispatch]);

  // ======================================================
  // FILTER PRODUCTS
  // ======================================================

  const filteredListings =
    myProducts
      ?.filter((item) => {
        if (
          activeFilter.includes("Active")
        ) {
          return (
            item.status === "active"
          );
        }

        if (
          activeFilter.includes(
            "Inactive"
          )
        ) {
          return (
            item.status !== "active"
          );
        }

        if (
          activeFilter.includes(
            "Pending"
          )
        ) {
          return (
            item.status === "pending"
          );
        }

        return true;
      })
      ?.filter((item) =>
        item.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f4f7f4] pb-28">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 py-5">


          {/* SEARCH */}
          <div className="relative mb-5">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search by Ad Title"
              className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-3 outline-none shadow-sm focus:border-green-500"
            />
          </div>

          {/* FILTERS */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 mb-5">

            {[
              `View all (${myProducts?.length || 0})`,

              `Active Ads (${
                myProducts?.filter(
                  (i) =>
                    i.status ===
                    "active"
                ).length || 0
              })`,

              `Inactive Ads (${
                myProducts?.filter(
                  (i) =>
                    i.status !==
                    "active"
                ).length || 0
              })`,

              `Pending Ads (${
                myProducts?.filter(
                  (i) =>
                    i.status ===
                    "pending"
                ).length || 0
              })`,
            ].map((filter, index) => (
              <button
                key={index}
                onClick={() =>
                  setActiveFilter(
                    filter
                  )
                }
                className={`whitespace-nowrap px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-200 ${
                  activeFilter ===
                  filter
                    ? "bg-green-600 text-white border-green-600 shadow"
                    : "bg-white border-gray-300 text-gray-700"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* LOADING */}
          {loading && (
            <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-gray-200">

              <h2 className="text-xl font-bold text-gray-700">
                Loading listings...
              </h2>
            </div>
          )}

          {/* LISTINGS */}
          {!loading && (
            <div className="space-y-4">

              {filteredListings?.map(
                (item) => {
                  const isActive =
                    item.status ===
                    "active";

                  return (
                    <div
                      key={item._id}
                      className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden"
                    >

                      {/* MAIN CARD */}
                      <div className="p-4">

                        {/* TOP */}
                        <div className="flex items-start justify-between gap-3">

                          {/* LEFT */}
                          <div className="flex gap-3 flex-1 min-w-0">

                            {/* IMAGE */}
                            <img
                              src={
                                item
                                  ?.imageUrls?.[0]
                                  ?.url ||
                                "/default-product-image.png"
                              }
                              alt=""
                              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover flex-shrink-0"
                            />

                            {/* CONTENT */}
                            <div className="flex-1 min-w-0">

                              {/* TITLE */}
                              <h2 className="font-bold text-base sm:text-xl text-gray-800 truncate">
                                {
                                  item.name
                                }
                              </h2>

                              {/* PRICE */}
                              <p className="text-xl sm:text-2xl font-bold text-green-700 mt-1">
                                ₹
                                {item.discountPrice ||
                                  item.totalPrice}
                              </p>

                              {/* STATUS */}
                              <div className="mt-2">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    isActive
                                      ? "bg-green-600 text-white"
                                      : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  {item.status?.toUpperCase()}
                                </span>
                              </div>

                              {/* MESSAGE */}
                              <div className="mt-3 border-l-4 border-green-500 pl-3 text-sm text-gray-600 leading-6">

                                {isActive
                                  ? "This ad is currently live"
                                  : "This ad is currently inactive"}
                              </div>
                            </div>
                          </div>

                          {/* MENU */}
                          <button className="text-gray-500 mt-1">
                            <FaEllipsisV />
                          </button>
                        </div>

                        {/* DATE */}
                        <div className="mt-4 flex items-center gap-5 text-xs sm:text-sm text-gray-500 font-medium overflow-x-auto">

                          <span className="whitespace-nowrap">
                            FROM:{" "}
                            <b className="text-gray-800">
                              {new Date(
                                item.createdAt
                              ).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month:
                                    "short",
                                  year:
                                    "2-digit",
                                }
                              )}
                            </b>
                          </span>

                          {item.expiresAt && (
                            <span className="whitespace-nowrap">
                              TO:{" "}
                              <b className="text-gray-800">
                                {new Date(
                                  item.expiresAt
                                ).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "2-digit",
                                    month:
                                      "short",
                                    year:
                                      "2-digit",
                                  }
                                )}
                              </b>
                            </span>
                          )}
                        </div>

                        {/* STATS */}
                        <div className="mt-4 flex items-center gap-6 text-sm text-gray-700">

                          <div className="flex items-center gap-2">
                            <FaEye className="text-green-600" />

                            <span>
                              <b>
                                Views:
                              </b>{" "}
                              {item.views ||
                                0}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <FaHeart className="text-green-600" />

                            <span>
                              <b>
                                Likes:
                              </b>{" "}
                              {item.likes ||
                                0}
                            </span>
                          </div>
                        </div>

                        {/* BUTTONS */}
                        <div className="mt-5 flex items-center gap-3 overflow-x-auto scrollbar-hide">

                          {isActive && (
                            <button className="whitespace-nowrap border-2 border-green-600 text-green-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-green-50 transition">
                              Mark as sold
                            </button>
                          )}

                          <button className="whitespace-nowrap bg-green-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-green-700 transition">
                            {isActive
                              ? "Sell faster now"
                              : "Post now"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading &&
            filteredListings?.length ===
              0 && (
              <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-gray-200 mt-10">

                <h2 className="text-2xl font-bold text-gray-800">
                  No Listings Found
                </h2>

                <p className="text-gray-500 mt-2">
                  Start selling by posting
                  your first ad
                </p>

                <button className="mt-5 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold">
                  Create Listing
                </button>
              </div>
            )}
        </div>
      </div>

      {/* MOBILE NAVBAR */}
      <div className="lg:hidden">
        <MobileBottomNavbar />
      </div>
    </>
  );
};

export default MyListingsPage;





// import React, {
//   useEffect,
//   useState,
// } from "react";

// import {
//   useDispatch,
//   useSelector,
// } from "react-redux";

// import {
//   fetchMyProducts,
// } from "../../store/slices/productSlice";

// import {
//   FaEye,
//   FaHeart,
//   FaEllipsisV,
//   FaSearch,
//   FaBoxOpen,
// } from "react-icons/fa";

// import Navbar from "../../components/Navbar";

// import MobileBottomNavbar from "../../components/MobileBottomNavbar";

// const MyListingsPage = () => {
//   const dispatch = useDispatch();

//   // ======================================================
//   // REDUX STATE
//   // ======================================================

//   const { myProducts, loading } =
//     useSelector(
//       (state) => state.products
//     );

//   // ======================================================
//   // LOCAL STATE
//   // ======================================================

//   const [activeFilter, setActiveFilter] =
//     useState("View all");

//   const [search, setSearch] =
//     useState("");

//   // ======================================================
//   // FETCH MY PRODUCTS
//   // ======================================================

//   useEffect(() => {
//     dispatch(fetchMyProducts());
//   }, [dispatch]);

//   // ======================================================
//   // FILTER PRODUCTS
//   // ======================================================

//   const filteredListings =
//     myProducts
//       ?.filter((item) => {
//         if (
//           activeFilter ===
//           "Active Ads"
//         ) {
//           return (
//             item.status ===
//             "active"
//           );
//         }

//         if (
//           activeFilter ===
//           "Inactive Ads"
//         ) {
//           return (
//             item.status !==
//             "active"
//           );
//         }

//         return true;
//       })
//       .filter((item) =>
//         item.name
//           ?.toLowerCase()
//           .includes(
//             search.toLowerCase()
//           )
//       );

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen bg-[#f4f7f4] pb-28">

//         <div className="max-w-7xl mx-auto px-3 sm:px-5 py-5">

//           {/* ====================================================== */}
//           {/* HEADER */}
//           {/* ====================================================== */}

//           <div className="flex items-center justify-between">

//             <div>
//               <h1 className="text-3xl font-bold text-gray-800">
//                 My Listings
//               </h1>

//               <p className="text-gray-500 mt-1">
//                 Manage your uploaded products
//               </p>
//             </div>

//             <div className="hidden md:flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow-sm border">

//               <FaBoxOpen className="text-green-600" />

//               <span className="font-semibold">
//                 {myProducts?.length || 0} Ads
//               </span>
//             </div>
//           </div>

//           {/* ====================================================== */}
//           {/* SEARCH */}
//           {/* ====================================================== */}

//           <div className="relative mt-6">

//             <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

//             <input
//               value={search}
//               onChange={(e) =>
//                 setSearch(
//                   e.target.value
//                 )
//               }
//               placeholder="Search your listings..."
//               className="w-full bg-white border rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-green-500"
//             />
//           </div>

//           {/* ====================================================== */}
//           {/* FILTERS */}
//           {/* ====================================================== */}

//           <div className="flex gap-3 overflow-x-auto mt-5 scrollbar-hide">

//             {[
//               "View all",
//               "Active Ads",
//               "Inactive Ads",
//             ].map((filter) => (
//               <button
//                 key={filter}
//                 onClick={() =>
//                   setActiveFilter(
//                     filter
//                   )
//                 }
//                 className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-medium transition ${
//                   activeFilter ===
//                   filter
//                     ? "bg-green-600 text-white"
//                     : "bg-white border text-gray-700"
//                 }`}
//               >
//                 {filter}
//               </button>
//             ))}
//           </div>

//           {/* ====================================================== */}
//           {/* LOADING */}
//           {/* ====================================================== */}

//           {loading && (
//             <div className="mt-16 flex justify-center">

//               <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
//             </div>
//           )}

//           {/* ====================================================== */}
//           {/* PRODUCT LIST */}
//           {/* ====================================================== */}

//           {!loading &&
//             filteredListings?.length >
//               0 && (
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">

//                 {filteredListings.map(
//                   (item) => (
//                     <div
//                       key={item._id}
//                       className="bg-white rounded-3xl overflow-hidden border shadow-sm hover:shadow-lg transition"
//                     >

//                       {/* IMAGE */}
//                       <div className="relative">

//                         <img
//                           src={
//                             item
//                               .imageUrls?.[0]
//                               ?.url ||
//                             "/default-product-image.png"
//                           }
//                           alt={
//                             item.name
//                           }
//                           className="w-full h-60 object-cover"
//                         />

//                         <div className="absolute top-4 right-4">

//                           <button className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow">

//                             <FaEllipsisV className="text-gray-600" />
//                           </button>
//                         </div>

//                         <div className="absolute bottom-4 left-4">

//                           <span
//                             className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                               item.status ===
//                               "active"
//                                 ? "bg-green-100 text-green-700"
//                                 : "bg-red-100 text-red-700"
//                             }`}
//                           >
//                             {item.status?.toUpperCase()}
//                           </span>
//                         </div>
//                       </div>

//                       {/* CONTENT */}
//                       <div className="p-5">

//                         <h2 className="text-lg font-bold line-clamp-1">
//                           {item.name}
//                         </h2>

//                         <p className="text-green-700 text-2xl font-bold mt-2">
//                           ₹
//                           {item.discountPrice ||
//                             item.totalPrice}
//                         </p>

//                         <p className="text-gray-500 text-sm mt-2 line-clamp-2">
//                           {item.desc}
//                         </p>

//                         {/* STATS */}
//                         <div className="flex items-center gap-5 mt-5 text-sm text-gray-600">

//                           <div className="flex items-center gap-2">

//                             <FaEye />

//                             <span>
//                               {item.views ||
//                                 0}
//                             </span>
//                           </div>

//                           <div className="flex items-center gap-2">

//                             <FaHeart />

//                             <span>
//                               {item.likes ||
//                                 0}
//                             </span>
//                           </div>
//                         </div>

//                         {/* FOOTER */}
//                         <div className="flex items-center justify-between mt-5 pt-4 border-t">

//                           <span className="text-sm text-gray-500">
//                             {item.city}
//                           </span>

//                           <span className="text-xs text-gray-400">
//                             {new Date(
//                               item.createdAt
//                             ).toLocaleDateString()}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   )
//                 )}
//               </div>
//             )}

//           {/* ====================================================== */}
//           {/* EMPTY STATE */}
//           {/* ====================================================== */}

//           {!loading &&
//             filteredListings?.length ===
//               0 && (
//               <div className="flex flex-col items-center justify-center text-center mt-20">

//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
//                   alt="No Listings"
//                   className="w-40 opacity-80"
//                 />

//                 <h2 className="text-2xl font-bold mt-6">
//                   No Listings Found
//                 </h2>

//                 <p className="text-gray-500 mt-2">
//                   Start selling your first product
//                 </p>
//               </div>
//             )}
//         </div>
//       </div>

//       {/* MOBILE NAVBAR */}
//       <div className="lg:hidden">
//         <MobileBottomNavbar />
//       </div>
//     </>
//   );
// };

// export default MyListingsPage;