import React from "react";
import { Truck, CreditCard, RotateCw, Headphones, Shield, Gift, Star, Phone } from "lucide-react";

const features = [
  {
    icon: <Truck className="w-8 h-8 text-green-500" />,
    title: "Fast & Free Shipping",
    description: "Reliable and quick delivery on all eligible orders.",
  },
  // {
  //   icon: <CreditCard className="w-8 h-8 text-green-500" />,
  //   title: "Secure Payments",
  //   description: "Trusted payment options for a safe checkout experience.",
  // },
  {
    icon: <Headphones className="w-8 h-8 text-green-500" />,
    title: "24/7 Customer Support",
    description: "We’re here to help anytime you need assistance.",
  },
  // {
  //   icon: <RotateCw className="w-8 h-8 text-green-500" />,
  //   title: "Easy Returns",
  //   description: "Hassle-free returns and quick refunds on every purchase.",
  // },
  // {
  //   icon: <Shield className="w-8 h-8 text-green-500" />,
  //   title: "Purchase Protection",
  //   description: "All your orders are protected against damage or loss.",
  // },
  // {
  //   icon: <Gift className="w-8 h-8 text-green-500" />,
  //   title: "Exclusive Offers",
  //   description: "Get special deals and discounts available only for registered users.",
  // },
  {
    icon: <Star className="w-8 h-8 text-green-500" />,
    title: "Premium Quality",
    description: "We guarantee authentic and high-quality products on every order.",
  },
  {
    icon: <Phone className="w-8 h-8 text-green-500" />,
    title: "Easy Contact",
    description: "Reach us through phone, email, or chat for quick assistance.",
  },
];

