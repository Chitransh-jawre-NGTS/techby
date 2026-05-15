import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFilter,
  FaTimes,
  FaStar,
} from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { getAllProducts } from "../../Api/ProductApi";
import sellerlogo from "../../assets/logo/shop logo.jpg";
import Navbar from "../../components/Navbar";
import MobileBottomNavbar from "../../components/MobileBottomNavbar";
import MobileNavbar from "../../components/MobileNavbar";

const ProductsPage = ({
  heading = "Products Near You",
}) => {
  const [productsData, setProductsData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // FILTER STATES
  const [showFilters, setShowFilters] =
    useState(false);

  const [selectedBrands, setSelectedBrands] =
    useState([]);

  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [priceRange, setPriceRange] =
    useState(100000);

  const [deliveryOnly, setDeliveryOnly] =
    useState(false);

  const [featuredOnly, setFeaturedOnly] =
    useState(false);

  const [sortBy, setSortBy] = useState("");

  const navigate = useNavigate();

  const itemsPerLoad = 20;
  const observer = useRef();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();

      const sortedProducts = response.data.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );

      setProductsData(sortedProducts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // UNIQUE BRANDS
  const brands = useMemo(() => {
    return [
      ...new Set(
        productsData
          .map((p) => p.attributes?.brand)
          .filter(Boolean)
      ),
    ];
  }, [productsData]);

  // UNIQUE CATEGORIES
  const categories = useMemo(() => {
    return [
      ...new Set(
        productsData
          .map((p) => p.category)
          .filter(Boolean)
      ),
    ];
  }, [productsData]);

  // FILTERED PRODUCTS
  const filteredProducts = useMemo(() => {
    let filtered = [...productsData];

    // CATEGORY
    if (selectedCategory) {
      filtered = filtered.filter(
        (p) =>
          p.category?.toLowerCase() ===
          selectedCategory.toLowerCase()
      );
    }

    // BRAND
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) =>
        selectedBrands.includes(
          p.attributes?.brand
        )
      );
    }

    // PRICE
    filtered = filtered.filter(
      (p) =>
        Number(
          p.discountPrice || p.totalPrice
        ) <= priceRange
    );

    // DELIVERY
    if (deliveryOnly) {
      filtered = filtered.filter(
        (p) => p.deliveryAvailable
      );
    }

    // FEATURED
    if (featuredOnly) {
      filtered = filtered.filter(
        (p) => p.featured
      );
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
    productsData,
    selectedCategory,
    selectedBrands,
    priceRange,
    deliveryOnly,
    featuredOnly,
    sortBy,
  ]);

  // DISPLAY PRODUCTS
  const displayedProducts = filteredProducts.slice(
    0,
    visibleCount
  );

  const skeletonArray = Array.from({
    length: 20,
  });

  const getDiscountPercent = (
    total,
    discount
  ) =>
    Math.round(
      ((total - discount) / total) * 100
    );

  // BRAND TOGGLE
  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  // INFINITE SCROLL
  const lastProductRef = useCallback(
    (node) => {
      if (loadingMore) return;

      if (observer.current)
        observer.current.disconnect();

      observer.current =
        new IntersectionObserver((entries) => {
          if (
            entries[0].isIntersecting &&
            visibleCount <
              filteredProducts.length
          ) {
            setLoadingMore(true);

            setTimeout(() => {
              setVisibleCount(
                (prev) => prev + itemsPerLoad
              );

              setLoadingMore(false);
            }, 800);
          }
        });

      if (node) observer.current.observe(node);
    },
    [
      loadingMore,
      visibleCount,
      filteredProducts.length,
    ]
  );

  const handleShare = async (product) => {
  const productUrl = `${window.location.origin}/product/${product._id}`;

  const message = `
🛍 PRODUCT DETAILS

📌 Name: ${product.name}
💰 Price: ₹${product.discountPrice || product.totalPrice}
🏷 Category: ${product.category || "N/A"}
🚚 Delivery: ${product.deliveryAvailable ? "Available" : "Not Available"}
⭐ Featured: ${product.featured ? "Yes" : "No"}
📍 Location: ${product?.sellerId?.location || "Indore"}

🔗 View Product:
${productUrl}
  `.trim();

  // ✅ 1. Native Share (WhatsApp / Instagram / apps)
  if (navigator.share) {
    try {
      await navigator.share({
        title: product.name,
        text: message,
        url: productUrl,
      });
      return;
    } catch (err) {
      console.log("Share cancelled or failed");
    }
  }

  // ✅ 2. WhatsApp Direct Share (fallback option)
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    message
  )}`;

  // Try opening WhatsApp first
  const opened = window.open(whatsappUrl, "_blank");

  // If blocked → fallback copy
  if (!opened) {
    try {
      await navigator.clipboard.writeText(message);
      alert("Product details copied to clipboard!");
    } catch (err) {
      alert("Unable to share or copy!");
    }
  }
};

  return (
    <>
      <MobileNavbar/>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 pt-4 pb-8">
        {/* TOP */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold">
              Browse All Products
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              {filteredProducts.length} Products
            </p>
          </div>

          {/* MOBILE FILTER BUTTON */}
          <button
            onClick={() =>
              setShowFilters(true)
            }
            className="lg:hidden bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FaFilter />
            Filters
          </button>
        </div>

        <div className="flex gap-5">
          {/* FILTERS */}
          <div
            className={`fixed lg:sticky top-0 left-0 z-50 lg:z-0 h-full lg:h-fit w-[280px] bg-white lg:bg-transparent border-r lg:border border-gray-200 p-5 overflow-y-auto transition-all duration-300 ${
              showFilters
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }`}
          >
            {/* MOBILE HEADER */}
            <div className="flex items-center justify-between mb-5 lg:hidden">
              <h3 className="text-lg font-bold">
                Filters
              </h3>

              <button
                onClick={() =>
                  setShowFilters(false)
                }
              >
                <FaTimes size={20} />
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
                className="w-full border border-gray-300 rounded-lg p-2"
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

            {/* CATEGORY */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">
                Category
              </h3>

              <div className="space-y-2">
                {categories.map((cat, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="category"
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
                    className="flex items-center gap-2 text-sm cursor-pointer"
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
              <h3 className="font-semibold mb-3">
                Price Range
              </h3>

              <input
                type="range"
                min="1000"
                max="100000"
                value={priceRange}
                onChange={(e) =>
                  setPriceRange(
                    e.target.value
                  )
                }
                className="w-full"
              />

              <p className="text-sm text-gray-600 mt-2">
                Up to ₹{priceRange}
              </p>
            </div>

            {/* EXTRA FILTERS */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={deliveryOnly}
                  onChange={() =>
                    setDeliveryOnly(
                      !deliveryOnly
                    )
                  }
                />

                Free Delivery
              </label>

              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={featuredOnly}
                  onChange={() =>
                    setFeaturedOnly(
                      !featuredOnly
                    )
                  }
                />

                Featured Products
              </label>
            </div>

            {/* CLEAR */}
            <button
              onClick={() => {
                setSelectedBrands([]);
                setSelectedCategory("");
                setPriceRange(100000);
                setDeliveryOnly(false);
                setFeaturedOnly(false);
                setSortBy("");
              }}
              className="w-full mt-6 bg-gray-100 hover:bg-gray-200 py-2 rounded-lg text-sm font-medium"
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

          {/* PRODUCTS GRID */}
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
              {/* LOADING */}
              {loading &&
                skeletonArray.map(
                  (_, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 animate-pulse rounded-xl overflow-hidden"
                    >
                      <div className="w-full h-52 bg-gray-200"></div>

                      <div className="p-4">
                        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>

                        <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>

                        <div className="h-5 bg-gray-300 rounded w-1/2"></div>
                      </div>
                    </div>
                  )
                )}

              {/* PRODUCTS */}
              {!loading &&
                displayedProducts.map(
                  (product, index) => (
                    <div
                      ref={
                        index ===
                        displayedProducts.length -
                          1
                          ? lastProductRef
                          : null
                      }
                      key={product._id}
                      onClick={() =>
                        navigate(
                          `/product/${product._id}`
                        )
                      }
                      className="bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer rounded-xl overflow-hidden group"
                    >
                      {/* IMAGE */}
                      <div className="relative h-40 sm:h-56 overflow-hidden">
                        <img
                          src={
                            product.imageUrls?.[0]
                              ?.url ||
                            "/default-product-image.png"
                          }
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
          <button
  onClick={(e) => {
    e.stopPropagation();
    handleShare(product);
  }}
  className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-md transition"
>
  <FiShare2 size={16} />
</button>
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
        

                      {/* INFO */}
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
                            4.3{" "}
                            <FaStar size={10} />
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
                                {getDiscountPercent(
                                  product.totalPrice,
                                  product.discountPrice
                                )}
                                % OFF
                              </span>

                              <span className="line-through text-gray-400 text-xs sm:text-sm">
                                ₹
                                {
                                  product.totalPrice
                                }
                              </span>
                            </>
                          )}
                        </div>

                        {/* SELLER */}
                        {product.sellerId && (
                          <div className="flex items-center gap-2 mt-4 border-t pt-3">
                            <img
                              src={
                                product.sellerId
                                  .logo ||
                                sellerlogo
                              }
                              alt={
                                product.sellerId
                                  .shopName
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

                              {product.sellerId
                                .location && (
                                <p className="text-xs text-gray-500 truncate">
                                  {
                                    product
                                      .sellerId
                                      .location
                                  }
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                )}
            </div>

            {/* LOADING MORE */}
            {loadingMore && (
              <div className="flex justify-center items-center py-8">
                <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>
      </div>
      <MobileBottomNavbar/>
    </>
  );
};

export default ProductsPage;