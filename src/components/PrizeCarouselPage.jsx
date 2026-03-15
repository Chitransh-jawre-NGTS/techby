import React from "react";
import Slider from "react-slick";
import { Headphones, Smartphone, Watch, Gift, Speaker, ChevronLeft, ChevronRight } from "lucide-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const assuredGifts = [
  { purchase: "Smartphone", icon: <Smartphone size={32} /> },
  { purchase: "Laptop", icon: <Speaker size={32} /> },
  { purchase: "Mobile Accessories", icon: <Gift size={32} /> },
  { purchase: "Gaming Console", icon: <Watch size={32} /> },
  { purchase: "PS CD", icon: <Headphones size={32} /> },
];

const ArrowLeft = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 z-10"
  >
    <ChevronLeft size={22} />
  </button>
);

const ArrowRight = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 z-10"
  >
    <ChevronRight size={22} />
  </button>
);

const GreenGiftList = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    nextArrow: <ArrowRight />,
    prevArrow: <ArrowLeft />,
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">

      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-3">
        Surprise Gifts from Sellers 🎁
      </h2>

      <p className="text-center text-gray-500 text-sm md:text-base mb-3">
        Some sellers offer surprise gifts along with selected products. TechBy is only a platform and does not provide the gifts.
      </p>

      <p className="text-center text-gray-400 text-xs md:text-sm mb-10">
        Gift availability depends on individual sellers. Please check product details for eligibility.
      </p>

      {/* Desktop Grid */}
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-5 gap-6">
        {assuredGifts.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg p-6 text-center flex flex-col items-center
            hover:shadow-2xl hover:-translate-y-2 transition duration-300"
          >
            <div className="bg-green-500 text-white p-4 rounded-full mb-4">
              {item.icon}
            </div>

            <p className="text-gray-600 text-sm mb-2">
              Purchase
            </p>

            <h3 className="font-semibold text-green-700 text-lg">
              {item.purchase}
            </h3>

            <span className="mt-3 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
              Gift from Seller
            </span>
          </div>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="sm:hidden relative">
        <Slider {...settings}>
          {assuredGifts.map((item, idx) => (
            <div key={idx} className="px-3">
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center flex flex-col items-center">

                <div className="bg-green-500 text-white p-4 rounded-full mb-4">
                  {item.icon}
                </div>

                <p className="text-gray-600 text-sm">
                  Purchase
                </p>

                <h3 className="font-semibold text-green-700 text-lg">
                  {item.purchase}
                </h3>

                <span className="mt-3 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Gift from Seller
                </span>

              </div>
            </div>
          ))}
        </Slider>
      </div>

    </section>
  );
};

export default GreenGiftList;