const FeaturesSection = () => {
  return (

    <> <div className="max-w-7xl mx-auto px-6 py-16">

  {/* Heading */}
  <div className="text-center mb-14">
    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
      Buy & Sell Used Gadgets with TechBy
    </h1>

    <p className="mt-5 text-gray-600 text-lg max-w-4xl mx-auto leading-relaxed">
      TechBy is a trusted marketplace where users can buy and sell used mobiles,
      laptops, gaming consoles, accessories, and refurbished gadgets at affordable prices.
      Our platform connects buyers with verified sellers to ensure a smooth and reliable experience.
    </p>
  </div>

  {/* Sell Section */}
  <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 mb-10 border border-gray-100">

    <h2 className="text-3xl font-bold text-green-700 mb-5">
      Sell Your Old Gadgets
    </h2>

    <p className="text-gray-600 leading-relaxed text-lg">
      Want to sell your old mobile phone, laptop, smartwatch, or gaming console?
      TechBy makes it simple to connect with buyers and get the best value for your gadgets.
      Create your listing, upload product images, and start selling within minutes.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

      <div className="bg-green-50 rounded-2xl p-6">
        <h3 className="font-semibold text-xl text-gray-900 mb-3">
          Create Your Listing
        </h3>

        <p className="text-gray-600 leading-relaxed">
          Add your gadget details, upload images, mention condition, and set your expected price.
        </p>
      </div>

      <div className="bg-green-50 rounded-2xl p-6">
        <h3 className="font-semibold text-xl text-gray-900 mb-3">
          Connect with Buyers
        </h3>

        <p className="text-gray-600 leading-relaxed">
          Interested buyers can directly contact sellers through the TechBy platform.
        </p>
      </div>

      <div className="bg-green-50 rounded-2xl p-6">
        <h3 className="font-semibold text-xl text-gray-900 mb-3">
          Sell with Confidence
        </h3>

        <p className="text-gray-600 leading-relaxed">
          Reach thousands of gadget buyers looking for affordable used tech products.
        </p>
      </div>

    </div>
  </div>

  {/* Brands Section */}
  <div className="bg-black text-white rounded-3xl p-8 md:p-12 mb-10 overflow-hidden relative">

    <div className="relative z-10">

      <h2 className="text-3xl font-bold mb-5">
        Gadgets & Brands Available on TechBy
      </h2>

      <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
        TechBy supports a wide range of gadgets and brands including smartphones,
        laptops, gaming accessories, tablets, smartwatches, cameras, and more.
        Users can explore products from top brands available across India.
      </p>

      <div className="flex flex-wrap gap-3 mt-8">

        {[
          "Apple",
          "Samsung",
          "OnePlus",
          "Xiaomi",
          "Realme",
          "Dell",
          "HP",
          "Lenovo",
          "Asus",
          "Sony",
        ].map((brand, idx) => (
          <span
            key={idx}
            className="bg-white/10 border border-white/20 px-5 py-2 rounded-full text-sm"
          >
            {brand}
          </span>
        ))}

      </div>

    </div>

  </div>

  {/* Buy Section */}
  <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-gray-100">

    <h2 className="text-3xl font-bold text-green-700 mb-5">
      Buy Refurbished & Used Gadgets
    </h2>

    <p className="text-gray-600 leading-relaxed text-lg">
      Upgrade your tech without overspending. TechBy helps users discover affordable
      used and refurbished gadgets from trusted sellers. Compare prices, explore product
      conditions, and choose the best device according to your budget.
    </p>

   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">

  {/* LEFT CARD */}
  <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition duration-300">

    <h3 className="font-bold text-2xl text-gray-900 mb-6 flex items-center gap-2">
      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
      Why Buy from TechBy?
    </h3>

    <ul className="space-y-4 text-gray-700">

      <li className="flex items-start gap-3">
        <span className="text-green-500 text-lg">✔</span>
        <span>Affordable used gadgets at best prices</span>
      </li>

      <li className="flex items-start gap-3">
        <span className="text-green-500 text-lg">✔</span>
        <span>Multiple trusted seller options</span>
      </li>

      <li className="flex items-start gap-3">
        <span className="text-green-500 text-lg">✔</span>
        <span>Wide range of brands & categories</span>
      </li>

      <li className="flex items-start gap-3">
        <span className="text-green-500 text-lg">✔</span>
        <span>Verified and secure product listings</span>
      </li>

      <li className="flex items-start gap-3">
        <span className="text-green-500 text-lg">✔</span>
        <span>Direct buyer–seller communication</span>
      </li>

    </ul>

  </div>

  {/* RIGHT CARD */}
  <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition duration-300">

    <h3 className="font-bold text-2xl text-gray-900 mb-6 flex items-center gap-2">
      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
      How to Buy on TechBy?
    </h3>

    <ul className="space-y-4 text-gray-700">

      <li className="flex items-start gap-3">
        <span className="text-green-600 font-semibold">1</span>
        <span>Search your preferred gadget</span>
      </li>

      <li className="flex items-start gap-3">
        <span className="text-green-600 font-semibold">2</span>
        <span>Compare listings and conditions</span>
      </li>

      <li className="flex items-start gap-3">
        <span className="text-green-600 font-semibold">3</span>
        <span>Contact the seller directly</span>
      </li>

      <li className="flex items-start gap-3">
        <span className="text-green-600 font-semibold">4</span>
        <span>Finalize deal safely</span>
      </li>

      <li className="flex items-start gap-3">
        <span className="text-green-600 font-semibold">5</span>
        <span>Enjoy your affordable gadget</span>
      </li>

    </ul>

  </div>

</div>

    {/* Privacy Note */}
    <div className="mt-10 bg-green-50 border border-green-100 rounded-2xl p-6">
      <h3 className="font-semibold text-xl text-gray-900 mb-3">
        Safe & Trusted Marketplace
      </h3>

      <p className="text-gray-600 leading-relaxed">
        TechBy encourages users to verify product details, condition, and seller information
        before making any purchase. Our goal is to create a trusted and transparent marketplace
        for used gadgets and refurbished electronics.
      </p>
    </div>

  </div>

</div>
    <section className="max-w-7xl mx-auto py-16 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
        Why Shop With Us
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition duration-500 transform hover:-translate-y-2 hover:scale-105 cursor-pointer"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 transition duration-300">
              {feature.icon}
            </div>

            <h4 className="font-semibold text-lg text-gray-900 mb-2">
              {feature.title}
            </h4>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <p className="mt-12 text-center text-gray-500 text-sm">
        Trusted by hundreds of customers in Indore.
      </p>
    </section>
    </>
  );
};

export default FeaturesSection;