import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  FaShippingFast,
  FaChartLine,
  FaUsers,
  FaHeadset,
  FaBullhorn,
  FaGift,
  FaBook,
  FaUserCog,
  FaMobileAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Footer from "./Footer";
import Navbar from "./Navbar";
import sellerimage from "../assets/add banners/image1.png"
import FullImageCover from "./FullImageCover";
import logo from "../assets/logo/logo.png";

const BecomeSeller = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const benefits = [
    {
      icon: <FaChartLine className="text-green-600 w-10 h-10" />,
      title: "Increase Your Sales",
      description:
        "Connect with real buyers instantly and sell faster without wasting time.",
    },
    {
      icon: <FaShippingFast className="text-green-600 w-10 h-10" />,
      title: "Quick Listing",
      description:
        "Upload products in seconds with an easy and clean seller dashboard.",
    },
    {
      icon: <FaUsers className="text-green-600 w-10 h-10" />,
      title: "Verified Buyers",
      description:
        "No fake leads. Reach genuine customers in your local area.",
    },
    {
      icon: <FaHeadset className="text-green-600 w-10 h-10" />,
      title: "Dedicated Support",
      description:
        "Get help anytime from our support team to grow your business.",
    },
  ];

  const tools = [
    {
      icon: <FaShippingFast className="text-green-600 text-2xl" />,
      title: "Fulfillment Support",
      desc: "We help you store, pack and deliver products smoothly so you can focus on selling.",
    },
    {
      icon: <FaBullhorn className="text-green-600 text-2xl" />,
      title: "Promotional Boost",
      desc: "Increase visibility with smart promotion tools and reach more buyers instantly.",
    },
    {
      icon: <FaGift className="text-green-600 text-2xl" />,
      title: "Festival Boost Sales",
      desc: "Leverage high-demand festival seasons to maximize your sales and revenue.",
    },
    {
      icon: <FaBook className="text-green-600 text-2xl" />,
      title: "Learning Center",
      desc: "Get guides, tutorials and tips to improve your selling strategy.",
    },
    {
      icon: <FaUserCog className="text-green-600 text-2xl" />,
      title: "Account Insights",
      desc: "Track performance, pricing insights and improve your store performance.",
    },
    {
      icon: <FaMobileAlt className="text-green-600 text-2xl" />,
      title: "Mobile Dashboard",
      desc: "Manage your business anytime using our mobile-friendly seller tools.",
    },
  ];

  const MotionWrap = ({ children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );

  return (
    <>
      {/* <Navbar /> */}
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all">

  <div className="max-w-7xl  mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

    {/* LEFT: LOGO */}
    <Link to="/" className="flex items-center gap-2">
      <img
        src={logo}
        alt="TechBy Logo"
        className="h-14 sm:h-16 md:h-20 object-contain"
      />
    </Link>

    {/* NAV LINKS */}
    <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">

      <button
        onClick={() =>
          document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })
        }
        className="hover:text-green-600 transition relative group"
      >
        Home
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-600 group-hover:w-full transition-all"></span>
      </button>

      <button
        onClick={() =>
          document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" })
        }
        className="hover:text-green-600 transition relative group"
      >
        Tools
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-600 group-hover:w-full transition-all"></span>
      </button>

      <button
        onClick={() =>
          document.getElementById("benefits")?.scrollIntoView({ behavior: "smooth" })
        }
        className="hover:text-green-600 transition relative group"
      >
        Benefits
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-600 group-hover:w-full transition-all"></span>
      </button>

      <button
        onClick={() =>
          document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" })
        }
        className="hover:text-green-600 transition relative group"
      >
        Inquiry
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-600 group-hover:w-full transition-all"></span>
      </button>

      <button
        onClick={() =>
          document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })
        }
        className="hover:text-green-600 transition relative group"
      >
        Start
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-600 group-hover:w-full transition-all"></span>
      </button>
    </div>

    {/* RIGHT: LOGIN BUTTON */}
    <Link
      to="/seller-login"
      className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 sm:px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
    >
      Seller Login
    </Link>

  </div>
</nav>

      {/* HERO SECTION */}
      <section id="hero"  className="py-24 bg-gradient-to-b from-green-50 to-white px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-800">
              Access powerful tools to grow <span className="text-green-600">10X faster</span>
            </h2>

            <p className="mt-5 text-gray-600 text-lg">
              TechBy gives sellers everything needed to scale — from smart tools,
              insights, and promotions to complete business control in one place.
            </p>

            <div className="mt-8 flex gap-4 flex-wrap">
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700">
                Start Selling
              </button>
              <Link to="/seller-login"
  className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
>
  Seller Login
</Link>

              <button className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50">
                Learn More
              </button>
            </div>

            <div className="mt-10 bg-white shadow-md rounded-xl p-5 w-fit border border-green-100">
              <p className="text-sm text-gray-500">Average Growth</p>
              <h3 className="text-2xl font-bold text-green-600">5X Faster Sales</h3>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {tools.map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition duration-300 hover:-translate-y-1 border border-green-50"
              >
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS SECTION */}
      <section id="tools" className="py-20 bg-green-50 px-6">
        <div className="max-w-7xl mx-auto text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800">
            Access tools to grow faster on <span className="text-green-600">TechBy</span>
          </h2>
          <p className="text-gray-600 mt-3 max-w-3xl mx-auto">
            We provide powerful seller tools designed to help you increase sales,
            improve visibility, and grow your online business effortlessly.
          </p>
        </div>

        <div className="grid max-w-7xl mx-auto sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tools.map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border border-green-100"
            >
              <div className="mb-3">{item.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>

              <button className="mt-4 text-green-600 font-medium hover:underline">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="py-20 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Sell on TechBy?
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <MotionWrap key={i}>
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg border border-green-50">
                  {b.icon}
                  <h3 className="font-semibold mt-3 mb-2">{b.title}</h3>
                  <p className="text-gray-600 text-sm">{b.description}</p>
                </div>
              </MotionWrap>
            ))}
          </div>
        </div>
      </section>
    <FullImageCover imageUrl={sellerimage}/>
        {/* INQUIRY FORM */}
      <section id="inquiry" className="py-20 bg-white px-6">
        <div className="max-w-3xl mx-auto bg-green-50 border border-green-100 rounded-2xl p-8 shadow">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Have any query? Get in touch 📩
          </h2>
          <p className="text-center text-gray-600 mt-2 mb-8">
            Fill the form and our team will contact you shortly.
          </p>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Details</label>
              <textarea
                rows="4"
                placeholder="Write your query..."
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </section>
      {/* CTA */}
      <section id="cta" className="py-20 bg-green-600 text-white text-center">
        <h2 className="text-3xl font-bold">Start Selling Today 🚀</h2>
        <p className="mt-3 mb-6">Join thousands of sellers and grow your business.</p>
        <Link
          to="/seller-register"
          className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold"
        >
          Become a Seller
        </Link>
      </section>
      

      <Footer />
    </>
  );
};

export default BecomeSeller;



