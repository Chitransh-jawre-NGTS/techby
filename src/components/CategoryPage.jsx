import React from "react";
import Slider from "react-slick";
import { Smartphone, Laptop, Gamepad2, Disc } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import category images
import mobileImg from "../assets/best price/mobile.jpg";
import laptopImg from "../assets/best price/laptop.jpg";
import consoleImg from "../assets/best price/amanz-WlxBHSKW7dU-unsplash.jpg";
import cdImg from "../assets/best price/download.jpg";

const categories = [
  {
    title: "Used Mobile",
    slug: "used-mobile",
    icon: <Smartphone size={40} />,
    image: mobileImg,
  },
  {
    title: "Used Laptop",
    slug: "used-laptop",
    icon: <Laptop size={40} />,
    image: laptopImg,
  },
  {
    title: "Used Console",
    slug: "used-console",
    icon: <Gamepad2 size={40} />,
    image: consoleImg,
  },
  {
    title: "PS CD",
    slug: "ps-cd",
    icon: <Disc size={40} />,
    image: cdImg,
  },
];

// Custom Arrow Components
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow"
  >
    <FaChevronLeft size={18} />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow"
  >
    <FaChevronRight size={18} />
  </button>
);

const CategoryPage = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const handleCategoryClick = (slug) => {
    navigate(`/search?q=${slug}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">

      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
        Browse Categories
      </h2>

      <p className="text-center text-gray-500 mb-10">
        Explore refurbished mobiles, laptops, gaming consoles and accessories.
      </p>

      {/* Desktop Grid */}
      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <div
            key={category.slug}
            onClick={() => handleCategoryClick(category.slug)}
            className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer"
          >
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
            />

            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
              <div className="mb-3">{category.icon}</div>

              <h3 className="text-lg font-semibold">
                {category.title}
              </h3>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCategoryClick(category.slug);
                }}
                className="mt-3 px-4 py-1.5 bg-green-500 rounded-lg text-sm font-medium hover:bg-green-600 transition"
              >
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="sm:hidden relative">
        <Slider {...settings}>
          {categories.map((category) => (
            <div key={category.slug} className="px-2">
              <div
                onClick={() => handleCategoryClick(category.slug)}
                className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-60 object-cover"
                />

                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                  <div className="mb-3">{category.icon}</div>

                  <h3 className="text-lg font-semibold">
                    {category.title}
                  </h3>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategoryClick(category.slug);
                    }}
                    className="mt-3 px-4 py-1.5 bg-green-500 rounded-lg text-sm font-medium hover:bg-green-600 transition"
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

    </section>
  );
};

export default CategoryPage;