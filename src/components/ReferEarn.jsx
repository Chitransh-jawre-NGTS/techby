import React from "react";

import {
  FaGift,
  FaCoins,
  FaUserFriends,
  FaArrowLeft,
  FaTrophy,
  FaWallet,
  FaCrown,
  FaWhatsapp,
  FaShareAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import Footer from "../components/Footer";

export default function ReferEarnPage() {
  const navigate = useNavigate();

  // ================= REDUX USER =================
  const { user } = useSelector(
    (state) => state.user
  );

  // ================= USER DATA =================
  const userCoins = user?.coins || 0;

  const username =
    user?.name ||
    user?.username ||
    "Techby User";

  const referralCode =
    user?.referralCode ||
    "TECHBY123";

  const referralLink = `${window.location.origin}/signup?ref=${referralCode}`;

  // ================= SHARE =================
  const handleShare = async () => {
    const shareText = `🔥 Join Techby Marketplace and earn rewards!

Use my referral code: ${referralCode}

🎁 Get rewards after posting your first product.

🔗 ${referralLink}`;

    // MOBILE SHARE API
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join Techby",
          text: shareText,
          url: referralLink,
        });

        return;
      } catch (error) {
        console.log(error);
      }
    }

    // FALLBACK
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      shareText
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 overflow-hidden">

        {/* ================= HEADER ================= */}

        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">

          <div className="max-w-7xl mx-auto px-3 sm:px-5 py-3 sm:py-4 flex items-center justify-between">

            {/* LEFT */}
            <div className="flex items-center gap-3">

              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center active:scale-95 transition"
              >
                <FaArrowLeft className="text-gray-700 text-sm sm:text-base" />
              </button>

              <div>

                <h1 className="text-lg sm:text-2xl font-bold text-gray-800">
                  Refer & Earn
                </h1>

                <p className="text-[11px] sm:text-sm text-gray-500">
                  Invite friends & earn rewards
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 sm:px-5 py-2 sm:py-3 rounded-2xl shadow-lg">

              <FaCoins className="text-yellow-300 text-lg sm:text-xl" />

              <div>
                <p className="text-[10px] sm:text-xs opacity-80">
                  Coins
                </p>

                <h3 className="font-bold text-sm sm:text-lg leading-none">
                  {userCoins}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* ================= HERO ================= */}

        <div className="max-w-7xl mx-auto px-3 sm:px-5 py-6 sm:py-10">

          <div className="relative overflow-hidden rounded-[28px] sm:rounded-[40px] bg-gradient-to-r from-green-700 via-emerald-600 to-green-700 shadow-2xl">

            {/* EFFECTS */}
            <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-3xl"></div>

            <div className="absolute bottom-0 left-0 w-60 h-60 sm:w-72 sm:h-72 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-10 p-5 sm:p-8 md:p-14 items-center">

              {/* LEFT */}
              <div>

                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-xs sm:text-sm">

                  <FaGift />

                  Invite & Earn Coins
                </div>

                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mt-5 leading-tight">

                  Earn Coins <br />
                  Every Referral
                </h1>

                <p className="text-green-100 text-sm sm:text-lg mt-5 leading-7 sm:leading-8 max-w-xl">

                  Invite your friends to Techby marketplace and get rewarded every time they join and upload products.
                </p>

                {/* STATS */}
                <div className="grid grid-cols-2 gap-4 sm:gap-5 mt-8">

                  <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-3xl p-4 sm:p-6">

                    <div className="flex items-center gap-3">

                      <FaCoins className="text-yellow-300 text-2xl sm:text-3xl" />

                      <div>

                        <h3 className="text-2xl sm:text-3xl font-bold text-white">
                          20
                        </h3>

                        <p className="text-green-100 text-[11px] sm:text-sm">
                          Coins Per Referral
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-3xl p-4 sm:p-6">

                    <div className="flex items-center gap-3">

                      <FaWallet className="text-white text-2xl sm:text-3xl" />

                      <div>

                        <h3 className="text-2xl sm:text-3xl font-bold text-white">
                          {userCoins}
                        </h3>

                        <p className="text-green-100 text-[11px] sm:text-sm">
                          Your Balance
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT CARD */}
              <div className="bg-white rounded-[28px] sm:rounded-[35px] shadow-2xl p-5 sm:p-8 md:p-10">

                {/* USER */}
                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white flex items-center justify-center text-xl sm:text-2xl font-bold">

                    {username?.charAt(0)}
                  </div>

                  <div>

                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                      {username}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-500">
                      Techby Rewards Member
                    </p>
                  </div>
                </div>

                {/* COINS */}
                <div className="mt-6 sm:mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-3xl p-5 sm:p-6">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-xs sm:text-sm text-gray-500">
                        Available Coins
                      </p>

                      <h2 className="text-4xl sm:text-5xl font-black text-gray-800 mt-2">
                        {userCoins}
                      </h2>
                    </div>

                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-yellow-100 flex items-center justify-center">

                      <FaCrown className="text-yellow-500 text-3xl sm:text-4xl" />
                    </div>
                  </div>
                </div>

                {/* REFERRAL CODE */}
                <div className="mt-6 sm:mt-8">

                  <p className="text-xs sm:text-sm text-gray-500 mb-3">
                    Your Referral Code
                  </p>

                  <div className="border-2 border-dashed border-green-300 bg-green-50 rounded-3xl py-4 sm:py-5 text-center">

                    <h2 className="text-3xl sm:text-4xl tracking-[4px] sm:tracking-[6px] font-black text-green-700 break-all px-2">
                      {referralCode}
                    </h2>
                  </div>
                </div>

                {/* SHARE BUTTON */}
                <button
                  onClick={handleShare}
                  className="w-full mt-6 sm:mt-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-95 active:scale-[0.98] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl transition-all text-sm sm:text-base"
                >
                  <FaWhatsapp className="text-xl" />

                  Share Referral Link
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-gray-400 text-xs">

                  <FaShareAlt />

                  Share on WhatsApp, Instagram, Telegram & more
                </div>
              </div>
            </div>
          </div>

          {/* ================= HOW IT WORKS ================= */}

          <div className="mt-14 sm:mt-20">

            <div className="text-center mb-10 sm:mb-12">

              <h2 className="text-3xl sm:text-4xl font-black text-gray-800">
                How It Works
              </h2>

              <p className="text-gray-500 mt-3 text-sm sm:text-lg">
                Start earning in 3 simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 sm:gap-8">

              {/* CARD */}
              <div className="bg-white rounded-[30px] p-6 sm:p-8 shadow-md border border-gray-100 hover:-translate-y-2 transition-all">

                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-2xl sm:text-3xl">

                  <FaUserFriends />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold mt-5 text-gray-800">
                  Invite Friends
                </h3>

                <p className="text-gray-500 mt-4 leading-7 text-sm sm:text-base">
                  Share your referral link on WhatsApp, Instagram and social media.
                </p>
              </div>

              {/* CARD */}
              <div className="bg-white rounded-[30px] p-6 sm:p-8 shadow-md border border-gray-100 hover:-translate-y-2 transition-all">

                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-yellow-100 text-yellow-600 flex items-center justify-center text-2xl sm:text-3xl">

                  <FaCoins />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold mt-5 text-gray-800">
                  Earn Rewards
                </h3>

                <p className="text-gray-500 mt-4 leading-7 text-sm sm:text-base">
                  Get 20 coins when your friend uploads their first product.
                </p>
              </div>

              {/* CARD */}
              <div className="bg-white rounded-[30px] p-6 sm:p-8 shadow-md border border-gray-100 hover:-translate-y-2 transition-all">

                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center text-2xl sm:text-3xl">

                  <FaTrophy />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold mt-5 text-gray-800">
                  Unlock Benefits
                </h3>

                <p className="text-gray-500 mt-4 leading-7 text-sm sm:text-base">
                  Use coins for premium ads, featured listings and giveaways.
                </p>
              </div>
            </div>
          </div>

          {/* ================= TERMS ================= */}

          <div className="mt-14 sm:mt-20 bg-yellow-50 border border-yellow-200 rounded-[30px] sm:rounded-[35px] p-6 sm:p-8">

            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
              Important Terms
            </h3>

            <p className="text-gray-600 mt-4 sm:mt-5 leading-7 sm:leading-8 text-sm sm:text-base">
              Coins are credited only after the referred user uploads their first product on Techby. Fake referrals, spam accounts or suspicious activity may result in reward cancellation.
            </p>
          </div>

          {/* FOOTER NOTE */}
          <div className="text-center mt-10 sm:mt-14">

            <p className="text-xs sm:text-sm text-gray-400">
              Techby Rewards Program • Fair Usage Policy Applies
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}