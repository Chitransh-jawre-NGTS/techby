import React from "react";

const MaintenanceBanner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-green-600 via-green-500 to-green-600 text-white py-3 px-4 text-center shadow-md">
      
      <p className="text-sm md:text-base font-medium">
         We’re launching soon! Our services will start from{" "}
        <span className="font-bold underline">1st May</span>.  
        <span className="hidden sm:inline"> Thank you for your patience 💚</span>
      </p>

    </div>
  );
};

export default MaintenanceBanner;