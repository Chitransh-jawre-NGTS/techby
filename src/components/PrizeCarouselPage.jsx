import React from "react";
import Slider from "react-slick";
import {
  Headphones,
  Smartphone,
  Watch,
  Gift,
  Laptop,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const assuredGifts = [
  {
    purchase: "Smartphone",
    icon: <Smartphone size={34} />,
    gift: "Free Back Cover",
  },
  {
    purchase: "Laptop",
    icon: <Laptop size={34} />,
    gift: "Wireless Mouse",
  },
  {
    purchase: "Accessories",
    icon: <Gift size={34} />,
    gift: "Screen Protector",
  },
  {
    purchase: "Gaming Console",
    icon: <Watch size={34} />,
    gift: "Gaming Sticker Pack",
  },
  {
    purchase: "PS CD",
    icon: <Headphones size={34} />,
    gift: "Headphone Stand",
  },
];

const ArrowLeft = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md shadow-xl p-3 rounded-full hover:scale-110 transition-all duration-300 z-10 border border-gray-200"
  >
    <ChevronLeft size={22} className="text-green-700" />
  </button>
);

const ArrowRight = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md shadow-xl p-3 rounded-full hover:scale-110 transition-all duration-300 z-10 border border-gray-200"
  >
    <ChevronRight size={22} className="text-green-700" />
  </button>
);

const GreenGiftList = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3200,
    nextArrow: <ArrowRight />,
    prevArrow: <ArrowLeft />,
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100 py-20 px-6 rounded-[40px]">

      {/* Background Blur Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-300 rounded-full blur-3xl opacity-20"></div>

      <div className="relative max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">

          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-semibold shadow-sm">
            <Sparkles size={16} />
            Seller Surprise Gifts
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-5 leading-tight">
            Get Amazing Surprise Gifts 🎁
          </h2>

          <p className="text-gray-600 mt-5 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Some verified sellers on TechBy provide surprise gifts with selected
            gadgets and accessories. Gifts vary depending on the seller and product.
          </p>

          <p className="text-gray-400 text-sm mt-3">
            TechBy is only a marketplace platform and does not directly provide gifts.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">

          {assuredGifts.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-white/80 backdrop-blur-xl border border-white rounded-[30px] p-7 text-center shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden"
            >

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

              {/* Icon */}
              <div className="relative z-10 w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-all duration-500">
                {item.icon}
              </div>

              {/* Text */}
              <div className="relative z-10 mt-6">
                <p className="text-gray-500 text-sm">
                  Purchase
                </p>

                <h3 className="font-bold text-xl text-gray-900 mt-2">
                  {item.purchase}
                </h3>

                <div className="mt-5 inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs px-4 py-2 rounded-full font-semibold">
                  🎁 {item.gift}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="sm:hidden relative">

          <Slider {...settings}>
            {assuredGifts.map((item, idx) => (
              <div key={idx} className="px-2 py-4">

                <div className="bg-white/90 backdrop-blur-xl border border-white rounded-[30px] shadow-xl p-8 text-center overflow-hidden relative">

                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent"></div>

                  <div className="relative z-10">

                    {/* Icon */}
                    <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white shadow-lg">
                      {item.icon}
                    </div>

                    {/* Text */}
                    <p className="text-gray-500 text-sm mt-6">
                      Purchase
                    </p>

                    <h3 className="font-bold text-2xl text-gray-900 mt-2">
                      {item.purchase}
                    </h3>

                    <div className="mt-5 inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm px-5 py-2 rounded-full font-semibold">
                      🎁 {item.gift}
                    </div>

                  </div>

                </div>

              </div>
            ))}
          </Slider>

        </div>

      </div>
    </section>
  );
};

export default GreenGiftList;