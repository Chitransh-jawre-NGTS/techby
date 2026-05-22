import React, { useEffect, useRef } from "react";

const MonetagBanner = ({ className = "" }) => {
  const adRef = useRef(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Prevent duplicate injection
    adRef.current.innerHTML = "";

    const script = document.createElement("script");

    script.dataset.zone = "11041786";
    script.src = "https://nap5k.com/tag.min.js";
    script.async = true;

    adRef.current.appendChild(script);

    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={adRef}
      className={className}
    />
  );
};

export default MonetagBanner;