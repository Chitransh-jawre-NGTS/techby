import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../Api/ProductApi";

const ProductsPage = ({ heading = "Products Near You" }) => {
  const [productsData, setProductsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const itemsPerPage = 12;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProductsData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(productsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = productsData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Skeleton placeholders
  const skeletonArray = Array.from({ length: itemsPerPage });

  // Helper to calculate discount %
  const getDiscountPercent = (total, discount) =>
    Math.round(((total - discount) / total) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">{heading}</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {loading
          ? skeletonArray.map((_, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 overflow-hidden shadow animate-pulse flex flex-col"
              >
                <div className="w-full h-48 bg-gray-200 relative"></div>
                <div className="p-4 flex flex-col flex-grow">
                  <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                  <div className="h-5 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))
          : displayedProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                className="bg-white border border-gray-200 overflow-hidden shadow hover:shadow-lg transition cursor-pointer flex flex-col"
              >
                {/* Image */}
                <div className="relative w-full h-48">
                  <img
                    src={product.imageUrls?.[0] || "/default-product-image.png"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />

                  {product.featured && (
                    <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded">
                      Featured
                    </span>
                  )}

                  {product.deliveryAvailable && (
                    <span className="absolute bottom-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      Free Delivery
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-semibold text-lg text-gray-800 truncate">
                    {product.name}
                  </h3>
                  {/* <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                    {product.desc}
                  </p> */}

                  {/* Price & Discount */}
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="text-green-600 font-bold text-lg">
                      ₹{product.discountPrice || product.totalPrice}
                    </span>

                    {product.discountPrice && (
                      <>
                        
                       <div className=" bg-red-50">
                         <span className="text-red-500 text-xs font-semibold ml-1">
                          {getDiscountPercent(
                            product.totalPrice,
                            product.discountPrice
                          )}
                          % OFF
                        </span>
                       </div>
                       <span className="line-through text-gray-400 text-sm">
                          ₹{product.totalPrice}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Seller Info */}
                  {product.sellerId && (
                    <div className="flex items-center gap-2 mt-4 flex-wrap">
                      <img
                        src={product.sellerId.logo || "/default-shop-logo.png"}
                        alt={product.sellerId.shopName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-gray-700 font-medium text-sm flex items-center gap-1">
                        {product.sellerId.shopName}
                        {product.sellerId.verified && (
                          <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
                            Verified
                          </span>
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && !loading && (
        <div className="flex justify-center items-center gap-3 mt-8 flex-wrap">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNum = index + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition 
                  ${
                    currentPage === pageNum
                      ? "bg-green-600 text-white font-semibold shadow"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;