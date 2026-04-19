import React, { useState } from "react";
import { X, Rocket } from "lucide-react";

const BetaBanner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w-full mb-6">
      <div className="relative flex items-center justify-between gap-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-3 rounded-2xl shadow-lg">

        {/* LEFT CONTENT */}
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl">
            <Rocket size={18} />
          </div>

          <p className="text-sm md:text-base font-medium">
            🚀 <span className="font-semibold">Beta Dashboard</span> — You’re getting early access to powerful features. Improvements are coming soon!
          </p>
        </div>

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setVisible(false)}
          className="p-2 hover:bg-white/20 rounded-lg transition"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default BetaBanner;