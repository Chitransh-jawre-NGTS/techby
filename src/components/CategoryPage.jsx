// import React from "react";
// import Slider from "react-slick";
// import { Smartphone, Laptop, Gamepad2, Disc } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// // Import category images
// import mobileImg from "../assets/best price/mobile.jpg";
// import laptopImg from "../assets/best price/laptop.jpg";
// import consoleImg from "../assets/best price/amanz-WlxBHSKW7dU-unsplash.jpg";
// import cdImg from "../assets/best price/download.jpg";

// const categories = [
//   {
//     title: "Used Mobile",
//     slug: "used-mobile",
//     icon: <Smartphone size={40} />,
//     image: mobileImg,
//   },
//   {
//     title: "Used Laptop",
//     slug: "used-laptop",
//     icon: <Laptop size={40} />,
//     image: laptopImg,
//   },
//   {
//     title: "Used Console",
//     slug: "used-console",
//     icon: <Gamepad2 size={40} />,
//     image: consoleImg,
//   },
//   {
//     title: "PS CD",
//     slug: "ps-cd",
//     icon: <Disc size={40} />,
//     image: cdImg,
//   },
// ];

// // Custom Arrow Components
// const PrevArrow = ({ onClick }) => (
//   <button
//     onClick={onClick}
//     className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow"
//   >
//     <FaChevronLeft size={18} />
//   </button>
// );

// const NextArrow = ({ onClick }) => (
//   <button
//     onClick={onClick}
//     className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow"
//   >
//     <FaChevronRight size={18} />
//   </button>
// );

// const CategoryPage = () => {
//   const navigate = useNavigate();

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     prevArrow: <PrevArrow />,
//     nextArrow: <NextArrow />,
//   };

//   const handleCategoryClick = (slug) => {
//     navigate(`/search?q=${slug}`);
//   };

//   return (
//     <section className="max-w-7xl mx-auto px-6 py-12">

//       {/* Section Title */}
//       <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
//         Browse Categories
//       </h2>

//       <p className="text-center text-gray-500 mb-10">
//         Explore refurbished mobiles, laptops, gaming consoles and accessories.
//       </p>

//       {/* Desktop Grid */}
//       <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//         {categories.map((category) => (
//           <div
//             key={category.slug}
//             onClick={() => handleCategoryClick(category.slug)}
//             className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer"
//           >
//             <img
//               src={category.image}
//               alt={category.title}
//               className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
//             />

//             <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300" />

//             <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
//               <div className="mb-3">{category.icon}</div>

//               <h3 className="text-lg font-semibold">
//                 {category.title}
//               </h3>

//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleCategoryClick(category.slug);
//                 }}
//                 className="mt-3 px-4 py-1.5 bg-green-500 rounded-lg text-sm font-medium hover:bg-green-600 transition"
//               >
//                 Explore
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Mobile Carousel */}
//       <div className="sm:hidden relative">
//         <Slider {...settings}>
//           {categories.map((category) => (
//             <div key={category.slug} className="px-2">
//               <div
//                 onClick={() => handleCategoryClick(category.slug)}
//                 className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer"
//               >
//                 <img
//                   src={category.image}
//                   alt={category.title}
//                   className="w-full h-60 object-cover"
//                 />

//                 <div className="absolute inset-0 bg-black/40" />

//                 <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
//                   <div className="mb-3">{category.icon}</div>

//                   <h3 className="text-lg font-semibold">
//                     {category.title}
//                   </h3>

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleCategoryClick(category.slug);
//                     }}
//                     className="mt-3 px-4 py-1.5 bg-green-500 rounded-lg text-sm font-medium hover:bg-green-600 transition"
//                   >
//                     Explore
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>

//     </section>
//   );
// };

// export default CategoryPage;









