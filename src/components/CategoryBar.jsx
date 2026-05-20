import React from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Cars",
    slug: "cars",
  },
  {
    name: "Motorcycles",
    slug: "motorcycles",
  },
  {
    name: "Mobile Phones",
    slug: "mobile-phones",
  },
  {
    name: "Houses & Apartments",
    slug: "houses-apartments",
  },
  {
    name: "For Rent",
    slug: "for-rent",
  },
  {
    name: "Beds",
    slug: "beds",
  },
  {
    name: "TVs & Audio",
    slug: "tvs-audio",
  },
  {
    name: "Tablets",
    slug: "tablets",
  },
  {
    name: "Land & Plots",
    slug: "land-plots",
  },
  {
    name: "Fashion",
    slug: "fashion",
  },
];

const CategoryBar = () => {
  const navigate = useNavigate();

  // ================= CATEGORY CLICK =================
  const handleCategoryClick = (category) => {
    navigate(`/search?category=${category.slug}`);
  };

  return (
    <div className="w-full bg-white border-y border-green-100 shadow-sm">

      <div className="max-w-7xl mx-auto overflow-x-auto scrollbar-hide">

        <div className="flex items-center gap-2 px-3 py-2 min-w-max">

          {/* ALL CATEGORIES */}
          <button
            onClick={() => navigate("/categories")}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition duration-200 shadow-sm whitespace-nowrap"
          >
            <FaBars className="text-xs" />

            ALL CATEGORIES
          </button>

          {/* CATEGORY ITEMS */}
          {categories.map((item, index) => (
            <button
              key={index}
              onClick={() =>
                handleCategoryClick(item)
              }
              className="px-4 py-2.5 rounded-full border border-green-100 bg-white hover:bg-green-50 hover:border-green-300 text-gray-700 hover:text-green-700 text-sm font-medium whitespace-nowrap transition duration-200"
            >
              {item.name}
            </button>
          ))}

        </div>
      </div>
    </div>
  );
};

export default CategoryBar;