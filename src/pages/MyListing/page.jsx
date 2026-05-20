import React, { useState } from "react";
import {
  FaEye,
  FaHeart,
  FaEllipsisV,
  FaSearch,
} from "react-icons/fa";

import Navbar from "../../components/Navbar";
import MobileBottomNavbar from "../../components/MobileBottomNavbar";

const MyListingsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const listings = [
    {
      id: 1,
      title: "Apple MacBook Air M1 Chip",
      price: "₹45,000",
      status: "NOT POSTED",
      statusColor: "bg-green-100 text-green-700",
      message: "Wait 54 days to post for free or pay to post now",
      views: "-",
      likes: "-",
      image:
        "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=1000",
      active: false,
      button: "Post now",
    },

    {
      id: 2,
      title: "Samsung Galaxy S22",
      price: "₹17,999",
      status: "ACTIVE",
      statusColor: "bg-green-600 text-white",
      message: "This ad is currently live",
      views: 270,
      likes: 0,
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1000",
      active: true,
      button: "Sell faster now",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f4f7f4] pb-28">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 py-5">

          {/* HEADER */}
          <div className="mb-5">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              My Listings
            </h1>

            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              Manage your ads and boost your sales
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative mb-5">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />

            <input
              type="text"
              placeholder="Search by Ad Title"
              className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-3 outline-none shadow-sm focus:border-green-500"
            />
          </div>

          {/* FILTERS */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 mb-5">

            {[
              "View all (2)",
              "Active Ads (1)",
              "Inactive Ads (0)",
              "Pending Ads (1)",
              "Moderated Ads (0)",
            ].map((filter, index) => (
              <button
                key={index}
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? "bg-green-600 text-white border-green-600 shadow"
                    : "bg-white border-gray-300 text-gray-700"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* LISTINGS */}
          <div className="space-y-4">

            {listings.map((item) => (
              <div
                key={item.id}
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
                        src={item.image}
                        alt=""
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover flex-shrink-0"
                      />

                      {/* CONTENT */}
                      <div className="flex-1 min-w-0">

                        {/* TITLE */}
                        <h2 className="font-bold text-base sm:text-xl text-gray-800 truncate">
                          {item.title}
                        </h2>

                        {/* PRICE */}
                        <p className="text-xl sm:text-2xl font-bold text-green-700 mt-1">
                          {item.price}
                        </p>

                        {/* STATUS */}
                        <div className="mt-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${item.statusColor}`}
                          >
                            {item.status}
                          </span>
                        </div>

                        {/* MESSAGE */}
                        <div className="mt-3 border-l-4 border-green-500 pl-3 text-sm text-gray-600 leading-6">
                          {item.message}
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
                      FROM: <b className="text-gray-800">MAY 13, 26</b>
                    </span>

                    {item.active && (
                      <span className="whitespace-nowrap">
                        TO: <b className="text-gray-800">JUN 12, 26</b>
                      </span>
                    )}
                  </div>

                  {/* STATS */}
                  <div className="mt-4 flex items-center gap-6 text-sm text-gray-700">

                    <div className="flex items-center gap-2">
                      <FaEye className="text-green-600" />
                      <span>
                        <b>Views:</b> {item.views}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaHeart className="text-green-600" />
                      <span>
                        <b>Likes:</b> {item.likes}
                      </span>
                    </div>
                  </div>

                  {/* BUTTONS */}
                  <div className="mt-5 flex items-center gap-3 overflow-x-auto scrollbar-hide">

                    {item.active && (
                      <button className="whitespace-nowrap border-2 border-green-600 text-green-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-green-50 transition">
                        Mark as sold
                      </button>
                    )}

                    <button className="whitespace-nowrap bg-green-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-green-700 transition">
                      {item.button}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* EMPTY STATE */}
          {listings.length === 0 && (
            <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-gray-200 mt-10">

              <h2 className="text-2xl font-bold text-gray-800">
                No Listings Found
              </h2>

              <p className="text-gray-500 mt-2">
                Start selling by posting your first ad
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
















// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProductById } from "../../store/slices/productSlice";

// import {
//   FaEye,
//   FaHeart,
//   FaEllipsisV,
//   FaSearch,
// } from "react-icons/fa";

// import Navbar from "../../components/Navbar";
// import MobileBottomNavbar from "../../components/MobileBottomNavbar";

// const MyListingsPage = () => {
//   const dispatch = useDispatch();

//   const { sellerProducts, loading } = useSelector(
//     (state) => state.products
//   );

//   const [activeFilter, setActiveFilter] = useState("all");
//   const [search, setSearch] = useState("");

//   // ================= FETCH LISTINGS =================
//   useEffect(() => {
//     dispatch(fetchProductById());
//   }, [dispatch]);

//   // ================= FILTERED DATA =================
//   const filteredListings = sellerProducts
//     ?.filter((item) => {
//       if (activeFilter.includes("Active"))
//         return item.status === "active";

//       if (activeFilter.includes("Inactive"))
//         return item.status !== "active";

//       return true;
//     })
//     .filter((item) =>
//       item.name?.toLowerCase().includes(search.toLowerCase())
//     );

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen bg-[#f4f7f4] pb-28">
//         <div className="max-w-7xl mx-auto px-3 sm:px-5 py-5">

//           {/* HEADER */}
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
//             My Listings
//           </h1>

//           {/* SEARCH */}
//           <div className="relative mt-5">
//             <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search by Ad Title"
//               className="w-full bg-white border rounded-2xl pl-12 py-3"
//             />
//           </div>

//           {/* FILTERS */}
//           <div className="flex gap-3 overflow-x-auto mt-5">

//             {[
//               "View all",
//               "Active Ads",
//               "Inactive Ads",
//               "Pending Ads",
//             ].map((f) => (
//               <button
//                 key={f}
//                 onClick={() => setActiveFilter(f)}
//                 className={`px-5 py-2 rounded-full text-sm ${
//                   activeFilter === f
//                     ? "bg-green-600 text-white"
//                     : "bg-white border"
//                 }`}
//               >
//                 {f}
//               </button>
//             ))}
//           </div>

//           {/* LOADING */}
//           {loading && (
//             <p className="mt-10 text-center text-gray-500">
//               Loading listings...
//             </p>
//           )}

//           {/* LISTINGS */}
//           <div className="space-y-4 mt-6">

//             {!loading &&
//               filteredListings?.map((item) => (
//                 <div
//                   key={item._id}
//                   className="bg-white rounded-3xl shadow-sm border p-4"
//                 >
//                   <div className="flex gap-4">

//                     {/* IMAGE */}
//                     <img
//                       src={
//                         item.imageUrls?.[0]?.url ||
//                         "/default-product-image.png"
//                       }
//                       className="w-24 h-24 rounded-xl object-cover"
//                     />

//                     {/* INFO */}
//                     <div className="flex-1">
//                       <h2 className="font-bold text-lg">
//                         {item.name}
//                       </h2>

//                       <p className="text-green-700 font-bold">
//                         ₹{item.discountPrice || item.totalPrice}
//                       </p>

//                       <span
//                         className={`text-xs px-3 py-1 rounded-full ${
//                           item.status === "active"
//                             ? "bg-green-100 text-green-700"
//                             : "bg-red-100 text-red-700"
//                         }`}
//                       >
//                         {item.status?.toUpperCase()}
//                       </span>

//                       <p className="text-sm text-gray-500 mt-2">
//                         Views: {item.views || 0} | Likes:{" "}
//                         {item.likes || 0}
//                       </p>
//                     </div>

//                     <FaEllipsisV className="text-gray-500" />
//                   </div>
//                 </div>
//               ))}
//           </div>

//           {/* EMPTY STATE */}
//           {!loading && filteredListings?.length === 0 && (
//             <div className="text-center mt-10">
//               <h2 className="text-xl font-bold">
//                 No Listings Found
//               </h2>
//               <p className="text-gray-500">
//                 Start selling your first product
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="lg:hidden">
//         <MobileBottomNavbar />
//       </div>
//     </>
//   );
// };

// export default MyListingsPage;