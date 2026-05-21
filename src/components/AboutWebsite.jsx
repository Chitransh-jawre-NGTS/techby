import React from "react";

export default function AboutWebsite() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-600 px-6 py-12 flex items-center justify-center">
      <div className="w-full max-w-7xl bg-gray-100">
        
        {/* HEADER */}
        <h1 className="text-3xl font-bold text-gray-700 mb-4">
          About Our Platform
        </h1>

        <p className="text-sm leading-7 mb-8">
          We are a modern digital marketplace designed to connect real people for buying and selling products in a simple, fast, and transparent way. Our platform removes middlemen and gives users full control over their listings, communication, and transactions. It is built to support individuals, small businesses, and resellers who want to grow online without technical complexity.
        </p>

        {/* WHAT WE DO */}
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          What We Do
        </h2>

        <p className="text-sm leading-7 mb-6">
          Our platform allows users to list products instantly, browse categories, search items, and connect directly with buyers or sellers. Everything is designed to feel simple like OLX but enhanced with modern features like coins, chat, promotions, wishlist, and smart discovery algorithms that help users find relevant products faster.
        </p>

        {/* FEATURES */}
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Key Features
        </h2>

        <ul className="text-sm leading-7 mb-8 space-y-2">
          <li>✔ Free product listing for all users</li>
          <li>✔ Direct real-time buyer & seller chat system</li>
          <li>✔ Coin-based reward and referral system</li>
          <li>✔ Featured, boosted & premium ad listings</li>
          <li>✔ Advanced category & location-based filtering</li>
          <li>✔ Secure authentication with OTP/email login</li>
          <li>✔ Wishlist & saved products system</li>
          <li>✔ Responsive mobile-first UI design</li>
          <li>✔ Fast product discovery with smart search</li>
          <li>✔ Admin moderation & fraud protection tools</li>
        </ul>

        {/* HOW IT WORKS */}
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          How It Works
        </h2>

        <p className="text-sm leading-7 mb-6">
          1. Create your account and verify your identity.
          <br />
          2. Set up your profile and add basic details.
          <br />
          3. Post your product with images, description, category, and price.
          <br />
          4. Buyers discover your listing through search or recommendations.
          <br />
          5. Chat directly with interested buyers and finalize deals.
        </p>

        {/* COIN SYSTEM */}
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Coin Reward System
        </h2>

        <p className="text-sm leading-7 mb-6">
          Our coin system rewards active users. You earn coins by referring new users, posting products, engaging with listings, and completing profile actions. These coins can be used to promote ads, unlock premium visibility, and boost product ranking.
        </p>

        {/* ADS SYSTEM */}
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Advertising & Promotion
        </h2>

        <p className="text-sm leading-7 mb-6">
          Sellers can increase product visibility using featured ads, homepage banners, and boosted listings. This system helps sellers reach more buyers and increase conversion rates faster.
        </p>

        {/* CHAT SYSTEM */}
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Chat System
        </h2>

        <p className="text-sm leading-7 mb-6">
          Our real-time chat system allows secure communication between buyers and sellers. Users can negotiate prices, ask questions, and build trust before completing transactions.
        </p>

        {/* BUYER BENEFITS */}
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Buyer Benefits
        </h2>

        <p className="text-sm leading-7 mb-6">
          Buyers can explore a wide range of products at competitive prices, connect directly with sellers, and avoid unnecessary middlemen charges. The platform ensures transparency and better deals.
        </p>

        {/* SELLER BENEFITS */}
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Seller Benefits
        </h2>

        <p className="text-sm leading-7 mb-6">
          Sellers can easily list products, reach a large audience, promote listings, and manage inquiries through chat. It helps small businesses grow online without technical barriers.
        </p>

        {/* SAFETY & TRUST */}
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Safety & Trust
        </h2>

        <p className="text-sm leading-7 mb-6">
          We implement moderation systems, reporting tools, and verification steps to reduce fraud and ensure safe transactions. User trust is our highest priority.
        </p>

        {/* VISION */}
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Our Vision
        </h2>

        <p className="text-sm leading-7 mb-8">
          We aim to build India’s most trusted digital marketplace where anyone can sell anything easily, safely, and efficiently. Our mission is to empower individuals and small businesses through technology.
        </p>

        {/* ROADMAP */}
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Future Roadmap
        </h2>

        <ul className="text-sm leading-7 mb-8 space-y-2">
          <li>✔ AI-based product recommendations</li>
          <li>✔ Advanced fraud detection system</li>
          <li>✔ In-app payment integration</li>
          <li>✔ Delivery partner integration</li>
          <li>✔ Mobile app expansion (Android & iOS)</li>
        </ul>

        {/* FOOTER NOTE */}
        <p className="text-xs text-gray-500">
          Thank you for being part of our journey. We continuously improve our platform to deliver the best marketplace experience possible.
        </p>
      </div>
    </div>
  );
}
