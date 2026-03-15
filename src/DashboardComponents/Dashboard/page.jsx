import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import { FaBoxOpen, FaShoppingCart, FaInfoCircle } from "react-icons/fa";
import { GiRocket } from "react-icons/gi";
import { MdStar } from "react-icons/md";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-3xl p-8 mb-10 shadow-lg">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-green-800 mb-3">
            Welcome, Seller 👋
          </h1>
          <p className="text-gray-700 text-lg sm:text-xl mb-6">
            Manage your products, track orders, and grow your business with TechBy.
          </p>

         {/* Early Seller Benefits */}
<div className="bg-white border-l-4 border-green-500 rounded-2xl p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center gap-4">
  <GiRocket className="text-green-600 text-4xl mt-1 sm:mt-0" />
  <div className="flex-1">
    <h3 className="font-semibold text-green-800 mb-2 text-lg flex items-center gap-2">
      Early Seller Advantage <MdStar className="text-yellow-400 text-xl" />
    </h3>

    <ul className="text-gray-700 text-sm sm:text-base list-disc pl-5 space-y-1">
      <li>
        Use the <span className="font-semibold text-green-600">TechBy platform completely free</span> as an early seller
      </li>
      <li>
        <span className="font-semibold text-green-600">No listing fees or hidden charges</span>
      </li>
      <li>
        Platform will remain <span className="font-semibold text-green-600">free until delivery and advanced features launch</span>
      </li>
      <li>
        We will <span className="font-semibold text-green-600">advertise and promote your products for free</span>
      </li>
      <li>
        Get <span className="font-semibold text-green-600">priority visibility</span> as one of our first sellers
      </li>
    </ul>

    <p className="text-gray-600 text-sm mt-2">
      As an early partner, you can list and sell products on TechBy without paying
      any platform charges. We are focused on helping sellers grow while we build
      delivery and advanced marketplace features.
    </p>
  </div>
</div>
        </div>
        {/* Free Promotion Highlight */}
<div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-3xl p-6 mb-10 shadow-md flex flex-col sm:flex-row items-start sm:items-center gap-4">

  <MdStar className="text-indigo-600 text-4xl mt-1 sm:mt-0" />

  <div className="flex-1">
    <h3 className="font-bold text-indigo-800 text-xl mb-2">
      Free Promotion for Early Sellers 🚀
    </h3>

    <p className="text-gray-700 text-sm sm:text-base mb-3">
      As an early seller on TechBy, we will help you grow your business by
      promoting your products across our platform and local audience — completely free.
    </p>

    <ul className="text-gray-700 text-sm sm:text-base list-disc pl-5 space-y-1">
      <li>
        <span className="font-semibold text-indigo-600">Free product listing</span> — no charges to upload products
      </li>
      <li>
        <span className="font-semibold text-indigo-600">Free product promotion</span> on the TechBy platform
      </li>
      <li>
        <span className="font-semibold text-indigo-600">Higher visibility</span> for early sellers
      </li>
      <li>
        <span className="font-semibold text-indigo-600">No platform fees</span> until delivery & advanced features launch
      </li>
      <li>
        Opportunity to become a <span className="font-semibold text-indigo-600">trusted local seller</span> in Indore
      </li>
    </ul>

    <p className="text-gray-600 text-sm mt-3">
      Our goal is to help local businesses grow online. Early sellers will receive
      priority promotion and visibility on TechBy while the platform expands.
    </p>
  </div>
</div>

    

        {/* Development Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-2xl p-6 flex items-start gap-4 shadow-md">
          <FaInfoCircle className="text-yellow-500 text-2xl mt-1" />
          <div>
            <h3 className="font-semibold text-yellow-700 mb-1 text-lg">
              Dashboard Under Development
            </h3>
            <p className="text-yellow-800 text-sm sm:text-base leading-relaxed">
              This is a temporary version of the seller dashboard. Advanced features 
              like sales analytics, performance insights, real-time order tracking, 
              and automated reports are coming soon.
              <br />
              Thank you for being an early partner with us 🚀
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;