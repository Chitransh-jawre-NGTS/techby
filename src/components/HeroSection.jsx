import React from "react";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import bannerMain from "../assets/images/modern-stationary-collection-arrangement.jpg";
import bannerRight from "../assets/images/amanz-WlxBHSKW7dU-unsplash.jpg";
import bannerBottom from "../assets/images/download.jpg";
import VedioImage from "../assets/images/tablet.png";

const HeroSection = () => {

  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-4 px-4 py-6">

      {/* LEFT MAIN HERO */}
      <div className="lg:col-span-3 relative overflow-hidden rounded-lg">

        <img
          src={bannerMain}
          alt="Refurbished Electronics"
          className="w-full h-[400px] md:h-[610px] object-cover rounded-lg"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-start px-10 text-white">

          <p className="text-sm mb-2 font-medium tracking-wide text-green-400">
            Refurbished Deals
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
            Premium Laptops & Smartphones <br />
            At Unbeatable Prices
          </h2>

          <p className="max-w-md mb-5 text-gray-200 text-sm">
            Discover high-quality refurbished electronics tested by professionals.
            Save more while enjoying the same performance and reliability.
          </p>

          <div className="flex space-x-3">

            <button
              onClick={() => navigate("/search")}
              className="bg-white text-black font-semibold px-6 py-2 rounded-full hover:bg-gray-200 transition"
            >
              Shop Deals
            </button>

            <button
              onClick={() => navigate("/search")}
              className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition"
            >
              View Products
            </button>

          </div>
        </div>

        {/* Slider arrows */}
        <button className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 p-2 rounded-full">
          &#10094;
        </button>

        <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 p-2 rounded-full">
          &#10095;
        </button>

      </div>

      {/* RIGHT SIDE BANNERS */}
      <div className="lg:col-span-2 flex flex-col gap-4">

        {/* VIDEO BANNER */}
        <div className="relative rounded-lg overflow-hidden">

          <img
            src={VedioImage}
            alt="Product Video"
            className="w-full h-[180px] object-cover rounded-lg"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-white rounded-full p-4 shadow-lg hover:scale-110 transition">
              <FaPlay className="text-green-600 text-lg" />
            </button>
          </div>

        </div>

        {/* CONSOLE BANNER */}
        <div className="relative rounded-lg overflow-hidden">

          <img
            src={bannerRight}
            alt="Gaming Consoles"
            className="w-full h-[180px] object-cover rounded-lg"
          />

          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-6 text-white">

            <h3 className="text-lg font-semibold mb-1">
              PlayStation & Xbox Consoles
            </h3>

            <p className="text-sm text-gray-200 mb-3">
              Upgrade your gaming setup with certified refurbished consoles at
              the best prices.
            </p>

            <button
              onClick={() => navigate("/search")}
              className="bg-white text-black text-sm font-medium px-4 py-1 rounded-full hover:bg-gray-200 transition w-fit"
            >
              Shop Now
            </button>

          </div>

        </div>

        {/* GAMING CD BANNER */}
        <div className="relative rounded-lg overflow-hidden">

          <img
            src={bannerBottom}
            alt="Gaming Accessories"
            className="w-full h-[220px] object-cover rounded-lg"
          />

          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-6 text-white">

            <h3 className="text-lg font-semibold mb-1">
              Gaming CDs & Accessories
            </h3>

            <p className="text-sm text-gray-200 mb-3">
              Explore a huge collection of pre-owned gaming titles and
              accessories at great discounts.
            </p>

            <button
              onClick={() => navigate("/search")}
              className="bg-black text-white text-sm border border-white px-4 py-1 rounded-full hover:bg-white hover:text-black transition w-fit"
            >
              Explore
            </button>

          </div>

        </div>

      </div>

    </section>
  );
};

export default HeroSection;