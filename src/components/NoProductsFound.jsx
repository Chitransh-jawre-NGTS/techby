import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";

export default function NoProductsFound() {
  const navigate = useNavigate();

  return (
    <div className=" flex items-center justify-center bg-[#f5f7f9] px-4">

      <div className="text-center max-w-md">

        {/* IMAGE */}
        {/* <div className="flex justify-center mb-6">
          <img
            src="https://assets5.lottiefiles.com/packages/lf20_qh5z2fdq.json"
            alt="No products found"
            className="w-72 h-72 object-contain"
          />
        </div> */}

        {/* TEXT */}
        <h1 className="text-2xl font-bold text-gray-800">
          No Products Found
        </h1>

        <p className="text-gray-500 mt-2 text-sm leading-6">
          We couldn’t find any products in your area right now.
          Be the first to post and get more visibility!
        </p>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/sell")}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto"
        >
          <FaPlusCircle />
          Post Your Product
        </button>

        {/* SECONDARY TEXT */}
        <p className="text-xs text-gray-400 mt-4">
          Try refreshing or changing your location
        </p>

      </div>
    </div>
  );
}