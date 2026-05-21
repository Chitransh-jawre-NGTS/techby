import React from "react";
import { FaCheck, FaCrown, FaRocket, FaStar } from "react-icons/fa";

const plans = [
  {
    name: "Normal Plan",
    price: 89,
    icon: <FaCheck />,
    color: "from-gray-700 to-gray-900",
    description: "Perfect for basic product listing and visibility.",
    features: [
      "1 Product Listing",
      "Standard Visibility",
      "24h Active Listing",
      "Basic Support",
    ],
    highlight: false,
  },

  {
    name: "Pro Boost Plan",
    price: 99,
    icon: <FaRocket />,
    color: "from-blue-600 to-indigo-700",
    description: "Boost your product reach instantly with priority exposure.",
    features: [
      "1 Boosted Listing",
      "Higher Search Ranking",
      "Featured in Recommendations",
      "3x More Visibility",
    ],
    highlight: true,
  },

  {
    name: "Gold Featured Plan",
    price: 239,
    icon: <FaCrown />,
    color: "from-yellow-500 to-orange-600",
    description: "Premium plan for maximum sales conversion & exposure.",
    features: [
      "Featured Top Placement",
      "Homepage Highlight",
      "5x Higher Reach",
      "Priority Support",
      "Verified Badge Boost",
    ],
    highlight: true,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white px-6 py-16">
      
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h1 className="text-4xl font-black">
          Premium Pricing Plans
        </h1>
        <p className="text-gray-400 mt-4">
          Choose a plan that fits your business growth. Upgrade anytime to increase visibility, sales, and reach.
        </p>
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {plans.map((plan, i) => (
          <div
            key={i}
            className={`
              relative rounded-3xl p-8 border
              ${plan.highlight ? "border-yellow-400/40 scale-105 shadow-2xl" : "border-white/10"}
              bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-xl
              hover:scale-105 transition duration-300
            `}
          >

            {/* ICON */}
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl bg-gradient-to-r ${plan.color} mb-6`}
            >
              {plan.icon}
            </div>

            {/* TITLE */}
            <h2 className="text-2xl font-bold">{plan.name}</h2>

            {/* PRICE */}
            <div className="mt-4 flex items-end gap-2">
              <h1 className="text-4xl font-black">₹{plan.price}</h1>
              <span className="text-gray-400 text-sm">/listing</span>
            </div>

            {/* DESC */}
            <p className="text-gray-400 mt-4 text-sm leading-6">
              {plan.description}
            </p>

            {/* FEATURES */}
            <div className="mt-6 space-y-3">
              {plan.features.map((f, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                  <FaCheck className="text-green-400" />
                  {f}
                </div>
              ))}
            </div>

            {/* BUTTON */}
            <button
              className={`
                mt-8 w-full py-3 rounded-2xl font-bold transition
                ${plan.highlight
                  ? "bg-yellow-400 text-black hover:bg-yellow-300"
                  : "bg-white/10 hover:bg-white/20"}
              `}
            >
              Choose Plan
            </button>

            {/* BADGE */}
            {plan.highlight && (
              <div className="absolute top-4 right-4 text-xs bg-yellow-400 text-black px-3 py-1 rounded-full font-bold">
                POPULAR
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FOOTER NOTE */}
      <div className="text-center text-gray-500 mt-16 text-sm">
        All plans are one-time listing charges. No hidden fees. Upgrade anytime for better reach.
      </div>
    </div>
  );
}