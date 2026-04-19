import React from "react";

const FullImageCover = ({ imageUrl, children }) => {
  return (
    <div className="w-full flex justify-center mt-10 px-4 sm:px-6 lg:px-8">
      
      {/* Container with max width */}
      <div className="relative w-full max-w-7xl h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl">
        
        {/* Image */}
        <img
          src={imageUrl}
          alt="cover"
          className="w-full h-full object-fit"
        />

        {/* Overlay */}
        <div className="absolute 0"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          {children}
        </div>

      </div>
    </div>
  );
};

export default FullImageCover;