import React from "react";

const BannerPage = () => {
  return (
    <div className="w-full lg:hidden bg-gradient-to-b from-green-50 to-white py-6 px-3 md:px-6">

      <div className="max-w-7xl mx-auto">

        {/* MAIN BANNER */}
        <div className="relative overflow-hidden rounded-[30px] shadow-2xl border border-green-100">

          {/* GLOW EFFECT */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-yellow-400/10 pointer-events-none"></div>

          {/* IMAGE */}
          <img
            src="src/assets/add banners/main banner.png"
            alt="Rewards Banner"
            className="w-full h-full object-cover rounded-[30px]"
          />

        </div>

      </div>
    </div>
  );
};

export default BannerPage;