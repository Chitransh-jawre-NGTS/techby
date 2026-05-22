import React from "react";
import { FaGift, FaShareAlt, FaCoins, FaUserFriends } from "react-icons/fa";

export default function ReferEarnPage() {
  const referralCode = "TECHBY123"; // later from backend

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    alert("Referral code copied!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4 lg:p-10">

      {/* HEADER */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Refer & Earn
        </h1>

        <p className="text-gray-500 mt-2">
          Invite friends, earn coins & win exciting rewards
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg border p-6 lg:p-10">

        {/* REFERRAL CODE */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex flex-col lg:flex-row items-center justify-between gap-4">

          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Your Referral Code
            </h2>

            <p className="text-2xl font-bold text-green-700 mt-1 tracking-wider">
              {referralCode}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Share this code with your friends
            </p>
          </div>

          <button
            onClick={copyCode}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            <FaShareAlt />
            Copy Code
          </button>
        </div>

        {/* HOW IT WORKS */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">

          {/* STEP 1 */}
          <div className="border rounded-2xl p-6 text-center hover:shadow-md transition">
            <FaUserFriends className="text-3xl text-green-600 mx-auto" />
            <h3 className="font-bold mt-4">Refer Friends</h3>
            <p className="text-sm text-gray-500 mt-2">
              Share your referral code with friends
            </p>
          </div>

          {/* STEP 2 */}
          <div className="border rounded-2xl p-6 text-center hover:shadow-md transition">
            <FaCoins className="text-3xl text-yellow-500 mx-auto" />
            <h3 className="font-bold mt-4">Earn Coins</h3>
            <p className="text-sm text-gray-500 mt-2">
              You get 20 coins, friend gets 10 coins
            </p>
          </div>

          {/* STEP 3 */}
          <div className="border rounded-2xl p-6 text-center hover:shadow-md transition">
            <FaGift className="text-3xl text-pink-500 mx-auto" />
            <h3 className="font-bold mt-4">Win Rewards</h3>
            <p className="text-sm text-gray-500 mt-2">
              Use coins to join events & win prizes
            </p>
          </div>
        </div>

        {/* CONDITION BOX */}
        <div className="mt-10 bg-yellow-50 border border-yellow-200 rounded-2xl p-5">

          <h3 className="font-bold text-gray-800">
            ⚠ Important Condition
          </h3>

          <p className="text-sm text-gray-600 mt-2 leading-6">
            Coins will only be credited when the referred user posts
            at least <b>1 advertisement</b> on Techby. This ensures real users
            and prevents spam referrals.
          </p>
        </div>

        {/* COINS SUMMARY */}
        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
            <h2 className="text-3xl font-bold text-green-700">20</h2>
            <p className="text-gray-600 mt-1">Coins for You</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
            <h2 className="text-3xl font-bold text-blue-700">10</h2>
            <p className="text-gray-600 mt-1">Coins for Friend</p>
          </div>
        </div>

        {/* EVENTS SECTION */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            🎁 Redeem Coins for Events
          </h2>

          <div className="grid md:grid-cols-3 gap-5">

            {[
              {
                title: "Headphones Giveaway",
                coins: "100 Coins",
                color: "bg-purple-50 border-purple-200",
              },
              {
                title: "Smartphone Contest",
                coins: "500 Coins",
                color: "bg-green-50 border-green-200",
              },
              {
                title: "Cycle Lucky Draw",
                coins: "200 Coins",
                color: "bg-yellow-50 border-yellow-200",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`border rounded-2xl p-5 hover:shadow-md transition ${item.color}`}
              >
                <h3 className="font-bold text-gray-800">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 mt-2">
                  Join using coins & win exciting prizes
                </p>

                <button className="mt-4 w-full bg-black text-white py-2 rounded-xl text-sm">
                  Join for {item.coins}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER NOTE */}
        <p className="text-center text-xs text-gray-400 mt-10">
          Techby Referral System • Fair usage policy applies
        </p>
      </div>
    </div>
  );
}