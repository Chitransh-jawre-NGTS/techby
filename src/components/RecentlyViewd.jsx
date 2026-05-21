import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export default function RecentlyViewed() {
  const [recentItems, setRecentItems] =
    useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const data =
      JSON.parse(
        localStorage.getItem(
          "recentItems"
        )
      ) || [];

    setRecentItems(data);
  }, []);

  if (recentItems.length === 0)
    return null;

  // ======================================================
  // GO TO PRODUCT PAGE
  // ======================================================

  const handleOpenProduct = (id) => {
    navigate(`/product/${id}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 bg-white">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">

        <h2 className="text-lg sm:text-2xl font-bold">
          Recently Viewed
        </h2>
      </div>

      {/* PRODUCTS */}
      <div className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide">

        {recentItems.map((item) => (
          <div
            key={item._id}
            onClick={() =>
              handleOpenProduct(
                item._id
              )
            }
            className="min-w-[140px] sm:min-w-[180px] bg-white rounded-md shadow-sm overflow-hidden border border-gray-200 hover:shadow-lg transition cursor-pointer"
          >

            {/* IMAGE */}
            <img
              src={
                item.imageUrls?.[0]
                  ?.url || item.image
              }
              alt={item.name}
              className="w-full h-28 sm:h-40 object-cover"
            />

            {/* CONTENT */}
            <div className="p-2 sm:p-3">

              {/* PRICE */}
              <h2 className="text-sm sm:text-lg font-bold text-gray-900">

                ₹
                {item.discountPrice ||
                  item.totalPrice ||
                  item.price}
              </h2>

              {/* TITLE */}
              <h3 className="text-xs sm:text-sm font-medium text-gray-700 line-clamp-2 mt-1">

                {item.name ||
                  item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}