import React, { useState } from "react";
import { FaGift, FaShareAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function PromoBar({ user }) {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  if (!visible) return null;

  const referralLink = `${window.location.origin}/signup?ref=${user?.referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied!");
  };

  return (
    <div className="max-w-7xl mx-auto my-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white px-4 py-3 flex items-center justify-between shadow-md rounded-md relative">

      {/* CLOSE BUTTON */}
      <button
        onClick={() => setVisible(false)}
        className="absolute top-2 right-2 text-white hover:text-gray-200"
      >
        <MdClose size={20} />
      </button>

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <FaGift className="text-2xl" />

        <div>
          <p className="font-bold text-sm">
            Refer & Earn Rewards 🎁
          </p>

          <p className="text-xs opacity-90">
            Invite friends & earn coins on every signup + listing
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <button
        onClick={() => {
          handleCopy();
          navigate("/refer");
        }}
        className="bg-white text-green-700 px-4 py-1 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-100"
      >
        <FaShareAlt />
        Refer Now
      </button>
    </div>
  );
}