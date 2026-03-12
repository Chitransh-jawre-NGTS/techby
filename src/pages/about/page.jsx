import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaInfoCircle,
  FaShieldAlt,
  FaFileContract,
  FaExclamationTriangle,
} from "react-icons/fa";

const AboutPoliciesPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const sections = [
    {
      title: "About Us",
      icon: <FaInfoCircle className="text-green-600 w-5 h-5" />,
      content: (
        <>
          <p>
            Welcome to <span className="font-semibold">WWW.TECHBY.IN</span>,
            your trusted online marketplace for pre-owned products. Our platform
            connects verified dealers directly to customers, offering
            high-quality products at competitive prices.
          </p>

          <p>
            We strive to make buying and selling pre-owned goods as seamless as
            possible. From electronics and gadgets to home appliances and
            fashion items, we provide detailed listings and dealer contact
            information to help you make informed purchases.
          </p>

          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-xl flex gap-3">
            <FaExclamationTriangle className="text-green-600 mt-1" />
            <p className="text-green-800 text-sm">
              Important: Product quality and warranty are the responsibility of
              the dealer. We only provide the platform for connecting customers
              with shops.
            </p>
          </div>

          <p>
            Currently our services are available only in
            <span className="font-semibold"> Indore</span>.
          </p>
        </>
      ),
    },
    {
      title: "Privacy Policy",
      icon: <FaShieldAlt className="text-green-600 w-5 h-5" />,
      content: (
        <>
          <p>
            Your privacy is important to us. We collect information such as your
            name, phone number, email and order details to facilitate
            transactions.
          </p>

          <p>
            We never sell your personal information to third parties. Data may
            only be shared with dealers for order processing.
          </p>

          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-xl flex gap-3">
            <FaExclamationTriangle className="text-green-600 mt-1" />
            <p className="text-green-800 text-sm">
              We may update this privacy policy periodically. Please review it
              regularly.
            </p>
          </div>
        </>
      ),
    },
    {
      title: "Terms & Conditions",
      icon: <FaFileContract className="text-green-600 w-5 h-5" />,
      content: (
        <>
          <p>
            <span className="font-semibold">WWW.TECHBY.IN</span> is a
            marketplace that connects buyers with verified dealers. We do not
            own the listed products.
          </p>

          <p>
            Product quality, authenticity, warranty, and returns must be
            handled directly between the buyer and the dealer.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl flex gap-3">
            <FaExclamationTriangle className="text-yellow-600 mt-1" />
            <p className="text-yellow-800 text-sm">
              Disclaimer: We are not responsible for disputes related to
              product quality or legality.
            </p>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className=" bg-gradient-to-br from-green-50 via-white to-green-50 py-10 px-4">

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto text-center mt-20 mb-10"
      >
        <h1 className="text-4xl font-bold text-green-700">
          About & Policies
        </h1>
        <p className="text-gray-600 mt-3">
          Learn more about our platform, policies and user guidelines.
        </p>
      </motion.div>

      {/* Accordion */}
      <div className="max-w-4xl mx-auto space-y-6">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            className="bg-white/80 backdrop-blur-lg border border-gray-100 rounded-2xl shadow-lg overflow-hidden"
            whileHover={{ scale: 1.01 }}
          >
            {/* Header */}
            <button
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              className="flex items-center w-full gap-4 p-6 text-left"
            >
              <div className="bg-green-100 p-3 rounded-full">
                {section.icon}
              </div>

              <h2 className="text-lg font-semibold text-gray-800">
                {section.title}
              </h2>

              <span className="ml-auto text-xl text-gray-500">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {/* Content */}
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6 text-gray-700 space-y-4 text-sm md:text-base"
                >
                  {section.content}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AboutPoliciesPage;