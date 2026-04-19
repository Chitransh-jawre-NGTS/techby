import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../Api/ProductApi";
import shoplogo from "../assets/logo/shop logo.jpg"

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const maxItemsToShow = 7;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
  try {
    setLoading(true);
    const response = await getAllProducts();

    const featured = response.data
      .filter((p) => p.featured)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // 🔥 NEWEST FIRST

    setProducts(featured);
  } catch (err) {
    console.error(err);
    setProducts([]);
  } finally {
    setLoading(false);
  }
};

  const handleViewMore = () => {
    navigate(`/search?featured=true`);
  };

  const skeletonArray = Array.from({ length: maxItemsToShow });

  const getDiscountPercent = (total, discount) =>
    Math.round(((total - discount) / total) * 100);

  return (
    <div className="max-w-7xl mx-auto p-4 border-4 border-green-500 rounded-3xl bg-green-50 shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-green-800 text-center">
        Featured Products
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3 md:gap-4 lg:gap-8">
        
        {/* Loading Skeleton */}
        {loading &&
          skeletonArray.map((_, index) => (
            <div
              key={index}
              className="relative bg-white shadow-md animate-pulse overflow-hidden border border-green-200 rounded-lg h-72"
            >
              <div className="w-full h-36 bg-gray-200"></div>
              <div className="p-3">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}

        {/* No Products */}
        {!loading && products.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-700">
              No Featured Products Available
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Sellers haven't added featured products yet.
            </p>
          </div>
        )}

        {/* Products */}
        {!loading &&
          products.length > 0 &&
          products.map((p, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/product/${p._id}`);
                window.scrollTo(0, 0);
              }}
              className="group relative bg-white shadow-md hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-1 overflow-hidden border border-green-200 cursor-pointer rounded-lg"
            >
              {/* Featured Badge */}
              {p.featured && (
                <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-full shadow z-10">
                  Featured
                </span>
              )}

              {/* Product Image */}
              <div className="relative">
                <img
                  src={p.imageUrls?.[0]?.url || "/default-product-image.png"}
                  alt={p.name}
                  className="w-full h-48 sm:h-52 md:h-56 lg:h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Free Delivery */}
                {p.deliveryAvailable && (
                  <span className="absolute bottom-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                    Free Delivery
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-3 sm:p-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                    {p.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-2 sm:mt-3 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 font-bold text-sm sm:text-base">
                      ₹{p.discountPrice || p.totalPrice}
                    </span>

                    {p.discountPrice && (
                      <>
                        <span className="line-through text-gray-400 text-xs sm:text-sm">
                          ₹{p.totalPrice}
                        </span>

                        <span className="text-red-500 text-xs sm:text-sm font-semibold">
                          {getDiscountPercent(
                            p.totalPrice,
                            p.discountPrice
                          )}
                          % OFF
                        </span>
                      </>
                    )}
                  </div>

                  {/* Seller Info */}
                     {p.sellerId && (
                   <div className="flex items-start gap-2 mt-2">
                     <img
                       src={p.sellerId.logo || shoplogo}
                       alt={p.sellerId.shopName}
                       className="w-8 h-8 rounded-full object-cover"
                     />
                 
                     <div className="flex flex-col">
                       <span className="text-gray-700 font-medium text-sm">
                         {p.sellerId.shopName}
                       </span>
                 
                       {/* Seller Location */}
                       {p.sellerId.location && (
                         <span className="text-gray-500 text-xs">
                           {p.sellerId.location}
                         </span>
                       )}
                     </div>
                   </div>
                 )}
                </div>
              </div>
            </div>
          ))}

        {/* View More */}
        {!loading && products.length > 0 && (
          <div
            onClick={handleViewMore}
            className="flex flex-col items-center justify-center border-2 border-dashed border-green-400 rounded-2xl p-5 cursor-pointer hover:bg-green-100 transition-all duration-300"
          >
            <h3 className="font-semibold text-green-800 text-sm sm:text-base mb-2">
              View More
            </h3>
            <p className="text-xs sm:text-sm text-green-700 text-center">
              See all featured products
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;