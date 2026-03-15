import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import MobileBottomNavbar from "../../components/MobileBottomNavbar";
import Footer from "../../components/Footer";
import { getAllProducts } from "../../Api/ProductApi";

const ProductsPage = () => {
  const navigate = useNavigate();

  const [productsData, setProductsData] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(20);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProductsData(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const displayedProducts = productsData.slice(0, visibleProducts);

  const loadMoreProducts = () => {
    setVisibleProducts((prev) => prev + 20);
  };

  const ProductSkeleton = () => {
    return (
      <div className="bg-white border border-gray-200 overflow-hidden shadow animate-pulse flex flex-col">
        <div className="w-full h-48 bg-gray-300"></div>

        <div className="p-4 flex flex-col flex-grow space-y-3">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>

          <div className="flex items-center gap-2 mt-2">
            <div className="h-5 bg-gray-300 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-12"></div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  };

  const getDiscountPercent = (total, discount) =>
    Math.round(((total - discount) / total) * 100);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-2 sm:px-4 pt-4 pb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-10 px-1">
          Browse All Products
        </h2>

        {/* Skeleton Loading */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        )}

        {error && <div className="text-center text-red-500">{error}</div>}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {displayedProducts.map((product) => (
                <div
                  key={product._id}
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="bg-white border border-gray-200 overflow-hidden shadow hover:shadow-lg transition cursor-pointer flex flex-col"
                >
                  <div className="relative w-full h-48">
                    <img
                      src={product.imageUrls?.[0] || "/default-product-image.png"}
                      alt={product.name || "Product Image"}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-semibold text-lg text-gray-800 truncate">
                      {product.name}
                    </h3>

                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                      {product.desc}
                    </p>

                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-green-600 font-bold text-lg">
                        ₹{product.discountPrice || product.totalPrice}
                      </span>

                      {product.discountPrice && (
                        <>
                          <span className="line-through text-gray-400">
                            ₹{product.totalPrice}
                          </span>
                          <span className="text-red-500 text-xs font-semibold ml-1">
                            {getDiscountPercent(
                              product.totalPrice,
                              product.discountPrice
                            )}
                            % OFF
                          </span>
                        </>
                      )}
                    </div>

                    {product.sellerId && (
                      <div className="flex items-center gap-2 mt-4">
                        <img
                          src={product.sellerId.logo || "/default-shop-logo.png"}
                          alt={product.sellerId.shopName || "Shop Logo"}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-gray-700 font-medium text-sm">
                          {product.sellerId.shopName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {visibleProducts < productsData.length && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={loadMoreProducts}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Load More Products
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
      <MobileBottomNavbar />
    </>
  );
};

export default ProductsPage;







 {/* {product.featured && (
                    <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                  {product.deliveryAvailable && (
                    <span className="absolute bottom-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      Free Delivery
                    </span>
                  )} */}