import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import MobileBottomNavbar from "../../components/MobileBottomNavbar";
import Footer from "../../components/Footer";
import sellerlogo from "../../assets/logo/shop logo.jpg";
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

      const sorted = (response.data || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setProductsData(sorted);
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

  const getDiscountPercent = (total, discount) =>
    Math.round(((total - discount) / total) * 100);

  const ProductSkeleton = () => (
    <div className="bg-white border border-gray-200 shadow animate-pulse flex flex-col">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-2 sm:px-4 pt-4 pb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
          Browse All Products
        </h2>

        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        )}

        {error && <div className="text-red-500 text-center">{error}</div>}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {displayedProducts.map((product) => (
                <div
                  key={product._id}
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="bg-white border shadow hover:shadow-lg cursor-pointer flex flex-col"
                >
                  {/* IMAGE FIXED */}
                  <div className="relative w-full h-48">
                    <img
                      src={
                        product.imageUrls?.[0]?.url ||
                        product.imageUrls?.[0] ||
                        "/default-product-image.png"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />

                    {/* FEATURED */}
                    {product.featured && (
                      <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded">
                        Featured
                      </span>
                    )}

                    {/* DELIVERY */}
                    {product.deliveryAvailable && (
                      <span className="absolute bottom-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                        Free Delivery
                      </span>
                    )}
                  </div>

                  {/* INFO */}
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-500 line-clamp-2">
                      {product.desc}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-green-600 font-bold">
                        ₹{product.discountPrice || product.totalPrice}
                      </span>

                      {product.discountPrice && (
                        <>
                          <span className="line-through text-gray-400 text-sm">
                            ₹{product.totalPrice}
                          </span>

                          <span className="text-red-500 text-xs font-semibold">
                            {getDiscountPercent(
                              product.totalPrice,
                              product.discountPrice
                            )}
                            % OFF
                          </span>
                        </>
                      )}
                    </div>

                    {/* SELLER */}
                    {product.sellerId && (
                      <div className="flex items-center gap-2 mt-3">
                        <img
                          src={product.sellerId.logo || sellerlogo}
                          alt="seller"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm text-gray-700">
                          {product.sellerId.shopName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* LOAD MORE */}
            {visibleProducts < productsData.length && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={loadMoreProducts}
                  className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Load More
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