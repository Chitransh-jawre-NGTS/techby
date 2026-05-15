import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../Api/ProductApi";
import sellerlogo from "../assets/logo/shop logo.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const TopDiscountBikes = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTopDiscountBikes();
  }, []);

  const fetchTopDiscountBikes = async () => {
    try {
      const response = await getAllProducts();

      // Filter bike products only
      const bikeProducts = response.data.filter(
        (product) =>
          product.category?.toLowerCase() === "used-bike" &&
          product.discountPrice
      );

      // Sort by highest discount %
      const sortedBikes = bikeProducts.sort((a, b) => {
        const discountA =
          ((a.totalPrice - a.discountPrice) / a.totalPrice) * 100;

        const discountB =
          ((b.totalPrice - b.discountPrice) / b.totalPrice) * 100;

        return discountB - discountA;
      });

      // Top 6 products
      setBikes(sortedBikes.slice(0, 6));

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getDiscountPercent = (total, discount) => {
    return Math.round(((total - discount) / total) * 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Top Discount On Bikes
          </h2>

          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Premium used bikes with huge discounts
          </p>
        </div>

        <button
          onClick={() => navigate("/top-discount-bikes")}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-medium transition shadow-md"
        >
          View More
        </button>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-[420px] rounded-3xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={20}
          breakpoints={{
            0: {
              slidesPerView: 1.1,
            },
            640: {
              slidesPerView: 1.5,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >

          {bikes.map((product) => (
            <SwiperSlide key={product._id}>

              <div
                onClick={() => navigate(`/product/${product._id}`)}
                className="group relative h-[420px] rounded-3xl overflow-hidden cursor-pointer shadow-2xl"
              >

                {/* IMAGE */}
                <img
                  src={
                    product.imageUrls?.[0]?.url ||
                    "/default-product-image.png"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>

                {/* TOP BADGES */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">

                  {/* DISCOUNT */}
                  <span className="bg-red-500 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                    {getDiscountPercent(
                      product.totalPrice,
                      product.discountPrice
                    )}
                    % OFF
                  </span>

                  {/* FEATURED */}
                  {product.featured && (
                    <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow">
                      Featured
                    </span>
                  )}

                  {/* DELIVERY */}
                  {product.deliveryAvailable && (
                    <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      Free Delivery
                    </span>
                  )}
                </div>

                {/* CONTENT */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">

                  {/* PRODUCT NAME */}
                  <h2 className="text-2xl font-bold line-clamp-1">
                    {product.name}
                  </h2>

                  {/* DESCRIPTION */}
                  <p className="text-sm text-gray-200 line-clamp-2 mt-2">
                    {product.desc}
                  </p>

                  {/* PRICE */}
                  <div className="flex items-center gap-3 mt-5">

                    <span className="text-3xl font-extrabold text-green-400">
                      ₹{product.discountPrice}
                    </span>

                    <span className="line-through text-gray-300 text-lg">
                      ₹{product.totalPrice}
                    </span>

                  </div>

                  {/* SELLER */}
                  {product.sellerId && (
                    <div className="flex items-center gap-3 mt-6">

                      <img
                        src={product.sellerId.logo || sellerlogo}
                        alt={product.sellerId.shopName}
                        className="w-11 h-11 rounded-full border-2 border-white object-cover"
                      />

                      <div>
                        <h4 className="text-sm font-semibold">
                          {product.sellerId.shopName}
                        </h4>

                        <p className="text-xs text-gray-300">
                          {product.sellerId.location || "Indore"}
                        </p>
                      </div>

                    </div>
                  )}

                </div>
              </div>

            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default TopDiscountBikes;