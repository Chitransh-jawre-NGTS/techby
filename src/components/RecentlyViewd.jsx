import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function RecentlyViewed() {
  const [recentItems, setRecentItems] =
    useState([]);

  const navigate = useNavigate();

  // ======================================================
  // LOAD RECENT ITEMS
  // ======================================================

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
  // OPEN PRODUCT
  // ======================================================

  const handleOpenProduct = (id) => {
    navigate(`/product/${id}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-8">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <div>
          <div className="flex items-center gap-2 text-green-600 mb-1">
            <FaClock className="text-sm" />

            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide">
              Your Activity
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Recently Viewed
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Continue exploring products you viewed recently
          </p>
        </div>

   
      </div>

      {/* PRODUCTS */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">

        {recentItems.map((item) => (
          <div
            key={item._id}
            onClick={() =>
              handleOpenProduct(
                item._id
              )
            }
            className="
              min-w-[180px]
              sm:min-w-[240px]
              bg-white
              rounded-2xl
              overflow-hidden
              border border-gray-200
              hover:border-green-300
              hover:shadow-xl
              transition-all
              duration-300
              cursor-pointer
              group
            "
          >

            {/* IMAGE */}
            <div className="relative overflow-hidden">

              <img
                src={
                  item.imageUrls?.[0]
                    ?.url || item.image
                }
                alt={item.name}
                className="
                  w-full
                  h-40 sm:h-56
                  object-cover
                  group-hover:scale-105
                  transition-transform
                  duration-500
                "
              />

              {/* OVERLAY */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/40
                  via-transparent
                  to-transparent
                "
              />

              {/* RECENT TAG */}
              <div
                className="
                  absolute top-3 left-3
                  bg-white/90
                  backdrop-blur-sm
                  px-3 py-1
                  rounded-full
                  text-[11px]
                  font-semibold
                  text-gray-700
                  shadow-sm
                "
              >
                Recently Viewed
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-4">

              {/* PRICE */}
              <div className="flex items-center justify-between">

                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  ₹
                  {item.discountPrice ||
                    item.totalPrice ||
                    item.price}
                </h2>

                {item.discountPrice &&
                  item.totalPrice && (
                    <span
                      className="
                        bg-green-100
                        text-green-700
                        text-xs
                        font-bold
                        px-2 py-1
                        rounded-full
                      "
                    >
                      SALE
                    </span>
                  )}
              </div>

              {/* TITLE */}
              <h3
                className="
                  text-sm sm:text-base
                  font-semibold
                  text-gray-800
                  line-clamp-2
                  mt-2
                  leading-6
                "
              >
                {item.name ||
                  item.title}
              </h3>

              {/* LOCATION */}
              <div className="flex items-center gap-2 mt-3 text-gray-500">

                <FaMapMarkerAlt className="text-xs" />

                <span className="text-xs sm:text-sm truncate">
                  {item.location ||
                    "Indore, Madhya Pradesh"}
                </span>
              </div>

              {/* FOOTER */}
              <div
                className="
                  flex items-center justify-between
                  mt-4 pt-3
                  border-t border-gray-100
                "
              >
                <span className="text-xs text-gray-400">
                  Viewed Recently
                </span>

                <button
                  className="
                    text-sm
                    font-semibold
                    text-green-700
                    group-hover:translate-x-1
                    transition-transform
                  "
                >
                  View →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}