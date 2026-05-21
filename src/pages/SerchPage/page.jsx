import React, { useEffect, useMemo, useState } from "react";

import {
  FaChevronRight,
  FaFilter,
  FaTimes,
  FaMapMarkerAlt,
  FaShareAlt,
} from "react-icons/fa";

import {
  useSearchParams,
  useNavigate,
} from "react-router-dom";

import Navbar from "../../components/Navbar";
import MobileBottomNavbar from "../../components/MobileBottomNavbar";

import { getAllProducts } from "../../Api/ProductApi";
import NoProductsFound from "../../components/NoProductsFound";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ================= FILTER STATES =================
  const [showFilters, setShowFilters] =
    useState(false);

  const [selectedBrands, setSelectedBrands] =
    useState([]);

  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [priceRange, setPriceRange] =
    useState(1000000);

  const [deliveryOnly, setDeliveryOnly] =
    useState(false);

  const [featuredOnly, setFeaturedOnly] =
    useState(false);

  const [sortBy, setSortBy] = useState("");

  const query = searchParams.get("q") || "";

  const category =
    searchParams.get("category") || "";

  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    fetchProducts();
  }, [query, category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await getAllProducts();

      setProducts(response?.data?.products || []);

      setError("");
    } catch (err) {
      console.log(err);

      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  // ================= NORMALIZE =================
  const normalize = (str) => {
    return (str || "")
      .toLowerCase()
      .replace(/-/g, " ")
      .replace(/s$/g, "")
      .trim();
  };

  // ================= UNIQUE BRANDS =================
  const brands = useMemo(() => {
    return [
      ...new Set(
        products
          .map((p) => p.attributes?.brand)
          .filter(Boolean)
      ),
    ];
  }, [products]);

  // ================= UNIQUE CATEGORIES =================
  const categories = useMemo(() => {
    return [
      ...new Set(
        products
          .map((p) => p.category)
          .filter(Boolean)
      ),
    ];
  }, [products]);

  // ================= FILTER PRODUCTS =================
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // NEWEST FIRST
    filtered.sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
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
        (p) =>
          normalize(p.category) ===
          normalize(category)
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
        selectedBrands.includes(
          p.attributes?.brand
        )
      );
    }

    // PRICE FILTER
    filtered = filtered.filter(
      (p) =>
        Number(
          p.discountPrice || p.totalPrice
        ) <= priceRange
    );

    // DELIVERY FILTER
    if (deliveryOnly) {
      filtered = filtered.filter(
        (p) => p.deliveryAvailable
      );
    }

    // FEATURED FILTER
    if (featuredOnly) {
      filtered = filtered.filter(
        (p) => p.featured
      );
    }

    // SORT LOW TO HIGH
    if (sortBy === "low-high") {
      filtered.sort(
        (a, b) =>
          (a.discountPrice ||
            a.totalPrice) -
          (b.discountPrice ||
            b.totalPrice)
      );
    }

    // SORT HIGH TO LOW
    if (sortBy === "high-low") {
      filtered.sort(
        (a, b) =>
          (b.discountPrice ||
            b.totalPrice) -
          (a.discountPrice ||
            a.totalPrice)
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

  // ================= TOGGLE BRAND =================
  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  // ================= SHARE =================
  const handleShare = async (product) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: product.desc,
          url: `${window.location.origin}/product/${product._id}`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-3 sm:px-5 py-6">

        {/* BREADCRUMB */}
        <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-5 flex-wrap">

          <span>Home</span>

          <FaChevronRight
            className="mx-2"
            size={10}
          />

          <span>Shop</span>

          <FaChevronRight
            className="mx-2"
            size={10}
          />

          <span className="font-medium text-gray-900">
            {category
              ? category
                  .replace("-", " ")
                  .toUpperCase()
              : query
              ? `Search: "${query}"`
              : "All Products"}
          </span>
        </div>

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-5 gap-3">

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {category
                ? "Category Results"
                : query
                ? "Search Results"
                : "All Products"}
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              {filteredProducts.length} products
              found
            </p>
          </div>

          {/* MOBILE FILTER BTN */}
          <button
            onClick={() =>
              setShowFilters(true)
            }
            className="lg:hidden flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl"
          >
            <FaFilter />
            Filters
          </button>
        </div>

        <div className="flex gap-6">

          {/* SIDEBAR */}
          <div
            className={`fixed lg:sticky top-0 left-0 z-50 lg:z-0 h-full lg:h-fit w-[300px] bg-white border-r lg:border border-gray-200 shadow-2xl lg:shadow-sm p-5 overflow-y-auto transition-all duration-300 rounded-none lg:rounded-3xl ${
              showFilters
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }`}
          >

            {/* MOBILE HEADER */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h3 className="text-xl font-bold">
                Filters
              </h3>

              <button
                onClick={() =>
                  setShowFilters(false)
                }
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
              >
                <FaTimes />
              </button>
            </div>

            {/* SORT */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">
                Sort By
              </h3>

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
                className="w-full border rounded-xl p-3 text-sm"
              >
                <option value="">
                  Recommended
                </option>

                <option value="low-high">
                  Price: Low to High
                </option>

                <option value="high-low">
                  Price: High to Low
                </option>
              </select>
            </div>

            {/* CATEGORIES */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">
                Categories
              </h3>

              <div className="space-y-2">
                {categories.map((cat, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-3 text-sm cursor-pointer"
                  >
                    <input
                      type="radio"
                      checked={
                        selectedCategory === cat
                      }
                      onChange={() =>
                        setSelectedCategory(cat)
                      }
                    />

                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {/* BRANDS */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">
                Brands
              </h3>

              <div className="space-y-2 max-h-52 overflow-y-auto">
                {brands.map((brand, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-3 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(
                        brand
                      )}
                      onChange={() =>
                        toggleBrand(brand)
                      }
                    />

                    {brand}
                  </label>
                ))}
              </div>
            </div>

            {/* PRICE */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">
                  Price Range
                </h3>

                <span className="text-sm font-bold text-green-600">
                  ₹{priceRange}
                </span>
              </div>

              <input
                type="range"
                min="1000"
                max="1000000"
                value={priceRange}
                onChange={(e) =>
                  setPriceRange(e.target.value)
                }
                className="w-full"
              />
            </div>

            {/* DELIVERY */}
            <div className="space-y-3">
              <label className="flex items-center justify-between text-sm">
                Free Delivery

                <input
                  type="checkbox"
                  checked={deliveryOnly}
                  onChange={() =>
                    setDeliveryOnly(
                      !deliveryOnly
                    )
                  }
                />
              </label>

              <label className="flex items-center justify-between text-sm">
                Featured Products

                <input
                  type="checkbox"
                  checked={featuredOnly}
                  onChange={() =>
                    setFeaturedOnly(
                      !featuredOnly
                    )
                  }
                />
              </label>
            </div>

            {/* RESET */}
            <button
              onClick={() => {
                setSelectedBrands([]);
                setSelectedCategory("");
                setPriceRange(1000000);
                setDeliveryOnly(false);
                setFeaturedOnly(false);
                setSortBy("");
              }}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-sm font-semibold transition"
            >
              Clear Filters
            </button>
          </div>

          {/* OVERLAY */}
          {showFilters && (
            <div
              onClick={() =>
                setShowFilters(false)
              }
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
          )}

          {/* PRODUCTS */}
          <div className="flex-1">

            {/* LOADING */}
            {loading && (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse"
                  >
                    <div className="h-52 bg-gray-200"></div>

                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-3"></div>

                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ERROR */}
            {error && !loading && (
              <p className="text-center text-red-500">
                {error}
              </p>
            )}

            {/* NO PRODUCTS */}
            {!loading &&
              !error &&
              filteredProducts.length === 0 && (
                <NoProductsFound/>
              )}

            {/* PRODUCT GRID */}
            {!loading &&
              !error &&
              filteredProducts.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">

                  {filteredProducts.map(
                    (product) => (
                      <div
                        key={product._id}
                        onClick={() =>
                          navigate(
                            `/product/${product._id}`
                          )
                        }
                        className={`bg-white  overflow-hidden cursor-pointer transition-all group relative border
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
                              product
                                .imageUrls?.[0]
                                ?.url ||
                              "/default-product-image.png"
                            }
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />

                          {/* SHARE */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();

                              handleShare(
                                product
                              );
                            }}
                            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm"
                          >
                            <FaShareAlt className="text-gray-700 text-sm" />
                          </button>

                          {/* CATEGORY */}
                          <span className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                            {product.category ||
                              "Product"}
                          </span>
                        </div>

                        {/* CONTENT */}
                        <div className="p-4">

                          {/* PRICE */}
                          <div className="flex items-center justify-between gap-2">

                            <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
                              ₹
                              {product.discountPrice ||
                                product.totalPrice}
                            </h3>

                            <span className="text-[10px] sm:text-xs text-gray-500">
                              {new Date(
                                product.createdAt
                              ).toLocaleDateString()}
                            </span>
                          </div>

                          {/* NAME */}
                          <h4 className="mt-2 text-sm font-medium text-gray-800 line-clamp-2">
                            {product.name}
                          </h4>

                          {/* DESC */}
                          {product.desc && (
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                              {product.desc}
                            </p>
                          )}

                          {/* LOCATION */}
                          <div className="flex items-center gap-2 mt-4 text-gray-500 text-xs sm:text-sm">

                            <FaMapMarkerAlt className="text-gray-700" />

                            <span className="truncate font-medium text-gray-700">
                              {product.location ||
                                "Indore, Madhya Pradesh"}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
          </div>
        </div>
      </div>

      {/* MOBILE NAV */}
      <div className="lg:hidden">
        <MobileBottomNavbar />
      </div>
    </>
  );
};

export default SearchPage;