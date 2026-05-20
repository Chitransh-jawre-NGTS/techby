// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAllProducts } from "../Api/ProductApi";
// import sellerlogo from "../assets/logo/shop logo.jpg";
// import { FaShareAlt } from "react-icons/fa";

// const ProductsPage = ({ heading = "Products Near You" }) => {
//   const [productsData, setProductsData] = useState([]);
//   const [visibleCount, setVisibleCount] = useState(20);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const itemsPerLoad = 20;

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await getAllProducts();

//       const sortedProducts = response.data.sort(
//         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//       );

//       setProductsData(sortedProducts);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const displayedProducts = productsData.slice(0, visibleCount);
//   const skeletonArray = Array.from({ length: 20 });

//   const getDiscountPercent = (total, discount) =>
//     Math.round(((total - discount) / total) * 100);

//   const handleLoadMore = () => {
//     setVisibleCount((prev) => prev + itemsPerLoad);
//   };

//   // ================= SHARE FUNCTION =================
//   const handleShare = async (product) => {
//   const productUrl = `${window.location.origin}/product/${product._id}`;

//   const discount =
//     product.totalPrice && product.discountPrice
//       ? Math.round(
//           ((product.totalPrice - product.discountPrice) /
//             product.totalPrice) *
//             100
//         )
//       : 0;

//   const message =
// `🛍 PRODUCT DETAILS

// 📌 Name: ${product.name}

// 💰 Price: ₹${product.discountPrice || product.totalPrice}
// ${product.discountPrice ? `🔥 Discount: ${discount}% OFF` : ""}

// 📂 Category: ${product.category || "N/A"}

// ⚙️ Condition: ${product.attributes?.condition || "Used"}

// 🏪 Seller: ${product.sellerId?.shopName || "Local Seller"}

// 📍 Location: Indore

// 🔗 Product Link:
// ${productUrl}
// `.trim();

//   // Native share (WhatsApp / Instagram / Telegram / apps)
//   if (navigator.share) {
//     try {
//       await navigator.share({
//         title: product.name,
//         text: message,
//         url: productUrl,
//       });
//       return;
//     } catch (err) {
//       console.log("Share cancelled");
//     }
//   }

//   // Fallback → copy full message
//   try {
//     await navigator.clipboard.writeText(message);
//     alert("Product details copied!");
//   } catch (err) {
//     alert("Unable to copy");
//   }
// };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <h2 className="text-3xl font-semibold mb-8 text-gray-800">
//         {heading}
//       </h2>

//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-6">

//         {/* LOADING */}
//         {loading &&
//           skeletonArray.map((_, index) => (
//             <div
//               key={index}
//               className="bg-white border border-gray-200 shadow animate-pulse flex flex-col"
//             >
//               <div className="w-full h-48 bg-gray-200"></div>
//               <div className="p-4">
//                 <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
//                 <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
//                 <div className="h-5 bg-gray-300 rounded w-1/2"></div>
//               </div>
//             </div>
//           ))}

//         {/* PRODUCTS */}
//         {!loading &&
//           displayedProducts.map((product) => (
//             <div
//               key={product._id}
//               onClick={() => navigate(`/product/${product._id}`)}
//               className="bg-white border border-gray-200 shadow hover:shadow-lg transition cursor-pointer flex flex-col relative"
//             >

//               {/* SHARE ICON */}
//               <div className="absolute top-2 right-2 z-10">
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleShare(product);
//                   }}
//                   className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
//                 >
//                   <FaShareAlt className="text-gray-700 text-sm" />
//                 </button>
//               </div>

//               {/* IMAGE */}
//               <div className="relative w-full h-48">
//                 <img
//                   src={
//                     product.imageUrls?.[0]?.url ||
//                     "/default-product-image.png"
//                   }
//                   alt={product.name}
//                   className="w-full h-full object-cover"
//                 />

//                 {product.featured && (
//                   <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded">
//                     Featured
//                   </span>
//                 )}

