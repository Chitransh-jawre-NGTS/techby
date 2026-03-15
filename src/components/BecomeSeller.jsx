import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShippingFast, FaChartLine, FaUsers, FaHeadset, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Footer from "./Footer";
import Navbar from "./Navbar";

// Use URLs directly
const heroImage = "https://picsum.photos/800/400?random=1";
const benefitImage = "https://picsum.photos/800/400?random=2";

const BecomeSeller = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const benefits = [
    {
      icon: <FaChartLine className="text-green-600 w-12 h-12" />,
      title: "Grow Your Sales",
      description: "Reach thousands of customers and expand your business effortlessly.",
      image: benefitImage,
    },
    {
      icon: <FaShippingFast className="text-green-600 w-12 h-12" />,
      title: "Fast & Easy Listing",
      description: "Add your products quickly and manage your inventory with ease.",
      image: benefitImage,
    },
    {
      icon: <FaUsers className="text-green-600 w-12 h-12" />,
      title: "Trusted Community",
      description: "Join a platform trusted by buyers and sellers across your city.",
      image: benefitImage,
    },
    {
      icon: <FaHeadset className="text-green-600 w-12 h-12" />,
      title: "Support Anytime",
      description: "Our team is always ready to help you grow and solve queries.",
      image: benefitImage,
    }
  ];

  const steps = [
    "Register with your business details.",
    "Add your products with pricing and images.",
    "Start selling and track your orders online.",
  ];

  const whyChooseUs = [
    "Large customer base ready to buy your products.",
    "Easy and intuitive seller dashboard.",
    "Transparent commission and secure payments.",
    "Marketing support to grow your business faster."
  ];

  const faqs = [
    {
      question: "Do I need a business license to join?",
      answer: "No, individual sellers can join too. But verified businesses get extra benefits."
    },
    {
      question: "How long does it take to list my products?",
      answer: "You can list products instantly after registering. Our system is fast and simple."
    },
    {
      question: "Are there any fees to join?",
      answer: "Joining TechBy is free. We charge only a small commission on completed sales."
    },
    {
      question: "How do I get paid?",
      answer: "Payments are transferred securely to your bank account after each order is completed."
    }
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-green-600 text-white py-32 px-6 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 text-center md:text-left"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Become a Seller on TechBy</h1>
          <p className="text-lg md:text-xl mb-6 max-w-md">
            Join our platform and grow your business. Reach more customers and increase your sales today!
          </p>
          <Link
            to="/seller-register"
            className="bg-white text-green-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition"
          >
            Join Now
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 mt-10 md:mt-0"
        >
          <img src={heroImage} alt="Become Seller" className="w-full max-w-md mx-auto" />
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Why Join TechBy?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition text-center relative"
            >
              <div className="flex justify-center mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
              {benefit.image && (
                <img src={benefit.image} alt="" className="absolute top-0 right-0 w-16 opacity-10" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-100 py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-12">How It Works</h2>
        <div className="max-w-3xl mx-auto space-y-8 text-left">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex items-start gap-4 bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="text-green-600 font-bold text-2xl">{index + 1}.</div>
              <p className="text-gray-700 text-lg">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {whyChooseUs.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow hover:shadow-xl transition"
            >
              <FaCheckCircle className="text-green-600 w-8 h-8 mt-1" />
              <p className="text-gray-700 font-medium">{point}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow cursor-pointer"
              onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800 text-lg">{faq.question}</h3>
                <span className="text-green-600 font-bold text-2xl">{openFAQ === index ? "-" : "+"}</span>
              </div>
              {openFAQ === index && <p className="mt-4 text-gray-600">{faq.answer}</p>}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final Call-to-Action */}
      <section className="py-32 px-6 text-center bg-green-600 text-white">
        <h2 className="text-4xl font-bold mb-6">Ready to Start Selling?</h2>
        <p className="text-lg md:text-xl mb-6 max-w-xl mx-auto">
          Join TechBy now and take your business to the next level. The process is simple, quick, and effective.
        </p>
        <Link
          to="/seller-register"
          className="bg-white text-green-600 font-semibold px-10 py-4 rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          Join as a Seller
        </Link>
      </section>

      <Footer />
    </>
  );
};

export default BecomeSeller;