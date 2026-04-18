import React, { useEffect, useState } from "react";
import {
  Edit,
  Trash2,
  Package,
  Laptop,
  Headphones,
  Smartphone,
  PlusCircle,
} from "lucide-react";

import {
  getSellerProducts,
  deleteProduct,
  getSellerLimit, // ✅ ADD THIS
} from "../../Api/ProductApi";

const MyListings = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ LIMIT STATE
  const [limitData, setLimitData] = useState(null);

  // ---------------- FETCH SELLER PRODUCTS ----------------
  const fetchProducts = async () => {
    try {
      const res = await getSellerProducts();
      setProducts(res.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- FETCH LIMIT ----------------
  const fetchLimit = async () => {
    try {
      const res = await getSellerLimit();
      setLimitData(res.data || res);
    } catch (err) {
      console.error("Limit fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchLimit();
  }, []);

  // ---------------- DELETE PRODUCT ----------------
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // ---------------- CATEGORY ICON ----------------
  const getIcon = (category) => {
    if (category.toLowerCase().includes("mobile"))
      return <Smartphone className="w-4 h-4 text-green-600" />;
    if (category.toLowerCase().includes("laptop"))
      return <Laptop className="w-4 h-4 text-green-600" />;
    if (category.toLowerCase().includes("accessories"))
      return <Headphones className="w-4 h-4 text-green-600" />;
    return <Package className="w-4 h-4 text-green-600" />;
  };

  return (
    <div className="min-h-screen bg-white shadow rounded-2xl py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">

          <h1 className="text-3xl font-bold text-green-700">
            My Product Listings
          </h1>

          {/* ✅ LIMIT BOX (ADDED HERE) */}
         {limitData && (
  <div className="bg-white border border-green-100 shadow-md rounded-2xl px-6 py-4 flex items-center justify-between w-full max-w-xl">

    {/* LEFT: ICON + LABEL */}
    <div className="flex items-center gap-3">
      <div className="bg-green-100 p-2 rounded-full">
        📊
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-700">
          Daily Listing Usage
        </p>
        <p className="text-xs text-gray-400">
          Track your product posting limit
        </p>
      </div>
    </div>

    {/* CENTER: NUMBERS */}
    <div className="flex items-center gap-6 text-sm">

      <div className="text-center">
        <p className="text-gray-500 text-xs">Used</p>
        <p className="font-bold text-green-600">
          {limitData.used}
        </p>
      </div>

      <div className="text-center">
        <p className="text-gray-500 text-xs">Remaining</p>
        <p className="font-bold text-blue-600">
          {limitData.remaining}
        </p>
      </div>

      <div className="text-center">
        <p className="text-gray-500 text-xs">Total</p>
        <p className="font-bold text-gray-800">
          {limitData.limit}
        </p>
      </div>
    </div>

    {/* RIGHT: PROGRESS + STATUS */}
    <div className="w-40">

      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all"
          style={{
            width: `${Math.min(
              (limitData.used / limitData.limit) * 100,
              100
            )}%`,
          }}
        />
      </div>

      <p className="text-[10px] text-gray-400 mt-1 text-right">
        {Math.round((limitData.used / limitData.limit) * 100)}% used
      </p>

      {limitData.remaining === 0 && (
        <p className="text-red-500 text-xs mt-1 text-right">
          ⚠ Limit reached
        </p>
      )}
    </div>
  </div>
)}
        </div>

        {/* LOADING */}
        {loading ? (
          <p className="text-center text-gray-500">
            Loading products...
          </p>
        ) : products.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-2xl shadow-sm border border-green-100">
            <Package className="w-12 h-12 mx-auto text-green-400 mb-3" />
            <p className="text-xl font-semibold text-gray-700">
              No Products Yet
            </p>
            <p className="text-sm mt-1 text-gray-500">
              Start listing your products today to reach more customers.
            </p>
          </div>
        ) : (
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">

            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white border border-green-100 overflow-hidden shadow-sm hover:shadow-md transition relative"
              >

                {/* Featured Badge */}
                {product.featured && (
                  <span className="absolute top-3 left-3 bg-yellow-400 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                    Featured
                  </span>
                )}

                {/* Image */}
                <div className="relative">
                  <img
                    src={
                      product.imageUrls?.[0]?.url ||
                      "/default-product-image.png"
                    }
                    alt={product.name}
                    className="w-full h-52 object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-5">

                  <h2 className="font-semibold text-lg text-gray-800 mb-1 truncate">
                    {product.name}
                  </h2>

                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                    {getIcon(product.category)}
                    <span>{product.category.replace("-", " ")}</span>
                  </div>

                  <p className="text-sm text-gray-500 mb-3">
                    Sold by:{" "}
                    <span className="font-medium">
                      {product.sellerId?.shopName}
                    </span>
                  </p>

                  <div className="flex justify-between items-center">

                    <p className="text-xl font-bold text-green-700">
                      ₹{product.discountPrice || product.totalPrice}
                    </p>

                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this product?"
                          )
                        ) {
                          handleDelete(product._id);
                        }
                      }}
                      className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>

      {/* FLOAT BUTTON */}
      <button className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg md:hidden">
        <PlusCircle />
      </button>

    </div>
  );
};

export default MyListings;