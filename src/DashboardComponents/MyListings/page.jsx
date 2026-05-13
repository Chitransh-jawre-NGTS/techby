import React, { useEffect, useState } from "react";
import {
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
  getSellerLimit,
} from "../../Api/ProductApi";

const MyListings = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limitData, setLimitData] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await getSellerProducts();
      setProducts(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLimit = async () => {
    try {
      const res = await getSellerLimit();
      setLimitData(res.data || res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchLimit();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const getIcon = (category) => {
    if (!category) return <Package className="w-4 h-4 text-green-600" />;

    if (category.toLowerCase().includes("mobile"))
      return <Smartphone className="w-4 h-4 text-green-600" />;
    if (category.toLowerCase().includes("laptop"))
      return <Laptop className="w-4 h-4 text-green-600" />;
    if (category.toLowerCase().includes("accessories"))
      return <Headphones className="w-4 h-4 text-green-600" />;

    return <Package className="w-4 h-4 text-green-600" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 px-3 sm:px-6 py-6 sm:py-10">

      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <h1 className="text-2xl sm:text-3xl font-bold text-green-700">
            My Product Listings
          </h1>

        </div>

        {/* LIMIT BAR */}
        {limitData && (
          <div className="w-full bg-white border border-green-100 shadow-sm rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row gap-5 lg:items-center">

            {/* LEFT */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-full">📊</div>
              <div>
                <p className="font-semibold text-gray-700">Listing Usage</p>
                <p className="text-xs text-gray-400">Free + Paid Credits</p>
              </div>
            </div>

            {/* CENTER */}
            <div className="flex flex-wrap gap-2 text-xs">
              <div className="px-3 py-1 bg-gray-100 rounded-full">
                Used: <b className="text-green-600">{limitData.used}</b>
              </div>

              <div className="px-3 py-1 bg-blue-50 rounded-full">
                Free: <b className="text-blue-600">{limitData.remainingFree}</b>
              </div>

              <div className="px-3 py-1 bg-gray-100 rounded-full">
                Total: <b>{limitData.freeLimit}</b>
              </div>
            </div>

            {/* RIGHT PROGRESS */}
            <div className="flex-1 min-w-[180px]">
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-green-500"
                  style={{
                    width: `${Math.min(
                      (limitData.used / limitData.freeLimit) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>

              <p className="text-[11px] text-gray-500 mt-1">
                {Math.round(
                  (limitData.used / limitData.freeLimit) * 100
                )}% used
              </p>
            </div>

            {/* PAID */}
            {(limitData.paidCredits?.normal > 0 ||
              limitData.paidCredits?.featured > 0) && (
              <div className="flex flex-wrap gap-2 text-xs lg:border-l lg:pl-4 pt-3 lg:pt-0">
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  Normal: {limitData.paidCredits.normal}
                </span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                  Featured: {limitData.paidCredits.featured}
                </span>
              </div>
            )}

          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="flex justify-center py-20 text-gray-500">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white border rounded-2xl">
            <Package className="w-12 h-12 mx-auto text-green-400 mb-3" />
            <p className="text-lg font-semibold">No Products Yet</p>
            <p className="text-sm text-gray-500">
              Start listing products to grow your store
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-green-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
              >

                {/* IMAGE */}
                <div className="h-44 overflow-hidden">
                  <img
                    src={
                      product.imageUrls?.[0]?.url ||
                      "/default-product-image.png"
                    }
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>

                {/* CONTENT */}
                <div className="p-4 space-y-2">

                  <h2 className="font-semibold truncate">
                    {product.name}
                  </h2>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    {getIcon(product.category)}
                    <span>{product.category}</span>
                  </div>

                  <p className="text-xs text-gray-500">
                    {product.sellerId?.shopName}
                  </p>

                  <div className="flex justify-between items-center pt-2">

                    <p className="font-bold text-green-700">
                      ₹{product.discountPrice || product.totalPrice}
                    </p>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg"
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
      <button className="fixed bottom-5 right-5 bg-green-600 text-white p-4 rounded-full shadow-lg md:hidden">
        <PlusCircle />
      </button>

    </div>
  );
};

export default MyListings;