import React from "react";
import Slider from "react-slick";
import {
  Smartphone,
  Laptop,
  Gamepad2,
  Disc,
  Tablet,
  Bike,
  Sparkles,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import mobileImg from "../assets/best price/mobile.jpg";
import laptopImg from "../assets/best price/laptop.jpg";
import consoleImg from "../assets/best price/amanz-WlxBHSKW7dU-unsplash.jpg";
import cdImg from "../assets/best price/download.jpg";
import tabletImg from "../assets/images/tablet.png";
import bikeImg from "../assets/images/bikes.webp";

const categories = [
  {
    title: "Used Mobile",
    slug: "used-mobile",
    icon: <Smartphone size={26} />,
    image: mobileImg,
    subtitle: "Best refurbished phones",
  },
  {
    title: "Used Laptop",
    slug: "used-laptop",
    icon: <Laptop size={26} />,
    image: laptopImg,
    subtitle: "Affordable laptops",
  },
  {
    title: "Used Console",
    slug: "used-console",
    icon: <Gamepad2 size={26} />,
    image: consoleImg,
    subtitle: "Gaming deals",
  },
  {
    title: "PS CD",
    slug: "ps-cd",
    icon: <Disc size={26} />,
    image: cdImg,
    subtitle: "PlayStation games",
  },
  {
    title: "Used Tablets",
    slug: "used-tablets",
    icon: <Tablet size={26} />,
    image: tabletImg,
    subtitle: "Study & entertainment",
  },
  {
    title: "Used Bikes",
    slug: "used-bikes",
    icon: <Bike size={26} />,
    image: bikeImg,
    subtitle: "Explore bike deals",
  },
];

// Compact Arrows
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-md hover:scale-110 transition-all duration-300 p-2 rounded-full shadow-lg border border-gray-200"
  >
    <FaChevronLeft size={14} className="text-green-700" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-md hover:scale-110 transition-all duration-300 p-2 rounded-full shadow-lg border border-gray-200"
  >
    <FaChevronRight size={14} className="text-green-700" />
  </button>
);

const CategoryPage = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3200,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const handleCategoryClick = (slug) => {
    navigate(`/search?q=${slug}`);
  };

  return (
    <section className="relative overflow-hidden py-14 px-4 bg-gradient-to-br from-white via-green-50 to-green-100 rounded-[28px]">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-300 rounded-full blur-3xl opacity-20"></div>

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">

          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-semibold shadow-sm">
            <Sparkles size={14} />
            Explore Categories
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4">
            Browse TechBy Categories
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-base leading-relaxed">
            Discover refurbished mobiles, laptops, gaming consoles,
            tablets, accessories, and more.
          </p>

        </div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-6 gap-5">

          {categories.map((category) => (
            <div
              key={category.slug}
              onClick={() => handleCategoryClick(category.slug)}
              className="group relative h-[260px] rounded-[24px] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
            >

              {/* Image */}
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

              {/* Content */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-5">

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg mb-3">
                  {category.icon}
                </div>

                <p className="text-green-300 text-xs font-medium">
                  {category.subtitle}
                </p>

                <h3 className="text-2xl font-bold text-white mt-1">
                  {category.title}
                </h3>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick(category.slug);
                  }}
                  className="mt-4 w-fit px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-medium transition-all duration-300"
                >
                  Explore
                </button>

              </div>

            </div>
          ))}

        </div>

        {/* Mobile Slider */}
        <div className="sm:hidden relative">

          <Slider {...settings}>

            {categories.map((category) => (
              <div key={category.slug} className="px-2 py-2">

                <div
                  onClick={() => handleCategoryClick(category.slug)}
                  className="relative h-[280px] rounded-[24px] overflow-hidden shadow-xl cursor-pointer"
                >

                  {/* Image */}
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                  {/* Content */}
                  <div className="absolute inset-0 z-10 flex flex-col justify-end p-5">

                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg mb-3">
                      {category.icon}
                    </div>

                    <p className="text-green-300 text-xs font-medium">
                      {category.subtitle}
                    </p>

                    <h3 className="text-2xl font-bold text-white mt-1">
                      {category.title}
                    </h3>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategoryClick(category.slug);
                      }}
                      className="mt-4 w-fit px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-medium transition-all duration-300"
                    >
                      Explore
                    </button>

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

export default CategoryPage;