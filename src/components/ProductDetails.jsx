import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaTruck,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaMoneyBillWave,
  FaMobileAlt,
  FaUndo,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getProductById ,increaseProductView } from "../Api/ProductApi"; // ✅ centralized API
import Navbar from "./Navbar";
import CategoryMenu from "./CategoryMenu";
import sellerlogo from "../assets/logo/shop logo.jpg";
import ProductsPage from "./ProductPage";
import Footer from "./Footer";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [isViewerOpen, setIsViewerOpen] = useState(false);
const [currentIndex, setCurrentIndex] = useState(0);

useEffect(() => {

  if (!product?._id) return;

  const increaseView = async () => {
    try {
      await increaseProductView(product._id);
    } catch (error) {
      console.log("View API error:", error.message);
    }
  };

  increaseView();
}, [product?._id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchProduct = async () => {
      try {
        const res = await getProductById(id); // ✅ using API
        setProduct(res.data);
        setSelectedImage(res.data.imageUrls?.[0]?.url || "");
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [id]);
  const nextImage = () => {
  setCurrentIndex((prev) =>
    prev === product.imageUrls.length - 1 ? 0 : prev + 1
  );
};

const prevImage = () => {
  setCurrentIndex((prev) =>
    prev === 0 ? product.imageUrls.length - 1 : prev - 1
  );
};

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10 animate-pulse">
        <div className="flex flex-col md:flex-row gap-10">
          {/* LEFT: Image Skeleton */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="bg-gray-300 h-96 rounded-lg"></div>
            <div className="flex gap-2 overflow-x-auto">
              <div className="bg-gray-300 w-20 h-20 rounded-lg"></div>
              <div className="bg-gray-300 w-20 h-20 rounded-lg"></div>
              <div className="bg-gray-300 w-20 h-20 rounded-lg"></div>
            </div>
          </div>

          {/* RIGHT: Content Skeleton */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>{" "}
            {/* Product Name */}
            <div className="flex gap-4 items-center">
              <div className="h-8 bg-gray-300 rounded w-24"></div> {/* Price */}
              <div className="h-6 bg-gray-300 rounded w-12"></div>{" "}
              {/* Discount */}
            </div>
            <div className="h-20 bg-gray-300 rounded w-full"></div>{" "}
            {/* Description */}
            <div className="h-12 bg-gray-300 rounded w-1/2 mt-4"></div>{" "}
            {/* WhatsApp Button */}
            {/* Product Details Section */}
            <div className="mt-6 p-4 bg-gray-200 rounded-lg space-y-2">
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        </div>

        {/* You May Also Like Skeleton */}
        <div className="mt-10">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-gray-300 h-60 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
  
    );
  }
  const discountPercent =
    product.totalPrice && product.discountPrice
      ? Math.round(
          ((product.totalPrice - product.discountPrice) / product.totalPrice) *
            100,
        )
      : 0;

 const handleWhatsAppChat = () => {
  let sellerPhone = product?.sellerId?.phone;

  if (!sellerPhone) {
    alert("Seller contact not available");
    return;
  }

  // ✅ FIX: add country code if not present
  if (!sellerPhone.startsWith("91")) {
    sellerPhone = "91" + sellerPhone;
  }

  const productUrl = window.location.href;

  const message = `Hi 👋,

I am interested in your product *${product.name}*.
📦 description: ${product.desc}
💰 Price: ₹${product.discountPrice || product.totalPrice}
📦 Category: ${product.category}
⚙️ Condition: ${product.attributes?.condition || "N/A"}

🔗 Product Link:
${productUrl}

Is it still available? Please share more details.`;

  const whatsappUrl = `https://wa.me/${sellerPhone}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank");
};



 const services = [
  {
    icon: <FaTruck className="text-green-600 text-2xl" />,
    title: "Free Delivery in Indore",
    desc: "Enjoy free delivery on all eligible products within Indore city (excluding bikes).",
  },
  {
    icon: <FaClock className="text-green-600 text-2xl" />,
    title: "Same Day / Next Day Delivery",
    desc: "Fast delivery available for most products (bikes excluded).",
  },
  {
    icon: <FaUndo className="text-green-600 text-2xl" />,
    title: "No Return Policy",
    desc: "Please check product carefully before purchase.",
  },
  {
    icon: <FaMoneyBillWave className="text-green-600 text-2xl" />,
    title: "COD Available",
    desc: "Order tension free with Cash On Delivery option.",
  },
  {
    icon: <FaTruck className="text-green-600 text-2xl" />,
    title: "Cancel at Doorstep",
    desc: "You can cancel your order at the time of delivery (not applicable for bikes).",
  },
  {
    icon: <FaMobileAlt className="text-green-600 text-2xl" />,
    title: "Exchange Old Mobile",
    desc: "Exchange available depending on shop owner's policy.",
  },
];
  return (
    <>
      <Navbar />
      {/* <CategoryMenu /> */}

      <div className="max-w-7xl mt-2 mx-auto border-2 border-green-300 rounded-lg px-6 py-2 flex flex-col md:flex-row gap-10">
        {/* LEFT: Sticky Images */}
        {/* LEFT: Sticky Images */}
<div className="w-full md:w-1/2">
  <div className="sticky top-30 flex flex-col gap-4 md:max-h-[calc(100vh-5rem)] overflow-auto">

    <div className="relative rounded-lg bg-black overflow-hidden h-66 md:h-96">
      <img
  src={selectedImage || "/default-product-image.png"}
  alt={product.name}
  className="w-full h-full object-contain cursor-pointer"
  onClick={() => {
    const index = product.imageUrls.findIndex(
      (img) => img.url === selectedImage
    );
    setCurrentIndex(index >= 0 ? index : 0);
    setIsViewerOpen(true);
  }}
/>


      {product.featured && (
        <span className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-lg shadow">
          Featured
        </span>
      )}

      {product.deliveryAvailable && (
        <span className="absolute bottom-3 right-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-lg shadow">
          Free Delivery
        </span>
      )}
    </div>

    {/* thumbnails */}
    {product.imageUrls && product.imageUrls.length > 1 && (
  <div className="flex gap-2 overflow-x-auto">
    {product.imageUrls.map((img, idx) => (
      <img
        key={idx}
        src={img.url}
        alt={`Thumbnail ${idx + 1}`}
        className={`w-20 h-20 object-cover rounded-lg border cursor-pointer transition ${
          selectedImage === img.url
            ? "border-green-600"
            : "border-gray-300"
        }`}
        onClick={() => setSelectedImage(img.url)}
      />
    ))}
  </div>
)}

    {/* ✅ MOVED WHATSAPP BUTTON HERE (DESKTOP ONLY) */}
    <div className="hidden md:block">
      <button
        onClick={handleWhatsAppChat}
        className="w-full md:w-3/5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-full flex items-center justify-center gap-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
      >
        <FaWhatsapp className="text-white text-lg md:text-xl animate-bounce-slow" />
        Chat With Seller on WhatsApp
      </button>
    </div>

  </div>
</div>

        {/* RIGHT: Scrollable Content */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl  md:mt-10 font-bold text-gray-900">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-3xl md:text-4xl text-green-600 font-bold">
                ₹{product.discountPrice || product.totalPrice}
              </span>
              {discountPercent > 0 && (
                <>
                  <span className="line-through text-gray-400">
                    ₹{product.totalPrice}
                  </span>
                  <span className="text-green-600 font-semibold">
                    {discountPercent}% OFF
                  </span>
                </>
              )}
            </div>
            <p className="text-gray-700 mt-3">{product.desc}</p>
          </div>

          {/* WhatsApp Button for Desktop */}
          {/* <div className="hidden md:block">
            <button
              onClick={handleWhatsAppChat}
              className="w-full md:w-3/5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-full flex items-center justify-center gap-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
            >
              <FaWhatsapp className="text-white text-lg md:text-xl animate-bounce-slow" />
              Chat With Seller on WhatsApp
            </button>
          </div> */}

          {/* Floating WhatsApp Button for Mobile */}
          <div className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12">
            <button
              onClick={handleWhatsAppChat}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-full flex items-center justify-center gap-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
            >
              <FaWhatsapp className="text-white text-lg animate-bounce-slow" />
              Chat with seller on WhatsApp
            </button>
          </div>

          {/* Product Attributes & Seller */}
          <div className="flex flex-col gap-6 mt-6">
            <div className="flex-1 p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="font-bold text-xl mb-4 text-green-800 border-b pb-2">
                Product Details
              </h2>
              <div className="grid grid-cols-2 gap-y-3 text-sm md:text-base">
                {product.attributes &&
                  Object.entries(product.attributes).map(([key, value]) => (
                    <React.Fragment key={key}>
                      <span className="text-gray-500 font-medium capitalize">
                        {key}
                      </span>
                      <span className="text-gray-700 font-semibold">
                        {value}
                      </span>
                    </React.Fragment>
                  ))}
                <span className="text-gray-500 font-medium">Category</span>
                <span className="text-gray-700 font-semibold">
                  {product.category}
                </span>
              </div>
            </div>

            {product.sellerId && (
              <div className="flex-1 p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl border border-gray-100">
                <h2 className="font-bold text-xl mb-4 text-green-800 border-b pb-2">
                  Seller Details
                </h2>

                <div className="flex items-center gap-4">
                  {/* Seller Logo */}
                  <div className="relative">
                    <img
                      src={product.sellerId.logo || sellerlogo}
                      alt={product.sellerId.shopName}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                    />
                    {/* Verified Badge */}
                    {product.sellerId.verified && (
                      <span className="absolute bottom-0 right-0 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
                        ✔
                      </span>
                    )}
                  </div>

                  {/* Seller Info */}
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 text-lg flex items-center gap-2">
                      {product.sellerId.shopName}

                      <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
                        Verified
                      </span>
                    </span>
                    {/* {product.sellerId.email && (
          <span className="text-gray-500 text-sm">{product.sellerId.email}</span>
        )} */}
                    {/* {product.sellerId.phone && (
                      <span className="text-gray-500 text-sm">
                        {product.sellerId.phone}
                      </span>
                    )} */}
                  </div>
                </div>
              </div>
            )}

            <div className="max-w-6xl border border-gray-200 py-3 mx-auto px-3">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-white border rounded-md p-3 text-center hover:shadow-sm transition"
                  >
                    <div className="flex justify-center mb-1 text-green-600 text-lg">
                      {service.icon}
                    </div>

                    <h3 className="text-sm font-semibold text-gray-800">
                      {service.title}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">{service.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductsPage heading="You May Also Like" />
      <Footer />
          {isViewerOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">

    {/* Close Button */}
    <button
      className="absolute top-5 right-5 text-white text-3xl"
      onClick={() => setIsViewerOpen(false)}
    >
      ✕
    </button>

    {/* Left Arrow */}
    {product.imageUrls.length > 1 && (
      <button
        onClick={prevImage}
        className="absolute left-5 text-white text-4xl"
      >
        ‹
      </button>
    )}

    {/* Image */}
    <img
      src={product.imageUrls[currentIndex]?.url}
      alt="preview"
      className="max-h-[90vh] max-w-[90vw] object-contain"
    />

    {/* Right Arrow */}
    {product.imageUrls.length > 1 && (
      <button
        onClick={nextImage}
        className="absolute right-5 text-white text-4xl"
      >
        ›
      </button>
    )}

  </div>
)}
    </>
  );
};

export default ProductDetails;