//                 {product.deliveryAvailable && (
//                   <span className="absolute bottom-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
//                     Free Delivery
//                   </span>
//                 )}
//               </div>

//               {/* INFO */}
//               <div className="p-4 flex flex-col flex-grow">

//                 <h3 className="font-semibold text-sm text-gray-500 truncate">
//                   {product.desc}
//                 </h3>

//                 <h3 className="font-semibold text-lg text-gray-800 truncate">
//                   {product.name}
//                 </h3>

//                 {/* PRICE */}
//                 <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-3">
//                   <span className="text-green-600 font-bold text-sm sm:text-lg whitespace-nowrap">
//                     ₹{product.discountPrice || product.totalPrice}
//                   </span>

//                   {product.discountPrice && (
//                     <>
//                       <span className="text-red-500 text-[10px] sm:text-xs font-semibold whitespace-nowrap">
//                         {getDiscountPercent(
//                           product.totalPrice,
//                           product.discountPrice
//                         )}
//                         % OFF
//                       </span>

//                       <span className="line-through text-gray-400 text-xs sm:text-sm whitespace-nowrap">
//                         ₹{product.totalPrice}
//                       </span>
//                     </>
//                   )}
//                 </div>

//                 {/* SELLER */}
//                 {product.sellerId && (
//                   <div className="flex items-start gap-2 mt-2">
//                     <img
//                       src={product.sellerId.logo || sellerlogo}
//                       alt={product.sellerId.shopName}
//                       className="w-8 h-8 rounded-full object-cover"
//                     />

//                     <div className="flex flex-col">
//                       <span className="text-gray-700 font-medium text-sm">
//                         {product.sellerId.shopName}
//                       </span>

//                       {product.sellerId.location && (
//                         <span className="text-gray-500 text-xs">
//                           {product.sellerId.location}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//       </div>

//       {/* LOAD MORE */}
//       {!loading && visibleCount < productsData.length && (
//         <div className="flex justify-center mt-8">
//           <button
//             onClick={handleLoadMore}
//             className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//           >
//             Load More Products
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductsPage;

























import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/productSlice";
import sellerlogo from "../assets/logo/shop logo.jpg";
import { FaShareAlt, FaMapMarkerAlt } from "react-icons/fa";

