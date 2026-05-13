import React, { useEffect, useMemo, useState } from "react";
import {
  FaChevronRight,
  FaFilter,
  FaTimes,
  FaStar,
} from "react-icons/fa";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getAllProducts } from "../../Api/ProductApi";
import sellerlogo from "../../assets/logo/shop logo.jpg";
import MobileBottomNavbar from "../../components/MobileBottomNavbar";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FILTER STATES
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState(100000);
  const [deliveryOnly, setDeliveryOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("");

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

  // NORMALIZE
  const normalize = (str) => {
    return (str || "")
      .toLowerCase()
      .replace(/-/g, " ")
      .replace(/s$/g, "")
      .trim();
  };

  // UNIQUE BRANDS
  const brands = useMemo(() => {
    return [
      ...new Set(
        products
          .map((p) => p.attributes?.brand)
          .filter(Boolean)
      ),
    ];
  }, [products]);

  // UNIQUE CATEGORIES
  const categories = useMemo(() => {
    return [
      ...new Set(products.map((p) => p.category).filter(Boolean)),
    ];
  }, [products]);

  // FILTER PRODUCTS
const filteredProducts = useMemo(() => {
  let filtered = [...products];

  // SHOW NEWEST PRODUCTS FIRST
  filtered.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // SEARCH FILTER
  if (query) {
    const queryWords = query
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .map(normalize);

    filtered = filtered.filter((product) => {
      const productFields = [
        product.name,
        product.category,
        product.desc,
        product.attributes?.brand,
        product.attributes?.model,
        product.sellerId?.shopName,
      ]
        .filter(Boolean)
        .map(normalize)
        .join(" ");

      return queryWords.every((word) =>
        productFields.includes(word)
      );
    });
  }

  // CATEGORY PARAM
  if (category) {
    filtered = filtered.filter(
      (p) => normalize(p.category) === normalize(category)
    );
  }

  // CATEGORY FILTER
  if (selectedCategory) {
    filtered = filtered.filter(
      (p) =>
        normalize(p.category) ===
        normalize(selectedCategory)
    );
  }

  // BRAND FILTER
  if (selectedBrands.length > 0) {
    filtered = filtered.filter((p) =>
      selectedBrands.includes(p.attributes?.brand)
    );
  }

  // PRICE FILTER
  filtered = filtered.filter(
    (p) =>
      Number(p.discountPrice || p.totalPrice) <= priceRange
  );

  // DELIVERY FILTER
  if (deliveryOnly) {
    filtered = filtered.filter((p) => p.deliveryAvailable);
  }

  // FEATURED FILTER
  if (featuredOnly) {
    filtered = filtered.filter((p) => p.featured);
  }

  // SORTING
  if (sortBy === "low-high") {
    filtered.sort(
      (a, b) =>
        (a.discountPrice || a.totalPrice) -
        (b.discountPrice || b.totalPrice)
    );
  }

  if (sortBy === "high-low") {
    filtered.sort(
      (a, b) =>
        (b.discountPrice || b.totalPrice) -
        (a.discountPrice || a.totalPrice)
    );
  }

  return filtered;
}, [
  products,
  query,
  category,
  selectedBrands,
  selectedCategory,
  priceRange,
  deliveryOnly,
  featuredOnly,
  sortBy,
]);

  // BRAND TOGGLE
  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-3 sm:px-5 py-6">
        {/* BREADCRUMB */}
        <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-5 flex-wrap">
          <span>Home</span>
          <FaChevronRight className="mx-2" size={10} />
          <span>Shop</span>
          <FaChevronRight className="mx-2" size={10} />

          <span className="font-medium text-gray-900">
            {category
              ? category.replace("-", " ").toUpperCase()
              : query
              ? `Search: "${query}"`
              : "All Products"}
          </span>
        </div>

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-5 gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              {category
                ? "Category Results"
                : query
                ? "Search Results"
                : "All Products"}
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              {filteredProducts.length} products found
            </p>
          </div>

          {/* MOBILE FILTER BTN */}
          <button
            onClick={() => setShowFilters(true)}
            className="lg:hidden flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg"
          >
            <FaFilter />
            Filters
          </button>
        </div>

        <div className="flex gap-6">
          {/* SIDEBAR FILTERS */}
         <div
  className={`fixed lg:sticky top-0 left-0 z-50 lg:z-0 h-full lg:h-fit w-[300px] bg-white/95 backdrop-blur-xl border-r lg:border border-green-100 shadow-2xl lg:shadow-lg p-5 overflow-y-auto transition-all duration-300 rounded-none lg:rounded-3xl ${
    showFilters
      ? "translate-x-0"
      : "-translate-x-full lg:translate-x-0"
  }`}
>
  {/* MOBILE HEADER */}
  <div className="flex items-center justify-between mb-6 lg:hidden">
    <h3 className="text-xl font-bold text-gray-800">
      Filters
    </h3>

    <button
      onClick={() => setShowFilters(false)}
      className="w-9 h-9 rounded-full bg-green-50 hover:bg-green-100 text-green-700 flex items-center justify-center transition"
    >
      <FaTimes size={18} />
    </button>
  </div>

  {/* FILTER TITLE */}
  <div className="hidden lg:flex items-center gap-3 mb-6">
    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center shadow-lg">
      <FaFilter />
    </div>

    <div>
      <h2 className="font-bold text-lg text-gray-800">
        Filters
      </h2>

      <p className="text-xs text-gray-500">
        Find your perfect gadget
      </p>
    </div>
  </div>

  {/* SORT */}
  <div className="mb-7">
    <h3 className="font-semibold mb-3 text-gray-800">
      Sort By
    </h3>

    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="w-full border border-green-100 bg-green-50/40 rounded-2xl p-3 text-sm outline-none focus:ring-2 focus:ring-green-500 transition"
    >
      <option value="">Recommended</option>

      <option value="low-high">
        Price: Low to High
      </option>

      <option value="high-low">
        Price: High to Low
      </option>
    </select>
  </div>

  {/* CATEGORY */}
  <div className="mb-7">
    <h3 className="font-semibold mb-3 text-gray-800">
      Categories
    </h3>

    <div className="space-y-3">
      {categories.map((cat, i) => (
        <label
          key={i}
          className={`flex items-center gap-3 text-sm cursor-pointer border rounded-2xl px-3 py-2 transition-all ${
            selectedCategory === cat
              ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-600 shadow-md"
              : "border-green-100 hover:border-green-400 hover:bg-green-50"
          }`}
        >
          <input
            type="radio"
            name="category"
            checked={selectedCategory === cat}
            onChange={() => setSelectedCategory(cat)}
            className="accent-green-600"
          />

          <span className="truncate">{cat}</span>
        </label>
      ))}
    </div>
  </div>

  {/* BRANDS */}
  <div className="mb-7">
    <h3 className="font-semibold mb-3 text-gray-800">
      Brands
    </h3>

    <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
      {brands.map((brand, i) => (
        <label
          key={i}
          className={`flex items-center gap-3 text-sm cursor-pointer border rounded-2xl px-3 py-2 transition-all ${
            selectedBrands.includes(brand)
              ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-600 shadow-md"
              : "border-green-100 hover:border-green-400 hover:bg-green-50"
          }`}
        >
          <input
            type="checkbox"
            checked={selectedBrands.includes(brand)}
            onChange={() => toggleBrand(brand)}
            className="accent-green-600"
          />

          <span className="truncate">{brand}</span>
        </label>
      ))}
    </div>
  </div>

  {/* PRICE */}
  <div className="mb-7">
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-semibold text-gray-800">
        Price Range
      </h3>

      <span className="text-sm font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">
        ₹{priceRange}
      </span>
    </div>

    <input
      type="range"
      min="1000"
      max="100000"
      value={priceRange}
      onChange={(e) =>
        setPriceRange(e.target.value)
      }
      className="w-full accent-green-600 cursor-pointer"
    />

    <div className="flex justify-between text-xs text-gray-500 mt-2">
      <span>₹1K</span>
      <span>₹100K</span>
    </div>
  </div>

  {/* EXTRA */}
  <div className="space-y-4">
    <label className="flex items-center justify-between border border-green-100 rounded-2xl px-4 py-3 cursor-pointer hover:border-green-400 hover:bg-green-50 transition">
      <div>
        <p className="text-sm font-medium text-gray-800">
          Free Delivery
        </p>

        <p className="text-xs text-gray-500">
          Show delivery products
        </p>
      </div>

      <input
        type="checkbox"
        checked={deliveryOnly}
        onChange={() =>
          setDeliveryOnly(!deliveryOnly)
        }
        className="accent-green-600 w-4 h-4"
      />
    </label>

    <label className="flex items-center justify-between border border-green-100 rounded-2xl px-4 py-3 cursor-pointer hover:border-green-400 hover:bg-green-50 transition">
      <div>
        <p className="text-sm font-medium text-gray-800">
          Featured Products
        </p>

        <p className="text-xs text-gray-500">
          Premium verified listings
        </p>
      </div>

      <input
        type="checkbox"
        checked={featuredOnly}
        onChange={() =>
          setFeaturedOnly(!featuredOnly)
        }
        className="accent-green-600 w-4 h-4"
      />
    </label>
  </div>

  {/* RESET */}
  <button
    onClick={() => {
      setSelectedBrands([]);
      setSelectedCategory("");
      setPriceRange(100000);
      setDeliveryOnly(false);
      setFeaturedOnly(false);
      setSortBy("");
    }}
    className="w-full mt-7 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-2xl text-sm font-semibold transition-all shadow-lg hover:scale-[1.02]"
  >
    Clear Filters
  </button>
</div>

          {/* OVERLAY */}
          {showFilters && (
            <div
              onClick={() => setShowFilters(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
          )}

          {/* PRODUCTS */}
          <div className="flex-1">
 {/* LOADING */}
{loading && (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

    {[...Array(10)].map((_, index) => (
      <div
        key={index}
        className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse"
      >

        {/* Image Skeleton */}
        <div className="w-full h-44 bg-gray-200"></div>

        {/* Content */}
        <div className="p-4">

          {/* Title */}
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>

          {/* Price */}
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>

          {/* Location */}
          <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>

          {/* Small Details */}
          <div className="h-3 bg-gray-200 rounded w-5/6 mb-2"></div>

          <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>

          {/* Button */}
          <div className="h-10 bg-gray-200 rounded-xl mt-5"></div>

        </div>

      </div>
    ))}

  </div>
)}
            

            {/* ERROR */}
            {error && !loading && (
              <p className="text-center text-red-500 text-lg">
                {error}
              </p>
            )}

            {/* NO RESULTS */}
            {!loading &&
              !error &&
              filteredProducts.length === 0 && (
                <p className="text-center text-gray-500 text-lg">
                  No products found.
                </p>
              )}

            {/* GRID */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
              {!loading &&
                !error &&
                filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    onClick={() =>
                      navigate(`/product/${product._id}`)
                    }
                    className="bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer  overflow-hidden group"
                  >
                    {/* IMAGE */}
                    <div className="relative h-40 sm:h-56 overflow-hidden">
                      <img
                        src={
                          product.imageUrls?.[0]?.url ||
                          "/default-product-image.png"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />

                      {product.featured && (
                        <span className="absolute top-2 left-2 bg-yellow-400 text-black text-[10px] sm:text-xs font-semibold px-2 py-1 rounded">
                          Featured
                        </span>
                      )}

                      {product.deliveryAvailable && (
                        <span className="absolute bottom-2 right-2 bg-green-600 text-white text-[10px] sm:text-xs font-semibold px-2 py-1 rounded">
                          Free Delivery
                        </span>
                      )}
                    </div>

                    {/* CONTENT */}
                    <div className="p-3 sm:p-4">
                      <p className="text-xs sm:text-sm text-gray-500 truncate">
                        {product.desc}
                      </p>

                      <h3 className="font-semibold text-sm sm:text-lg text-gray-800 truncate mt-1">
                        {product.name}
                      </h3>

                      {/* RATING */}
                      <div className="flex items-center gap-1 mt-2">
                        <div className="bg-green-600 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                          4.3 <FaStar size={10} />
                        </div>

                        <span className="text-xs text-gray-500">
                          Trusted Seller
                        </span>
                      </div>

                      {/* PRICE */}
                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <span className="text-green-600 font-bold text-sm sm:text-xl">
                          ₹
                          {product.discountPrice ||
                            product.totalPrice}
                        </span>

                        {product.discountPrice && (
                          <>
                            <span className="text-red-500 text-xs font-semibold">
                              {Math.round(
                                ((product.totalPrice -
                                  product.discountPrice) /
                                  product.totalPrice) *
                                  100
                              )}
                              % OFF
                            </span>

                            <span className="line-through text-gray-400 text-xs sm:text-sm">
                              ₹{product.totalPrice}
                            </span>
                          </>
                        )}
                      </div>

                      {/* SELLER */}
                      {product.sellerId && (
                        <div className="flex items-center gap-2 mt-4 border-t pt-3">
                          <img
                            src={
                              product.sellerId.logo ||
                              sellerlogo
                            }
                            alt={
                              product.sellerId.shopName
                            }
                            className="w-9 h-9 rounded-full object-cover border"
                          />

                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-700 truncate">
                              {
                                product.sellerId
                                  .shopName
                              }
                            </p>

                            {product.sellerId.location && (
                              <p className="text-xs text-gray-500 truncate">
                                {
                                  product.sellerId
                                    .location
                                }
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <MobileBottomNavbar/>
    </>
  );
};

export default SearchPage;