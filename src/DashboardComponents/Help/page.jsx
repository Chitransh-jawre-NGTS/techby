import React from "react";
import { FaWhatsapp, FaQuestionCircle, FaBoxOpen, FaUser } from "react-icons/fa";

const Help = () => {

  const whatsappNumber = "91XXXXXXXXXX";

  const openWhatsApp = (message) => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">

      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Help & Support
        </h1>

        <p className="text-gray-500 mb-10">
          If you face any issue while using TechBy, you can directly contact our support team on WhatsApp.
        </p>

        {/* Help Cards */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Account Issue */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaUser className="text-green-600 text-3xl mb-4" />
            <h3 className="font-semibold text-lg mb-2">Account Problem</h3>
            <p className="text-gray-500 text-sm mb-4">
              Login issue, profile problem or account verification.
            </p>

            <button
              onClick={() =>
                openWhatsApp("Hello TechBy support, I need help with my account.")
              }
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              <FaWhatsapp /> Contact Support
            </button>
          </div>

          {/* Product Issue */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaBoxOpen className="text-green-600 text-3xl mb-4" />
            <h3 className="font-semibold text-lg mb-2">Product Listing Issue</h3>
            <p className="text-gray-500 text-sm mb-4">
              Problems adding, editing or showing products.
            </p>

            <button
              onClick={() =>
                openWhatsApp("Hello TechBy support, I have an issue with product listing.")
              }
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              <FaWhatsapp /> Contact Support
            </button>
          </div>

          {/* Other Issues */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaQuestionCircle className="text-green-600 text-3xl mb-4" />
            <h3 className="font-semibold text-lg mb-2">Other Problem</h3>
            <p className="text-gray-500 text-sm mb-4">
              Any other issue related to TechBy platform.
            </p>

            <button
              onClick={() =>
                openWhatsApp("Hello TechBy support, I need help with something.")
              }
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              <FaWhatsapp /> Contact Support
            </button>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-12 bg-green-50 border border-green-200 p-6 rounded-xl text-center">

          <h3 className="font-semibold text-lg text-gray-800 mb-2">
            Need Instant Help?
          </h3>

          <p className="text-gray-500 mb-4">
            Our TechBy support agent is available on WhatsApp to help you quickly.
          </p>

          <button
            onClick={() =>
              openWhatsApp("Hello TechBy support, I need help.")
            }
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto"
          >
            <FaWhatsapp /> Chat on WhatsApp
          </button>

        </div>

      </div>

    </div>
  );
};

export default Help;