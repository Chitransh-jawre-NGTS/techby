import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getAllProducts } from "../../Api/ProductApi";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  useEffect(() => {
    fetchProducts();
  }, [query, category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getAllProducts();
      setProducts(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  // Normalize text for better matching
  const normalize = (str) => {
    return (str || "")
      .toLowerCase()
      .replace(/-/g, " ")
      .replace(/s$/g, "")
      .trim();
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const queryWords = query
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .map(normalize);

    const productFields = [
      product.name,
      product.category,
      product.desc,
      product.attributes?.brand,
      product.attributes?.model,
      product.sellerId?.shopName, // ✅ STORE SEARCH ENABLED
    ]
      .filter(Boolean)
      .map(normalize)
      .join(" ");

    return queryWords.every((word) => productFields.includes(word));
  });

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6 flex-wrap">
          <span>Home</span>
          <FaChevronRight className="mx-2" size={12} />
          <span>Shop</span>
          <FaChevronRight className="mx-2" size={12} />

          <span className="font-medium text-gray-900">
            {category
              ? category.replace("-", " ").toUpperCase()
              : query
              ? `Search: "${query}"`
              : "All Products"}
          </span>
        </div>

        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">
            {category
              ? "Category Results"
              : query
              ? "Search Results"
              : "All Products"}
          </h2>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500 text-lg animate-pulse">
            Loading products...
          </p>
        )}

        {/* Error */}
        {error && !loading && (
          <p className="text-center text-red-500 text-lg">{error}</p>
        )}

        {/* No Results */}
        {!loading && !error && filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 text-lg">
            No products found.
          </p>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-5 lg:gap-6">
          {!loading &&
            !error &&
            filteredProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                className="bg-white border border-gray-200 overflow-hidden shadow hover:shadow-lg transition cursor-pointer flex flex-col"
              >

                {/* Product Image */}
                <div className="relative w-full h-48">
                  <img
                    src={product.imageUrls?.[0] || "/default-product-image.png"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />

                 
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-semibold text-lg text-gray-800 truncate">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-green-600 font-bold text-lg">
                      ₹{product.discountPrice || product.totalPrice}
                    </span>

                    {product.discountPrice && (
                      <span className="line-through text-gray-400">
                        ₹{product.totalPrice}
                      </span>
                    )}
                  </div>

                  {/* Seller */}
                  {product.sellerId && (
                    <div className="flex items-center gap-2 mt-2">
                      <img
                        src={product.sellerId.logo || "/default-shop-logo.png"}
                        alt={product.sellerId.shopName}
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
      </div>
    </>
  );
};

export default SearchPage;












//  {product.featured && (
//                     <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded">
//                       Featured
//                     </span>
//                   )}

//                   {product.deliveryAvailable && (
//                     <span className="absolute bottom-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
//                       Free Delivery
//                     </span>
//                   )}