import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Smartphone,
  Laptop,
  Tablet,
  Gamepad2,
  Car,
  Bike,
  Home,
  Sofa,
  Shirt,
  PawPrint,
  Briefcase,
  Wrench,
} from "lucide-react";

const categories = [
  {
    name: "Mobiles",
    slug: "mobiles",
    icon: Smartphone,
  },

  {
    name: "Laptops",
    slug: "laptops",
    icon: Laptop,
  },

  {
    name: "Tablets",
    slug: "tablets",
    icon: Tablet,
  },

  {
    name: "Gaming",
    slug: "gaming",
    icon: Gamepad2,
  },

  {
    name: "Cars",
    slug: "cars",
    icon: Car,
  },

  {
    name: "Bikes",
    slug: "bikes",
    icon: Bike,
  },

  {
    name: "Properties",
    slug: "properties",
    icon: Home,
  },

  {
    name: "Furniture",
    slug: "furniture",
    icon: Sofa,
  },

  {
    name: "Fashion",
    slug: "fashion",
    icon: Shirt,
  },

  {
    name: "Pets",
    slug: "pets",
    icon: PawPrint,
  },

  {
    name: "Jobs",
    slug: "jobs",
    icon: Briefcase,
  },

  {
    name: "Services",
    slug: "services",
    icon: Wrench,
  },
];

const CategoryMenu = () => {
  const navigate = useNavigate();

  // ================= CATEGORY CLICK =================
  const handleCategoryClick = (slug) => {
    navigate(`/search?category=${slug}`);
  };

  return (
    <div className="bg-white border-b border-green-100">

      <div className="max-w-7xl mx-auto px-3 py-4">

        {/* MOBILE */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">

          <div className="flex gap-4 min-w-max">

            {categories.map((cat) => {
              const Icon = cat.icon;

              return (
                <button
                  key={cat.slug}
                  onClick={() =>
                    handleCategoryClick(cat.slug)
                  }
                  className="flex flex-col items-center group"
                >
                  {/* ICON */}
                  <div
                    className="
                      w-14 h-14
                      rounded-2xl
                      bg-gradient-to-b
                      from-green-50
                      to-green-100
                      border border-green-200
                      flex items-center justify-center
                      shadow-sm
                      group-hover:scale-105
                      group-hover:bg-green-600
                      transition-all duration-200
                    "
                  >
                    <Icon
                      size={24}
                      className="text-green-700 group-hover:text-white"
                    />
                  </div>

                  {/* TEXT */}
                  <p className="text-[11px] font-medium text-gray-700 mt-2 whitespace-nowrap">
                    {cat.name}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* DESKTOP */}
        <div
          className="
            hidden md:grid
            grid-cols-4
            lg:grid-cols-6
            xl:grid-cols-8
            gap-5
          "
        >
          {categories.map((cat) => {
            const Icon = cat.icon;

            return (
              <button
                key={cat.slug}
                onClick={() =>
                  handleCategoryClick(cat.slug)
                }
                className="
                  bg-white
                  border border-green-100
                  rounded-3xl
                  p-5
                  flex flex-col items-center
                  hover:shadow-lg
                  hover:border-green-300
                  hover:-translate-y-1
                  transition-all duration-200
                  group
                "
              >
                {/* ICON */}
                <div
                  className="
                    w-16 h-16
                    rounded-2xl
                    bg-gradient-to-b
                    from-green-50
                    to-green-100
                    flex items-center justify-center
                    group-hover:bg-green-600
                    transition-all duration-200
                  "
                >
                  <Icon
                    size={30}
                    className="text-green-700 group-hover:text-white"
                  />
                </div>

                {/* NAME */}
                <p className="text-sm font-semibold text-gray-700 mt-3 text-center">
                  {cat.name}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* HIDE SCROLLBAR */}
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }

          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
};

export default CategoryMenu;