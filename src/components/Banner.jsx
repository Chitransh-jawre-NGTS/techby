import React from "react";
import Banner from "..//assets/add banners/main banner.png";
import { Link } from "react-router-dom";

const BannerPage = () => {
  return (
    <div className="w-full lg:hidden bg-gradient-to-b from-green-50 to-white py-6 px-3 md:px-6">

      <div className="max-w-7xl mx-auto">

        {/* MAIN BANNER */}
        <Link to={"/jackpot"} className="relative overflow-hidden rounded-[30px] shadow-2xl border border-green-100">

          {/* GLOW EFFECT */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-yellow-400/10 pointer-events-none"></div>

          {/* IMAGE */}
            <img
                src={Banner}
            alt="Rewards Banner"
            className="w-full h-full object-cover rounded-[30px]"
          />

        </Link>

      </div>
    </div>
  );
};

export default BannerPage;