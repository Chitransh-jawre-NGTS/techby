import React from "react";
import { FaRocket } from "react-icons/fa";
import logo from "../assets/logo/logo.png";

const ComingSoon = () => {
  return (
    <div className="min-h-145 flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-6 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-30 top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-emerald-200 rounded-full blur-3xl opacity-30 bottom-10 right-10"></div>

      <div className="max-w-xl w-full text-center bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-12 border border-gray-100">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-green-50 rounded-full shadow-inner">
            <img src={logo} alt="TechBy" className="h-12" />
          </div>
        </div>

        {/* Rocket */}
        <div className="flex justify-center mb-6">
          <div className="animate-bounce text-green-600 text-6xl">
            <FaRocket />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Something Awesome is Coming 🚀
        </h1>

        {/* Description */}
        <p className="text-gray-500 mb-8 text-lg leading-relaxed">
          We're working on an exciting new feature for{" "}
          <span className="font-semibold text-green-600">TechBy</span>.
          It will help sellers grow faster and buyers discover amazing products.
        </p>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div className="bg-green-600 h-2 rounded-full w-2/3 animate-pulse"></div>
        </div>

<div className="mt-6 flex flex-col items-center gap-3">

  <p className="text-sm text-gray-500">
    Need help? Contact us instantly
  </p>

  <div className="flex gap-3">
    
    <a
      href="tel:7879746796"
      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full"
    >
      📞 Call
    </a>

    <a
      href="https://wa.me/917879746796"
      target="_blank"
      rel="noreferrer"
      className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-full"
    >
      💬 WhatsApp
    </a>

  </div>
</div>
        {/* Footer */}
        <p className="text-sm text-gray-400">
          Launching very soon. Stay tuned.
        </p>

      </div>
    </div>
  );
};

export default ComingSoon;