import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Mobiles",
    slug: "mobiles",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  },

  {
    name: "Laptops",
    slug: "laptops",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
  },

  {
    name: "Tablets",
    slug: "tablets",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
  },

  {
    name: "Gaming",
    slug: "gaming-consoles",
    image:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3",
  },

  {
    name: "Cars",
    slug: "cars",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7",
  },

  {
    name: "Bikes",
    slug: "bikes",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39",
  },

  {
    name: "Properties",
    slug: "properties",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
  },

  {
    name: "Furniture",
    slug: "furniture",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },

  {
    name: "Fashion",
    slug: "fashion",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
  },

  {
    name: "Pets",
    slug: "pets",
    image:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a",
  },

  {
    name: "Jobs",
    slug: "jobs",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216",
  },

  {
    name: "Services",
    slug: "services",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
  },
];

const CategoryMenu = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (slug) => {
    navigate(`/search?q=${slug}`);
  };

  return (
    <>
      {/* 🔥 LED GLOW BANNER */}
      <div className="relative overflow-hidden bg-black">
        {/* glowing animated layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-lime-400 to-green-500 opacity-70 animate-pulse"></div>

        {/* moving shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shine_2s_linear_infinite]"></div>

        {/* text */}
        <div className="relative text-center py-1.5 sm:py-2 text-[10px] sm:text-sm font-bold text-white tracking-wide px-2">
          ⚡ Refer Friends & Earn 20 Techby Coins — Unlock Free Listings &
          Boost Your Ads Faster ⚡
        </div>
      </div>

     {/* CATEGORY MENU */}
<div className="bg-white border-b border-gray-200 shadow-sm">
  <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-4">

    {/* MOBILE = 2 ROW SCROLL */}
    <div
      className="
        grid
        grid-rows-2
        grid-flow-col
        auto-cols-max
        gap-x-4
        gap-y-3
        overflow-x-auto
        scrollbar-hide

        md:hidden
      "
    >
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => handleCategoryClick(cat.slug)}
          className="flex flex-col items-center min-w-[65px] group"
        >
          {/* IMAGE */}
          <div
            className="
              w-12 h-12
              rounded-full
              overflow-hidden
              border border-gray-200
              shadow-sm
              group-hover:scale-105
              transition
            "
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* NAME */}
          <p className="text-[10px] mt-1 font-medium text-gray-700 text-center leading-tight">
            {cat.name}
          </p>
        </button>
      ))}
    </div>

    {/* DESKTOP = PERFECT GRID */}
    <div
      className="
        hidden
        md:grid

        grid-cols-4
        lg:grid-cols-6
        xl:grid-cols-8

        gap-6
        justify-items-center
      "
    >
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => handleCategoryClick(cat.slug)}
          className="flex flex-col items-center group"
        >
          {/* IMAGE */}
          <div
            className="
              w-20 h-20
              lg:w-24 lg:h-24
              rounded-full
              overflow-hidden
              border border-gray-200
              shadow-md
              group-hover:scale-105
              hover:shadow-xl
              transition
            "
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* NAME */}
          <p className="text-sm lg:text-base mt-2 font-semibold text-gray-700 text-center">
            {cat.name}
          </p>
        </button>
      ))}
    </div>

  </div>
</div>

      {/* HIDE SCROLLBAR */}
      <style>
        {`
          @keyframes shine {
            0% {
              transform: translateX(-100%);
            }

            100% {
              transform: translateX(100%);
            }
          }

          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }

          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </>
  );
};

export default CategoryMenu;