import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  { name: "Mobiles", slug: "mobiles" },
  { name: "Laptops", slug: "laptops" },
  { name: "Tablets", slug: "tablets" },
  { name: "Gaming Consoles", slug: "gaming-consoles" },
  { name: "PS CD", slug: "ps-cd" },
  { name: "Bikes", slug: "bikes" },
];

const bannerItems = [
  " Currently Available in Indore",
  " Free Delivery Available Soon",
  " Get Exclusive Deals",
  " Hurry! Limited Stock Available",
];

const CategoryMenu = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (slug) => {
    // navigate(`/search?category=${slug}`);
    navigate(`/search?q=${slug}`);
  };

  // Framer Motion animation variant
  const marqueeVariants = {
    animate: {
      x: ["0%", "-50%"], // move from 0% to -50%
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 10,
          ease: "linear",
        },
      },
    },
  };

  return (
    <>
      {/* Continuous Marquee Banner */}
      <div className="bg-green-600 text-white overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          variants={marqueeVariants}
          animate="animate"
        >
          {[...bannerItems, ...bannerItems].map((item, index) => (
            <span
              key={index}
              className="px-8 py-2 font-semibold text-sm flex-shrink-0"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Category Menu */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide py-3">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategoryClick(cat.slug)}
                className="whitespace-nowrap text-gray-700 font-medium hover:text-green-600 transition relative group"
              >
                {cat.name}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-600 transition-all group-hover:w-full"></span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryMenu;