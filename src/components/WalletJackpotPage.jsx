import React, { useState } from "react";

import {
  FaCoins,
  FaTrophy,
  FaMobileAlt,
  FaHeadphones,
  FaGift,
  FaUsers,
  FaClock,
  FaFire,
  FaArrowRight,
  FaCrown,
  FaChevronLeft,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaBolt,
  FaStar,
  FaLaptop,
  FaWallet,
  FaMedal,
  FaCheckCircle,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const jackpots = [
  {
    id: 1,
    title: "Wireless Gaming Headphones",
    coins: 100,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200",
    participants: 234,
    winnerDate: "Today 11:59 PM",
    featured: false,
    icon: <FaHeadphones />,
    gradient: "from-blue-500 to-cyan-500",
  },

  {
    id: 2,
    title: "Apple iPhone 15 Pro",
    coins: 50000,
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200",
    participants: 1120,
    winnerDate: "Tomorrow 9:00 PM",
    featured: true,
    icon: <FaMobileAlt />,
    gradient: "from-green-500 to-emerald-600",
  },

  {
    id: 3,
    title: "PlayStation 5 Console",
    coins: 5000,
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1200",
    participants: 642,
    winnerDate: "2 Days Left",
    featured: false,
    icon: <FaGift />,
    gradient: "from-purple-500 to-indigo-600",
  },

  {
    id: 4,
    title: "MacBook Air M3",
    coins: 25000,
    image:
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=1200",
    participants: 412,
    winnerDate: "3 Days Left",
    featured: false,
    icon: <FaLaptop />,
    gradient: "from-orange-500 to-red-500",
  },
];

const WalletJackpotPage = () => {
  const [userCoins] = useState(68450);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f7f6] overflow-hidden">

      {/* ================= NAVBAR ================= */}
      <div
        className="
          sticky
          top-0
          z-50
          bg-white/80
          backdrop-blur-2xl
          border-b
          border-gray-200
        "
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-4">

            <button
              onClick={() => navigate(-1)}
              className="
                w-11
                h-11
                rounded-2xl
                border
                border-gray-200
                flex
                items-center
                justify-center
                hover:bg-gray-100
                transition
              "
            >
              <FaChevronLeft />
            </button>

            <div>
              <h1 className="text-xl font-black text-gray-900">
                Techby Jackpot
              </h1>

              <p className="text-xs text-gray-500">
                Win premium rewards with wallet coins
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="
              flex
              items-center
              gap-3
              bg-gradient-to-r
              from-yellow-400
              to-yellow-300
              px-5
              py-2.5
              rounded-2xl
              shadow-lg
              border
              border-yellow-200
            "
          >
            <FaCoins className="text-yellow-900 text-lg" />

            <span className="font-black text-yellow-900 text-lg">
              {userCoins.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* ================= HERO ================= */}
      <section
        className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-green-700
          via-green-600
          to-emerald-500
          text-white
        "
      >

        {/* BACKGROUND GLOW */}
        <div className="absolute -top-20 -left-20 w-[350px] h-[350px] bg-white/10 rounded-full blur-3xl"></div>

        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-lime-300/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 relative z-10">

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* LEFT */}
            <div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  bg-white/10
                  border
                  border-white/20
                  px-4
                  py-2
                  rounded-full
                  mb-6
                  backdrop-blur-xl
                "
              >
                <FaFire className="text-yellow-300" />

                <span className="font-semibold text-sm">
                  India's Smartest Reward Jackpot Platform
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black leading-tight">

                Win Amazing
                <br />

                <span className="text-yellow-300">
                  Premium Products
                </span>

                <br />

                Using Coins
              </h1>

              <p className="mt-6 text-lg leading-8 text-green-50 max-w-2xl">
                Participate in exciting jackpot contests using
                Techby wallet coins and win iPhones, laptops,
                gaming consoles, headphones and many more
                premium rewards.
              </p>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-4 mt-8">

                {[
                  {
                    label: "Live Contests",
                    value: "24+",
                    icon: <FaBolt />,
                  },

                  {
                    label: "Total Winners",
                    value: "18K+",
                    icon: <FaTrophy />,
                  },

                  {
                    label: "Rewards Given",
                    value: "₹2Cr+",
                    icon: <FaGift />,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="
                      bg-white/10
                      border
                      border-white/20
                      rounded-3xl
                      p-5
                      backdrop-blur-xl
                    "
                  >
                    <div className="text-2xl text-yellow-300">
                      {item.icon}
                    </div>

                    <h3 className="text-2xl font-black mt-3">
                      {item.value}
                    </h3>

                    <p className="text-sm text-green-100 mt-1">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-4 mt-10">

                <button
                  className="
                    bg-white
                    text-green-700
                    px-7
                    py-4
                    rounded-2xl
                    font-black
                    flex
                    items-center
                    gap-3
                    shadow-2xl
                    hover:scale-105
                    transition
                  "
                >
                  Explore Jackpots

                  <FaArrowRight />
                </button>

                <button
                  className="
                    border
                    border-white/30
                    bg-white/10
                    backdrop-blur-md
                    px-7
                    py-4
                    rounded-2xl
                    font-semibold
                    hover:bg-white/20
                    transition
                  "
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative">

              <div
                className="
                  bg-white/10
                  border
                  border-white/20
                  backdrop-blur-2xl
                  rounded-[35px]
                  p-7
                  shadow-2xl
                "
              >

                {/* TOP */}
                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-green-100 text-sm">
                      Wallet Balance
                    </p>

                    <h2 className="text-5xl font-black mt-2">
                      {userCoins.toLocaleString()}
                    </h2>
                  </div>

                  <div
                    className="
                      w-20
                      h-20
                      rounded-[28px]
                      bg-yellow-400
                      flex
                      items-center
                      justify-center
                      text-4xl
                      text-yellow-900
                      shadow-xl
                    "
                  >
                    <FaWallet />
                  </div>
                </div>

                {/* DIVIDER */}
                <div className="h-px bg-white/20 my-7"></div>

                {/* USER INFO */}
                <div className="space-y-5">

                  {[
                    {
                      title: "Active Entries",
                      value: "14 Contests",
                      icon: <FaBolt />,
                    },

                    {
                      title: "Rewards Won",
                      value: "3 Premium Gifts",
                      icon: <FaGift />,
                    },

                    {
                      title: "Member Status",
                      value: "Gold Member",
                      icon: <FaCrown />,
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">

                        <div
                          className="
                            w-12
                            h-12
                            rounded-2xl
                            bg-white/10
                            flex
                            items-center
                            justify-center
                            text-yellow-300
                          "
                        >
                          {item.icon}
                        </div>

                        <div>
                          <p className="text-sm text-green-100">
                            {item.title}
                          </p>

                          <h3 className="font-bold">
                            {item.value}
                          </h3>
                        </div>
                      </div>

                      <FaCheckCircle className="text-lime-300" />
                    </div>
                  ))}
                </div>

                {/* BUTTON */}
                <button
                  className="
                    mt-8
                    w-full
                    bg-yellow-400
                    hover:bg-yellow-300
                    text-green-900
                    py-4
                    rounded-2xl
                    font-black
                    text-lg
                    transition
                    shadow-xl
                  "
                >
                  Earn More Coins
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LIVE JACKPOTS ================= */}
      <section className="max-w-7xl mx-auto px-4 py-14">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">

          <div>
            <h2 className="text-4xl font-black text-gray-900">
              Live Jackpot Contests
            </h2>

            <p className="text-gray-500 mt-2 text-lg">
              Join live contests and win exciting rewards
            </p>
          </div>

          <button
            className="
              hidden
              sm:flex
              items-center
              gap-2
              bg-white
              border
              border-gray-200
              px-5
              py-3
              rounded-2xl
              font-semibold
              shadow-sm
              hover:shadow-md
              transition
            "
          >
            View All
          </button>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">

          {jackpots.map((item) => (
            <div
              key={item.id}
              className="
                bg-white
                rounded-[32px]
                overflow-hidden
                border
                border-gray-200
                hover:shadow-2xl
                transition-all
                duration-300
                group
                relative
              "
            >

              {/* FEATURED */}
              {item.featured && (
                <div
                  className="
                    absolute
                    top-4
                    left-4
                    z-20
                    bg-yellow-400
                    text-black
                    px-4
                    py-2
                    rounded-full
                    text-xs
                    font-black
                    shadow-lg
                  "
                >
                  🔥 MEGA JACKPOT
                </div>
              )}

              {/* IMAGE */}
              <div className="relative h-64 overflow-hidden">

                <img
                  src={item.image}
                  alt={item.title}
                  className="
                    w-full
                    h-full
                    object-cover
                    group-hover:scale-110
                    transition
                    duration-500
                  "
                />

                <div
                  className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-70`}
                ></div>

                <div className="absolute bottom-5 left-5 right-5">

                  <div
                    className="
                      w-16
                      h-16
                      rounded-3xl
                      bg-white/20
                      backdrop-blur-xl
                      flex
                      items-center
                      justify-center
                      text-white
                      text-3xl
                      mb-4
                    "
                  >
                    {item.icon}
                  </div>

                  <h3 className="text-white text-2xl font-black leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">

                {/* ENTRY */}
                <div
                  className="
                    bg-gradient-to-r
                    from-yellow-50
                    to-orange-50
                    border
                    border-yellow-200
                    rounded-3xl
                    p-4
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div>
                    <p className="text-sm text-gray-500">
                      Entry Coins
                    </p>

                    <h4 className="text-3xl font-black text-gray-900 mt-1">
                      {item.coins.toLocaleString()}
                    </h4>
                  </div>

                  <div
                    className="
                      w-16
                      h-16
                      rounded-3xl
                      bg-yellow-400
                      flex
                      items-center
                      justify-center
                      text-yellow-900
                      text-3xl
                    "
                  >
                    <FaCoins />
                  </div>
                </div>

                {/* INFO */}
                <div className="mt-5 space-y-4">

                  <div className="flex items-center justify-between text-sm">

                    <div className="flex items-center gap-2 text-gray-500">
                      <FaUsers />
                      Participants
                    </div>

                    <span className="font-bold text-gray-800">
                      {item.participants}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">

                    <div className="flex items-center gap-2 text-gray-500">
                      <FaClock />
                      Winner Time
                    </div>

                    <span className="font-bold text-gray-800">
                      {item.winnerDate}
                    </span>
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  className={`
                    mt-6
                    w-full
                    bg-gradient-to-r
                    ${item.gradient}
                    text-white
                    py-4
                    rounded-2xl
                    font-black
                    text-lg
                    hover:scale-[1.02]
                    transition
                    shadow-lg
                  `}
                >
                  Participate Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="max-w-7xl mx-auto px-4 pb-16">

        <div className="bg-white rounded-[40px] border border-gray-200 p-8 sm:p-12 shadow-sm">

          <div className="text-center max-w-3xl mx-auto">

            <div
              className="
                inline-flex
                items-center
                gap-2
                bg-green-100
                text-green-700
                px-5
                py-2
                rounded-full
                font-bold
                mb-5
              "
            >
              <FaStar />

              Simple & Transparent
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-gray-900">
              How Jackpot Works
            </h2>

            <p className="text-gray-500 mt-5 text-lg leading-8">
              Participate in contests using wallet coins and
              win premium gadgets and rewards.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-14">

            {[
              {
                icon: <FaCoins />,
                title: "Collect Coins",
                desc: "Earn wallet coins by referrals, daily activities and posting products.",
              },

              {
                icon: <FaTrophy />,
                title: "Join Contests",
                desc: "Use your coins to enter exciting jackpot contests and lucky draws.",
              },

              {
                icon: <FaGift />,
                title: "Win Rewards",
                desc: "Lucky winners receive smartphones, gadgets and premium rewards.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="
                  relative
                  bg-[#f8faf9]
                  rounded-[35px]
                  p-8
                  border
                  border-gray-100
                  hover:shadow-xl
                  transition
                "
              >

                <div
                  className="
                    w-20
                    h-20
                    rounded-[28px]
                    bg-gradient-to-br
                    from-green-500
                    to-emerald-600
                    text-white
                    text-3xl
                    flex
                    items-center
                    justify-center
                    shadow-xl
                  "
                >
                  {step.icon}
                </div>

                <h3 className="mt-6 text-2xl font-black text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-4 text-gray-500 leading-8">
                  {step.desc}
                </p>

                <div
                  className="
                    absolute
                    top-5
                    right-5
                    w-10
                    h-10
                    rounded-full
                    bg-green-100
                    text-green-700
                    font-black
                    flex
                    items-center
                    justify-center
                  "
                >
                  {i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#111827] text-white">

        <div className="max-w-7xl mx-auto px-4 py-14">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

            {/* BRAND */}
            <div>
              <h2 className="text-4xl font-black">
                Techby
              </h2>

              <p className="mt-5 text-gray-400 leading-8">
                Buy, sell and win exciting rewards using
                Techby wallet and jackpot system.
              </p>

              <div className="flex items-center gap-4 mt-7">

                {[FaFacebookF, FaInstagram, FaTwitter].map(
                  (Icon, i) => (
                    <button
                      key={i}
                      className="
                        w-11
                        h-11
                        rounded-2xl
                        bg-white/10
                        hover:bg-white/20
                        flex
                        items-center
                        justify-center
                        transition
                      "
                    >
                      <Icon />
                    </button>
                  )
                )}
              </div>
            </div>

            {/* LINKS */}
            {[
              {
                title: "Company",
                links: [
                  "About Us",
                  "Careers",
                  "Blog",
                  "Contact",
                ],
              },

              {
                title: "Support",
                links: [
                  "Help Center",
                  "Privacy Policy",
                  "Terms & Conditions",
                  "Safety Tips",
                ],
              },

              {
                title: "Features",
                links: [
                  "Wallet Coins",
                  "Jackpot Rewards",
                  "Referral System",
                  "Premium Listings",
                ],
              },
            ].map((section, i) => (
              <div key={i}>
                <h3 className="font-bold text-xl">
                  {section.title}
                </h3>

                <ul className="mt-6 space-y-4 text-gray-400">

                  {section.links.map((link, idx) => (
                    <li
                      key={idx}
                      className="hover:text-white transition cursor-pointer"
                    >
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* BOTTOM */}
          <div
            className="
              border-t
              border-white/10
              mt-12
              pt-6
              flex
              flex-col
              sm:flex-row
              items-center
              justify-between
              gap-4
            "
          >

            <p className="text-gray-500 text-sm">
              © 2026 Techby. All rights reserved.
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FaMedal className="text-yellow-400" />

              Made with passion in India
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WalletJackpotPage;