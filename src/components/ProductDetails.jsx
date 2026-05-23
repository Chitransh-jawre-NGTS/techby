import React, { useEffect, useState } from "react";
import {
  FaTruck,
  FaWhatsapp,
  FaPhoneAlt,
  FaClock,
  FaMoneyBillWave,
  FaMobileAlt,
  FaChevronLeft,
  FaChevronRight,
  FaShareAlt,
  FaHeart,
  FaUndo,
} from "react-icons/fa";

import { useParams } from "react-router-dom";
import {
  useDispatch,
} from "react-redux";

import {
  createConversation,
} from "../store/slices/chatSlice";
import { useNavigate } from "react-router-dom";

import {
  getProductById,
  increaseProductView,
} from "../Api/ProductApi";

import Navbar from "./Navbar";
import sellerlogo from "../assets/logo/shop logo.jpg";
import ProductsPage from "./ProductPage";
import Footer from "./Footer";
import MobileNavbar from "./MobileNavbar";
import IndianNews from "./TrendingNews";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [selectedImage, setSelectedImage] =
    useState("");

  const [isViewerOpen, setIsViewerOpen] =
    useState(false);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [showFullDesc, setShowFullDesc] =
    useState(false);

    const navigate = useNavigate();


    const dispatch = useDispatch();
  // ================= FETCH PRODUCT =================
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  const fetchProduct = async () => {
  try {
    const res = await getProductById(id);

    const productData = res.data?.product;

    setProduct(productData);

    if (productData?.imageUrls?.length > 0) {
      setSelectedImage(productData.imageUrls[0].url);
    }
  } catch (error) {
    console.log("Failed to fetch product:", error);
  }
};

    fetchProduct();
  }, [id]);

  // ================= INCREASE VIEW =================
  useEffect(() => {
    if (!product?._id) return;

    const increaseView = async () => {
      try {
        await increaseProductView(product._id);
      } catch (error) {
        console.log(
          "View API error:",
          error.message
        );
      }
    };

    increaseView();
  }, [product?._id]);

  // ================= LOADING =================
  if (!product) {
    return (
      <>
        <Navbar />

        <div className="bg-[#f2f4f5] min-h-screen py-6 px-3">

          <div className="max-w-7xl mx-auto animate-pulse">

            <div className="flex flex-col lg:flex-row gap-5">

              <div className="flex-1">

                <div className="bg-gray-300 h-[400px] rounded-md"></div>

                <div className="flex gap-2 mt-3">
                  <div className="w-20 h-16 bg-gray-300 rounded"></div>
                  <div className="w-20 h-16 bg-gray-300 rounded"></div>
                  <div className="w-20 h-16 bg-gray-300 rounded"></div>
                </div>

                <div className="bg-white rounded-md p-5 mt-4">

                  <div className="h-8 w-40 bg-gray-300 rounded"></div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

                    {Array.from({
                      length: 8,
                    }).map((_, i) => (
                      <div
                        key={i}
                        className="space-y-2"
                      >
                        <div className="h-4 bg-gray-300 rounded"></div>

                        <div className="h-4 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-[380px]">

                <div className="bg-white rounded-md p-5 space-y-4">

                  <div className="h-10 bg-gray-300 rounded"></div>

                  <div className="h-5 bg-gray-200 rounded"></div>

                  <div className="h-5 bg-gray-200 rounded"></div>

                  <div className="h-12 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ================= IMAGE SLIDER =================
  const nextImage = () => {
    if (!product?.imageUrls?.length) return;

    const next =
      currentIndex ===
      product.imageUrls.length - 1
        ? 0
        : currentIndex + 1;

    setCurrentIndex(next);

    setSelectedImage(
      product.imageUrls[next]?.url
    );
  };

  const prevImage = () => {
    if (!product?.imageUrls?.length) return;

    const prev =
      currentIndex === 0
        ? product.imageUrls.length - 1
        : currentIndex - 1;

    setCurrentIndex(prev);

    setSelectedImage(
      product.imageUrls[prev]?.url
    );
  };

  // ================= DISCOUNT =================
  const discountPercent =
    product.totalPrice &&
    product.discountPrice
      ? Math.round(
          ((product.totalPrice -
            product.discountPrice) /
            product.totalPrice) *
            100
        )
      : 0;

  // ================= WHATSAPP =================
  const handleWhatsAppChat = () => {
    let sellerPhone =
      product?.sellerId?.phone;

    if (!sellerPhone) {
      alert("Seller contact not available");
      return;
    }

    sellerPhone = sellerPhone
      .toString()
      .replace(/\D/g, "");

    if (!sellerPhone.startsWith("91")) {
      sellerPhone = `91${sellerPhone}`;
    }

    const productUrl =
      window.location.href;

    const message = `Hi 👋

I am interested in your product.

📱 Product: ${product.name}

💰 Price: ₹${
      product.discountPrice ||
      product.totalPrice
    }

📦 Category: ${product.category}

🔗 Product Link:
${productUrl}

Is this product still available?`;

    const whatsappUrl = `https://wa.me/${sellerPhone}?text=${encodeURIComponent(
      message
    )}`;

    window.open(
      whatsappUrl,
      "_blank"
    );
  };

  // ================= SHARE =================
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: product.desc,
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(
          window.location.href
        );

        alert("Link copied");
      }
    } catch (error) {
      console.log(error);
    }
  };


const handleChatWithSeller =
  async () => {
    try {
      const sellerId =
        product?.userId?._id;

      if (!sellerId) {
        alert("Seller not available");
        return;
      }

      const token =
        localStorage.getItem(
          "token"
        );

      if (!token) {
        alert("Please login first");
        return;
      }

      // ================= CREATE CHAT =================
      const result =
        await dispatch(
          createConversation({
            receiverId: sellerId,
            productId: product?._id,
          })
        );

      if (
        createConversation.fulfilled.match(
          result
        )
      ) {
        navigate("/chat", {
          state: {
            conversation:
              result.payload,
          },
        });
      } else {
        alert(
          result.payload?.message ||
            "Failed to create chat"
        );
      }
    } catch (err) {
      console.log(err);

      alert("Something went wrong");
    }
  };

  // ================= SERVICES =================
  const services = [
    {
      icon: (
        <FaTruck className="text-green-600 text-2xl" />
      ),
      title: "Free Delivery",
      desc: "Free delivery in Indore city.",
    },
    {
      icon: (
        <FaClock className="text-green-600 text-2xl" />
      ),
      title: "Fast Delivery",
      desc: "Same day / next day delivery.",
    },
    {
      icon: (
        <FaUndo className="text-green-600 text-2xl" />
      ),
      title: "No Return",
      desc: "Check product before purchase.",
    },
    {
      icon: (
        <FaMoneyBillWave className="text-green-600 text-2xl" />
      ),
      title: "COD Available",
      desc: "Cash on delivery available.",
    },
    {
      icon: (
        <FaMobileAlt className="text-green-600 text-2xl" />
      ),
      title: "Exchange",
      desc: "Old mobile exchange available.",
    },
  ];

  return (
    <>
      <Navbar />
       {/* <MobileNavbar/> */}
      <div className="bg-[#f2f4f5] min-h-screen md:py-6 md:px-3">

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-5">

          {/* LEFT SECTION */}
          <div className="flex-1">

            {/* IMAGE CARD */}
            <div className="bg-white border border-gray-300  rounded-md overflow-hidden">

              <div className="relative bg-black h-[300px] md:h-[500px] flex items-center justify-center">

                <img
                  src={
                    selectedImage ||
                    "/default-product-image.png"
                  }
                  alt={product.name}
                  className="h-full w-full object-contain cursor-pointer"
                  onClick={() =>
                    setIsViewerOpen(true)
                  }
                />

                {/* LEFT BUTTON */}
                {product.imageUrls?.length >
                  1 && (
                  <button
                    onClick={prevImage}
                    className="absolute left-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center"
                  >
                    <FaChevronLeft />
                  </button>
                )}

                {/* RIGHT BUTTON */}
                {product.imageUrls?.length >
                  1 && (
                  <button
                    onClick={nextImage}
                    className="absolute right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center"
                  >
                    <FaChevronRight />
                  </button>
                )}
              </div>

              {/* THUMBNAILS */}
              {product.imageUrls?.length >
                1 && (
                <div className="flex gap-2 p-3 overflow-x-auto">

                  {product.imageUrls.map(
                    (img, index) => (
                      <img
                        key={index}
                        src={img.url}
                        alt=""
                        onClick={() => {
                          setSelectedImage(
                            img.url
                          );

                          setCurrentIndex(
                            index
                          );
                        }}
                        className={`w-20 h-16 object-cover rounded cursor-pointer border-2 ${
                          selectedImage ===
                          img.url
                            ? "border-green-600"
                            : "border-gray-200"
                        }`}
                      />
                    )
                  )}
                </div>
              )}
            </div>

            {/* DETAILS */}
            <div className="bg-white border border-gray-300 rounded-md mt-4 p-5">

              <h2 className="text-2xl font-bold mb-5">
                Details
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-5 text-sm">

                {product.attributes &&
  Object.entries(product.attributes).map(([key, value]) => {
    
    // ✅ SKIP LOCATION (we will handle separately)
    if (key === "location") return null;

    return (
      <div key={key}>
        <p className="text-gray-500 capitalize">{key}</p>

        <p className="font-semibold">{String(value)}</p>
      </div>
    );
  })}
  {product.attributes?.location && (
  <div className="col-span-2 md:col-span-4 mt-2">
    <p className="text-gray-500">Location</p>

    <p className="font-semibold">
      {typeof product.attributes.location === "string"
        ? JSON.parse(product.attributes.location)?.city +
          ", " +
          JSON.parse(product.attributes.location)?.state
        : `${product.attributes.location.city}, ${product.attributes.location.state}`}
    </p>
  </div>
)}

                <div>
                  <p className="text-gray-500">
                    Category
                  </p>

                  <p className="font-semibold">
                    {product.category}
                  </p>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="mt-8 border-t pt-5">

                <h3 className="text-xl font-bold mb-3">
                  Description
                </h3>

                <p
                  className={`text-gray-700 leading-7 ${
                    showFullDesc
                      ? ""
                      : "line-clamp-4"
                  }`}
                >
                  {product.desc}
                </p>

                {product.desc?.length >
                  150 && (
                  <button
                    onClick={() =>
                      setShowFullDesc(
                        !showFullDesc
                      )
                    }
                    className="mt-3 text-green-600 font-semibold"
                  >
                    {showFullDesc
                      ? "Read Less"
                      : "Read More"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="w-full lg:w-[380px] flex flex-col gap-4">

            {/* PRICE CARD */}
            <div className="bg-white border border-gray-300  rounded-md p-5">

              <div className="flex items-start justify-between">

                <div>

                  <h2 className="text-4xl font-bold">
                    ₹
                    {product.discountPrice ||
                      product.totalPrice}
                  </h2>

                  <p className="text-sm text-gray-700 mt-2">
                    {product.name}
                  </p>

                  {discountPercent >
                    0 && (
                    <div className="flex items-center gap-2 mt-2">

                      <span className="line-through text-gray-400">
                        ₹
                        {
                          product.totalPrice
                        }
                      </span>

                      <span className="text-green-600 font-semibold">
                        {
                          discountPercent
                        }
                        % OFF
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 text-xl text-gray-600">

                  <button
                    onClick={handleShare}
                  >
                    <FaShareAlt className="cursor-pointer hover:text-green-600" />
                  </button>

                  <FaHeart className="cursor-pointer hover:text-red-500" />
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 text-sm text-gray-500">

                <span>
                  Indore, Madhya Pradesh
                </span>

                <span>Today</span>
              </div>
            </div>

            {/* SELLER CARD */}
            {product.userId && (
              <div className="bg-white border border-gray-300  rounded-md p-5">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <img
                      src={
                        product.userId
                          .logo ||
                        sellerlogo
                      }
                      alt=""
                      className="w-14 h-14 rounded-full object-cover"
                    />

                    <div>

                      <p className="text-sm text-gray-500">
                        Posted By
                      </p>

                      <h3 className="font-bold text-lg">
                        {
                          product.userId
                            .username
                        }
                      </h3>

                      <p className="text-sm text-gray-500">
                        Member since
                        2024
                      </p>
                    </div>
                  </div>

                  <FaChevronRight />
                </div>

                {/* BUTTONS */}
                <div className="mt-6 flex flex-col gap-3">

                  <button
                   onClick={handleChatWithSeller}
                    className="w-full border-2 border-green-600 text-green-700 hover:bg-green-50 py-3 rounded-md font-semibold transition flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp />

                    Chat with seller
                  </button>

                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold flex items-center justify-center gap-2 transition">

                    <FaPhoneAlt />

                    {product.userId
                      .phone ||
                      "Show Number"}
                  </button>
                </div>
              </div>
            )}

       

            {/* LOCATION */}
            <div className="bg-white border border-gray-300  rounded-md p-5">

              <h3 className="text-xl font-bold mb-4">
                Posted in
              </h3>

              <p className="text-sm text-gray-600 mb-4">
                Indore, Madhya Pradesh
              </p>

              <div className="rounded-md overflow-hidden">

                <iframe
                  title="map"
                  width="100%"
                  height="220"
                  frameBorder="0"
                  scrolling="no"
                  src="https://maps.google.com/maps?q=indore&t=&z=13&ie=UTF8&iwloc=&output=embed"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* IMAGE VIEWER */}
        {isViewerOpen && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">

            <button
              className="absolute top-5 right-5 text-white text-3xl"
              onClick={() =>
                setIsViewerOpen(false)
              }
            >
              ✕
            </button>

            {product.imageUrls
              ?.length > 1 && (
              <button
                onClick={prevImage}
                className="absolute left-5 text-white text-4xl"
              >
                ‹
              </button>
            )}

            <img
              src={
                product.imageUrls?.[
                  currentIndex
                ]?.url
              }
              alt="preview"
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />

            {product.imageUrls
              ?.length > 1 && (
              <button
                onClick={nextImage}
                className="absolute right-5 text-white text-4xl"
              >
                ›
              </button>
            )}
          </div>
        )}

        {/* <ProductsPage heading="You May Also Like" /> */}

      </div>
      {/* <IndianNews/> */}
      

      <Footer />
    </>
  );
};

export default ProductDetails;















    //  {/* SERVICES */}
    //         <div className="bg-white border rounded-md p-5">

    //           <h3 className="text-xl font-bold mb-5">
    //             Services
    //           </h3>

    //           <div className="grid grid-cols-2 gap-3">

    //             {services.map(
    //               (service, index) => (
    //                 <div
    //                   key={index}
    //                   className="border rounded-md p-3 text-center"
    //                 >

    //                   <div className="flex justify-center mb-2">
    //                     {
    //                       service.icon
    //                     }
    //                   </div>

    //                   <h4 className="text-sm font-semibold">
    //                     {
    //                       service.title
    //                     }
    //                   </h4>

    //                   <p className="text-xs text-gray-500 mt-1">
    //                     {
    //                       service.desc
    //                     }
    //                   </p>
    //                 </div>
    //               )
    //             )}
    //           </div>
    //         </div>