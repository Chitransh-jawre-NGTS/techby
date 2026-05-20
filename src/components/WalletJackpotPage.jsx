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
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import MobileBottomNavbar from "../components/MobileBottomNavbar";

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

function FaLaptop() {
  return <span className="text-xl">💻</span>;
}

const WalletJackpotPage = () => {
  const [userCoins] = useState(68450);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f5f7f6] pb-28">

        {/* HERO */}
        <div className="relative overflow-hidden bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 text-white">

          {/* GLOW */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

          <div className="absolute bottom-0 right-0 w-72 h-72 bg-lime-300/10 rounded-full blur-3xl"></div>

          <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14 relative z-10">

            {/* TOP */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

              {/* LEFT */}
              <div className="max-w-2xl">

                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-5">
                  <FaFire className="text-yellow-300" />

                  <span className="font-semibold text-sm">
                    Daily Mega Jackpot Events
                  </span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-black leading-tight">
                  Win Premium
                  <br />
                  Products With
                  <span className="text-yellow-300">
                    {" "}
                    Techby Coins
                  </span>
                </h1>

                <p className="mt-6 text-lg text-green-50 leading-8">
                  Use your wallet coins to participate in
                  exclusive jackpot draws and win smartphones,
                  gaming consoles, headphones, laptops and more.
                </p>

                <div className="flex flex-wrap gap-4 mt-8">

                  <button
                    className="
                      bg-white
                      text-green-700
                      px-7
                      py-4
                      rounded-2xl
                      font-bold
                      flex
                      items-center
                      gap-3
                      shadow-xl
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
                    "
                  >
                    How It Works
                  </button>
                </div>
              </div>

              {/* RIGHT */}
              <div
                className="
                  bg-white/10
                  backdrop-blur-xl
                  border
                  border-white/20
                  rounded-[30px]
                  p-6
                  w-full
                  max-w-sm
                  shadow-2xl
                "
              >

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">
                      Available Coins
                    </p>

                    <h2 className="text-4xl font-black mt-2">
                      {userCoins.toLocaleString()}
                    </h2>
                  </div>

                  <div
                    className="
                      w-20
                      h-20
                      rounded-3xl
                      bg-yellow-400
                      text-green-900
                      flex
                      items-center
                      justify-center
                      text-4xl
                      shadow-xl
                    "
                  >
                    <FaCoins />
                  </div>
                </div>

                <div className="mt-8 space-y-4">

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-100">
                      Jackpot Entries
                    </span>

                    <span className="font-bold">
                      14 Active
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-100">
                      Total Wins
                    </span>

                    <span className="font-bold">
                      3 Rewards
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-100">
                      Rank
                    </span>

                    <span className="font-bold flex items-center gap-2">
                      <FaCrown className="text-yellow-300" />
                      Gold Member
                    </span>
                  </div>
                </div>

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
                  "
                >
                  Earn More Coins
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* JACKPOTS */}
        <div className="max-w-7xl mx-auto px-4 py-10">

          {/* SECTION HEADER */}
          <div className="flex items-center justify-between mb-8">

            <div>
              <h2 className="text-3xl font-black text-gray-900">
                Live Jackpot Contests
              </h2>

              <p className="text-gray-500 mt-2">
                Participate now and win amazing rewards
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
                px-5
                py-3
                rounded-2xl
                font-semibold
                shadow-sm
              "
            >
              View All
            </button>
          </div>

          {/* CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {jackpots.map((item) => (
              <div
                key={item.id}
                className="
                  bg-white
                  rounded-[30px]
                  overflow-hidden
                  border
                  border-gray-200
                  shadow-sm
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
                <div className="relative h-60 overflow-hidden">

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
                    className={`
                      absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-60
                    `}
                  ></div>

                  <div className="absolute bottom-4 left-4 right-4">

                    <div
                      className="
                        w-14
                        h-14
                        rounded-2xl
                        bg-white/20
                        backdrop-blur-md
                        flex
                        items-center
                        justify-center
                        text-white
                        text-2xl
                        mb-3
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

                  {/* COINS */}
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      bg-yellow-50
                      border
                      border-yellow-200
                      rounded-2xl
                      p-4
                    "
                  >

                    <div>
                      <p className="text-sm text-gray-500">
                        Entry Coins
                      </p>

                      <h4 className="text-2xl font-black text-gray-900 mt-1">
                        {item.coins.toLocaleString()}
                      </h4>
                    </div>

                    <div
                      className="
                        w-14
                        h-14
                        rounded-2xl
                        bg-yellow-400
                        flex
                        items-center
                        justify-center
                        text-yellow-900
                        text-2xl
                      "
                    >
                      <FaCoins />
                    </div>
                  </div>

                  {/* STATS */}
                  <div className="mt-5 space-y-3">

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
                        Winner Announcement
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

          {/* HOW IT WORKS */}
          <div className="mt-14 bg-white rounded-[35px] p-8 border border-gray-200 shadow-sm">

            <div className="text-center max-w-3xl mx-auto">

              <h2 className="text-4xl font-black text-gray-900">
                How Jackpot Works
              </h2>

              <p className="text-gray-500 mt-4 text-lg">
                Enter contests using Techby wallet coins and
                get a chance to win premium rewards.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-12">

              {/* STEP */}
              {[
                {
                  icon: <FaCoins />,
                  title: "Collect Coins",
                  desc: "Earn Techby coins by referring friends, posting products and completing activities.",
                },

                {
                  icon: <FaTrophy />,
                  title: "Join Jackpots",
                  desc: "Use your wallet coins to participate in exciting jackpot prize contests.",
                },

                {
                  icon: <FaGift />,
                  title: "Win Rewards",
                  desc: "Lucky winners receive premium gadgets, accessories and exclusive rewards.",
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="
                    bg-[#f7faf8]
                    rounded-[30px]
                    p-8
                    text-center
                    border
                  "
                >

                  <div
                    className="
                      w-20
                      h-20
                      rounded-3xl
                      bg-gradient-to-br
                      from-green-500
                      to-emerald-600
                      text-white
                      text-3xl
                      flex
                      items-center
                      justify-center
                      mx-auto
                      shadow-xl
                    "
                  >
                    {step.icon}
                  </div>

                  <h3 className="mt-6 text-2xl font-black text-gray-900">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-gray-500 leading-7">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE NAVBAR */}
      <div className="lg:hidden">
        <MobileBottomNavbar />
      </div>
    </>
  );
};

export default WalletJackpotPage;