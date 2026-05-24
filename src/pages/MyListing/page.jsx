import React, {
  useEffect,
  useState,
} from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  FaEye,
  FaHeart,
  FaEllipsisV,
  FaSearch,
  FaTrash,
  FaEdit,
  FaTimes,
} from "react-icons/fa";

import Navbar from "../../components/Navbar";

import MobileBottomNavbar from "../../components/MobileBottomNavbar";

import {
  fetchMyProducts,
  deleteProduct,
  updateProduct,
} from "../../store/slices/productSlice";

import { useNavigate } from "react-router-dom";

const MyListingsPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

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

  // =====================================
  // EDIT MODAL
  // =====================================

  const [
    showEditModal,
    setShowEditModal,
  ] = useState(false);

  const [editingProduct, setEditingProduct] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      desc: "",
      category: "",
      totalPrice: "",
      discountPrice: "",
    });

  const [images, setImages] =
    useState([]);

  // =====================================
  // FETCH PRODUCTS
  // =====================================

  useEffect(() => {
    dispatch(fetchMyProducts());
  }, [dispatch]);

  // =====================================
  // FILTER PRODUCTS
  // =====================================

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

  // =====================================
  // DELETE PRODUCT
  // =====================================

  const handleDelete = async (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmDelete) return;

    await dispatch(
      deleteProduct(id)
    );

    dispatch(fetchMyProducts());
  };

  // =====================================
  // OPEN EDIT
  // =====================================

  const openEditModal = (
    product
  ) => {

    setEditingProduct(product);

    setFormData({
      name:
        product?.name || "",
      desc:
        product?.desc || "",
      category:
        product?.category || "",
      totalPrice:
        product?.totalPrice ||
        "",
      discountPrice:
        product?.discountPrice ||
        "",
    });

    setShowEditModal(true);
  };

  // =====================================
  // UPDATE PRODUCT
  // =====================================

  const handleUpdateProduct =
    async () => {

      const data =
        new FormData();

      data.append(
        "name",
        formData.name
      );

      data.append(
        "desc",
        formData.desc
      );

      data.append(
        "category",
        formData.category
      );

      data.append(
        "totalPrice",
        formData.totalPrice
      );

      data.append(
        "discountPrice",
        formData.discountPrice
      );

      // IMAGES
      for (
        let i = 0;
        i < images.length;
        i++
      ) {
        data.append(
          "images",
          images[i]
        );
      }

      await dispatch(
        updateProduct({
          id: editingProduct._id,
          data,
        })
      );

      dispatch(fetchMyProducts());

      setShowEditModal(false);
    };

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

          {/* PRODUCTS */}

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

                      <div className="p-4">

                        {/* TOP */}

                        <div className="flex items-start justify-between gap-3">

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

                              <h2 className="font-bold text-base sm:text-xl text-gray-800 truncate">

                                {
                                  item.name
                                }

                              </h2>

                              <p className="text-xl sm:text-2xl font-bold text-green-700 mt-1">

                                ₹
                                {item.discountPrice ||
                                  item.totalPrice}

                              </p>

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

                              <div className="mt-3 border-l-4 border-green-500 pl-3 text-sm text-gray-600 leading-6">

                                {isActive
                                  ? "This ad is currently live"
                                  : "This ad is currently inactive"}

                              </div>
                            </div>
                          </div>

                          {/* ACTIONS */}

                          <div className="flex items-center gap-3">

                            <button
                              onClick={() =>
                                openEditModal(
                                  item
                                )
                              }
                              className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"
                            >

                              <FaEdit />

                            </button>

                            <button
                              onClick={() =>
                                handleDelete(
                                  item._id
                                )
                              }
                              className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100"
                            >

                              <FaTrash />

                            </button>
                          </div>
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
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}

          {/* EMPTY */}

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

                <button
                  onClick={() =>
                    navigate("/sell")
                  }
                  className="mt-5 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold"
                >

                  Create Listing

                </button>
              </div>
            )}
        </div>
      </div>

      {/* ===================================== */}
      {/* EDIT MODAL */}
      {/* ===================================== */}

      {showEditModal && (

        <div className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl">

            {/* HEADER */}

            <div className="bg-green-600 text-white p-5 flex items-center justify-between">

              <h2 className="text-2xl font-bold">
                Update Product
              </h2>

              <button
                onClick={() =>
                  setShowEditModal(
                    false
                  )
                }
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
              >

                <FaTimes />

              </button>
            </div>

            {/* BODY */}

            <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">

              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name:
                      e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-green-500"
              />

              <textarea
                rows={4}
                placeholder="Description"
                value={formData.desc}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    desc:
                      e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-green-500"
              />

              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category:
                      e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-green-500"
              />

              <input
                type="number"
                placeholder="Total Price"
                value={formData.totalPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalPrice:
                      e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-green-500"
              />

              <input
                type="number"
                placeholder="Discount Price"
                value={formData.discountPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    discountPrice:
                      e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-green-500"
              />

              {/* IMAGE */}

              <input
                type="file"
                multiple
                onChange={(e) =>
                  setImages(
                    e.target.files
                  )
                }
                className="w-full border border-gray-300 rounded-2xl px-4 py-3"
              />

              {/* BUTTONS */}

              <div className="flex gap-3 pt-3">

                <button
                  onClick={() =>
                    setShowEditModal(
                      false
                    )
                  }
                  className="flex-1 border border-gray-300 py-3 rounded-2xl font-semibold"
                >

                  Cancel

                </button>

                <button
                  onClick={
                    handleUpdateProduct
                  }
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-semibold"
                >

                  Update Product

                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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