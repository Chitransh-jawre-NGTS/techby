import React, { useEffect, useState } from "react";

export default function RecentlyViewed() {
  const [recentItems, setRecentItems] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("recentItems")) || [];
    setRecentItems(data);
  }, []);

  if (recentItems.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-2xl font-bold">
          Recently Viewed
        </h2>
      </div>

      <div className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide">
        {recentItems.map((item) => (
          <div
            key={item._id}
            className="min-w-[140px] sm:min-w-[180px] bg-white rounded-md shadow-sm overflow-hidden border border-gray-200 hover:shadow-lg transition"
          >
            <img
              src={item.imageUrls?.[0]?.url || item.image}
              alt={item.name}
              className="w-full h-28 sm:h-40 object-cover"
            />

            <div className="p-2 sm:p-3">
              <h2 className="text-sm sm:text-lg font-bold text-gray-900">
                ₹{item.discountPrice || item.totalPrice || item.price}
              </h2>

              <h3 className="text-xs sm:text-sm font-medium text-gray-700 line-clamp-2 mt-1">
                {item.name || item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}