const ProductsPage = ({ heading = "Products Near You" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading } = useSelector(
    (state) => state.products
  );

  const [visibleCount, setVisibleCount] = useState(20);
  const itemsPerLoad = 20;

  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  // ================= LOAD MORE =================
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + itemsPerLoad);
  };

  const displayedProducts = products.slice(0, visibleCount);

  const skeletonArray = Array.from({ length: 20 });

  // ================= SHARE =================
  const handleShare = async (product) => {
    const productUrl = `${window.location.origin}/product/${product._id}`;

    const discount =
      product.totalPrice && product.discountPrice
        ? Math.round(
            ((product.totalPrice - product.discountPrice) /
              product.totalPrice) *
              100
          )
        : 0;

    const message = `🛍 PRODUCT DETAILS

📌 Name: ${product.name}

💰 Price: ₹${product.discountPrice || product.totalPrice}
${product.discountPrice ? `🔥 Discount: ${discount}% OFF` : ""}

📂 Category: ${product.category || "N/A"}

⚙️ Condition: ${product.attributes?.condition || "Used"}

🏪 Seller: ${product.sellerId?.shopName || "Local Seller"}

📍 Location: Indore

🔗 Product Link:
${productUrl}
`.trim();

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: message,
          url: productUrl,
        });
        return;
      } catch (err) {
        console.log("Share cancelled");
      }
    }

    try {
      await navigator.clipboard.writeText(message);
      alert("Product details copied!");
    } catch (err) {
      alert("Unable to copy");
    }
  };

  // ================= RECENTLY VIEWED =================
  const handleProductClick = (product) => {
    const existing =
      JSON.parse(localStorage.getItem("recentItems")) || [];

    const minimalProduct = {
      _id: product._id,
      name: product.name,
      price: product.discountPrice || product.totalPrice,
      image: product.imageUrls?.[0]?.url,
    };

    const updated = [
      minimalProduct,
      ...existing.filter((item) => item._id !== product._id),
    ];

    localStorage.setItem(
      "recentItems",
      JSON.stringify(updated.slice(0, 10))
    );

    navigate(`/product/${product._id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">
        {heading}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-6">

        {/* LOADING */}
        {loading &&
          skeletonArray.map((_, index) => (
            <div
              key={index}
              className="bg-white border shadow animate-pulse"
            >
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4 space-y-2">
                <div className="h-5 bg-gray-300"></div>
                <div className="h-4 bg-gray-300"></div>
                <div className="h-5 bg-gray-300"></div>
              </div>
            </div>
          ))}

        {/* PRODUCTS */}
        {!loading &&
          displayedProducts.map((product) => (
            <div
              key={product._id}
              onClick={() => handleProductClick(product)}
              className={`bg-white overflow-hidden cursor-pointer transition-all group relative border
                ${
                  product.featured
                    ? "border-yellow-400"
                    : "border-gray-200 hover:border-green-300"
                }
                hover:shadow-md`}
            >
              {/* FEATURED */}
              {product.featured && (
                <div className="absolute top-3 left-3 z-20 bg-yellow-400 text-black text-[11px] font-semibold px-3 py-1 rounded-full">
                  Featured
                </div>
              )}

              {/* IMAGE */}
              <div className="relative h-44 sm:h-52 overflow-hidden">
                <img
                  src={
                    product.imageUrls?.[0]?.url ||
                    "/default-product-image.png"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />

                {/* SHARE */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(product);
                  }}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm"
                >
                  <FaShareAlt className="text-gray-700 text-sm" />
                </button>

                {/* CATEGORY */}
                <span className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                  {product.category || "Product"}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
                    ₹{product.discountPrice || product.totalPrice}
                  </h3>

                  <span className="text-[10px] sm:text-xs text-gray-500">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h4 className="mt-2 text-sm font-medium text-gray-800 line-clamp-2">
                  {product.name}
                </h4>

                {product.desc && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {product.desc}
                  </p>
                )}

                <div className="flex items-center gap-2 mt-4 text-gray-500 text-xs sm:text-sm">
                  <FaMapMarkerAlt className="text-gray-700" />
                  <span className="truncate font-medium text-gray-700">
                    {product.location || "Indore, Madhya Pradesh"}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* LOAD MORE */}
      {!loading && visibleCount < products.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;

























// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAllProducts } from "../Api/ProductApi";
// import sellerlogo from "../assets/logo/shop logo.jpg";

// const ProductsPage = ({ heading = "Products Near You" }) => {

//   const [productsData, setProductsData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [page, setPage] = useState(1);

//   const [hasMore, setHasMore] = useState(true);

//   const navigate = useNavigate();

//   const limit = 20;

//   // ================= FETCH PRODUCTS =================
//   const fetchProducts = async (pageNumber = 1) => {

//     try {

//       if (pageNumber === 1) {
//         setLoading(true);
//       }

//       const response = await getAllProducts(
//         pageNumber,
//         limit
//       );

//       const newProducts = response.products || [];

//       // APPEND PRODUCTS
//       setProductsData((prev) =>
//         pageNumber === 1
//           ? newProducts
//           : [...prev, ...newProducts]
//       );

//       // CHECK MORE DATA
//       if (pageNumber >= response.totalPages) {
//         setHasMore(false);
//       }

//     } catch (error) {

//       console.error(error);

//     } finally {

//       setLoading(false);

//     }
//   };

//   // ================= INITIAL LOAD =================
//   useEffect(() => {
//     fetchProducts(1);
//   }, []);

//   // ================= LOAD MORE =================
//   const handleLoadMore = async () => {

//     const nextPage = page + 1;

//     setPage(nextPage);

//     await fetchProducts(nextPage);

//   };

//   // ================= DISCOUNT =================
//   const getDiscountPercent = (total, discount) =>
//     Math.round(((total - discount) / total) * 100);

//   const skeletonArray = Array.from({ length: 20 });

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">

//       {/* HEADING */}
//       <h2 className="text-3xl font-semibold mb-8 text-gray-800">
//         {heading}
//       </h2>

//       {/* GRID */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-6">

//         {/* LOADING */}
//         {loading && productsData.length === 0 &&
//           skeletonArray.map((_, index) => (
//             <div
//               key={index}
//               className="bg-white border border-gray-200 shadow animate-pulse flex flex-col"
//             >
//               <div className="w-full h-48 bg-gray-200"></div>

//               <div className="p-4">

//                 <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>

//                 <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>

//                 <div className="h-5 bg-gray-300 rounded w-1/2"></div>

//               </div>
//             </div>
//           ))}

//         {/* PRODUCTS */}
//         {productsData.map((product) => (

//           <div
//             key={product._id}
//             onClick={() =>
//               navigate(`/product/${product._id}`)
//             }
//             className="bg-white border border-gray-200 shadow hover:shadow-lg transition cursor-pointer flex flex-col relative"
//           >

//             {/* IMAGE */}
//             <div className="relative w-full h-48">

//               <img
//                 loading="lazy"
//                 decoding="async"
//                 src={
//                   product.imageUrls?.[0]?.url ||
//                   "/default-product-image.png"
//                 }
//                 alt={product.name}
//                 className="w-full h-full object-cover"
//               />

//               {/* FEATURED */}
//               {product.featured && (
//                 <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded">
//                   Featured
//                 </span>
//               )}

//               {/* DELIVERY */}
//               {product.deliveryAvailable && (
//                 <span className="absolute bottom-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
//                   Free Delivery
//                 </span>
//               )}

//             </div>

//             {/* INFO */}
//             <div className="p-4 flex flex-col flex-grow">

//               <h3 className="font-semibold text-sm text-gray-500 truncate">
//                 {product.desc}
//               </h3>

//               <h3 className="font-semibold text-lg text-gray-800 truncate">
//                 {product.name}
//               </h3>

//               {/* PRICE */}
//               <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-3">

//                 <span className="text-green-600 font-bold text-sm sm:text-lg whitespace-nowrap">
//                   ₹{product.discountPrice || product.totalPrice}
//                 </span>

//                 {product.discountPrice && (
//                   <>
//                     <span className="text-red-500 text-[10px] sm:text-xs font-semibold whitespace-nowrap">
//                       {getDiscountPercent(
//                         product.totalPrice,
//                         product.discountPrice
//                       )}
//                       % OFF
//                     </span>

//                     <span className="line-through text-gray-400 text-xs sm:text-sm whitespace-nowrap">
//                       ₹{product.totalPrice}
//                     </span>
//                   </>
//                 )}

//               </div>

//               {/* SELLER */}
//               {product.sellerId && (

//                 <div className="flex items-start gap-2 mt-2">

//                   <img
//                     loading="lazy"
//                     decoding="async"
//                     src={
//                       product.sellerId.logo ||
//                       sellerlogo
//                     }
//                     alt={product.sellerId.shopName}
//                     className="w-8 h-8 rounded-full object-cover"
//                   />

//                   <div className="flex flex-col">

//                     <span className="text-gray-700 font-medium text-sm">
//                       {product.sellerId.shopName}
//                     </span>

//                     {product.sellerId.location && (
//                       <span className="text-gray-500 text-xs">
//                         {product.sellerId.location}
//                       </span>
//                     )}

//                   </div>

//                 </div>
//               )}

//             </div>

//           </div>
//         ))}
//       </div>

//       {/* LOAD MORE */}
//       {!loading && hasMore && (

//         <div className="flex justify-center mt-8">

//           <button
//             onClick={handleLoadMore}
//             className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//           >
//             Load More Products
//           </button>

//         </div>
//       )}

//     </div>
//   );
// };

// export default ProductsPage;
