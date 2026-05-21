// src/components/AdBanner.jsx

import React, { useEffect, useState } from "react";

const demoAds = [
  {
    id: 1,
    title: "iPhone Sale",
    image:
     "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",
    redirectUrl: "https://google.com",
    place: "top-banner",
  },

  {
    id: 2,
    title: "Gaming Laptop",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200&auto=format&fit=crop",
    redirectUrl: "https://google.com",
    place: "sidebar",
  },

  {
    id: 3,
    title: "Car Offer",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    redirectUrl: "https://google.com",
    place: "homepage-middle",
  },

  {
    id: 4,
    title: "Fashion Sale",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop",
    redirectUrl: "https://google.com",
    place: "homepage-bottom",
  },

  {
    id: 5,
    title: "Property Deals",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
    redirectUrl: "https://google.com",
    place: "product-page",
  },
];

const AdBanner = ({ place }) => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    // ================= GET LOCAL ADS =================
    const storedAds =
      JSON.parse(
        localStorage.getItem("websiteAds")
      ) || [];

    // ================= USE DEMO ADS =================
    const allAds =
      storedAds.length > 0
        ? storedAds
        : demoAds;

    // ================= FILTER ADS =================
    const filteredAds = allAds.filter(
      (ad) => ad.place === place
    );

    setAds(filteredAds);
  }, [place]);

  // ================= NO ADS =================
  if (!ads.length) return null;

  // ================= STYLES =================
  const getStyle = () => {
    switch (place) {
      case "top-banner":
        return {
          container:
            " shadow-none max-w-7xl rounded-2xl mx-auto mt-6 border-y border-gray-200",
          image:
            "h-[80px]  sm:h-[300px]  w-full object-cover",
          wrapper:
            "relative overflow-hidden",
          content:
            "absolute inset-0 flex items-center  justify-between px-4 bg-black/40",
          title:
            "text-white text-sm sm:text-base font-bold truncate",
        };

      case "sidebar":
        return {
          container:
            "rounded-2xl shadow-sm hover:shadow-xl border border-gray-200",
          image:
            "h-[280px] w-full object-cover",
          wrapper:
            "overflow-hidden",
          content: "p-4",
          title:
            "text-gray-800 text-lg font-semibold",
        };

      case "homepage-middle":
        return {
          container:
            "rounded-3xl shadow-md hover:shadow-2xl border border-gray-100",
          image:
            "h-[180px] sm:h-[250px] w-full object-cover",
          wrapper:
            "overflow-hidden",
          content: "p-5",
          title:
            "text-gray-900 text-xl font-bold",
        };

      case "homepage-bottom":
        return {
          container:
            "rounded-3xl shadow-md hover:shadow-2xl border border-gray-100",
          image:
            "h-[160px] sm:h-[220px] w-full object-cover",
          wrapper:
            "overflow-hidden",
          content: "p-4",
          title:
            "text-gray-900 text-lg font-semibold",
        };

      case "product-page":
        return {
          container:
            "rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100",
          image:
            "h-[220px] sm:h-[320px] w-full object-cover",
          wrapper:
            "overflow-hidden",
          content: "p-5",
          title:
            "text-gray-900 text-xl font-bold",
        };

      default:
        return {
          container:
            "rounded-2xl shadow-sm border border-gray-200",
          image:
            "h-[180px] w-full object-cover",
          wrapper:
            "overflow-hidden",
          content: "p-4",
          title:
            "text-gray-900 text-lg font-semibold",
        };
    }
  };

  const styles = getStyle();

  return (
    <div
      className={`space-y-4 ${
        place === "top-banner"
          ? "space-y-0"
          : ""
      }`}
    >
      {ads.map((ad) => (
        <a
          key={ad.id}
          href={ad.redirectUrl || "#"}
          target="_blank"
          rel="noreferrer"
          className={`
            block
            bg-white
            transition-all
            duration-300
            overflow-hidden
            ${styles.container}
          `}
        >

          {/* IMAGE WRAPPER */}
          <div className={styles.wrapper}>

            {/* IMAGE */}
            <img
              src={ad.image}
              alt={ad.title}
              className={`
                ${styles.image}
                hover:scale-105
                transition-transform
                duration-500
              `}
            />

            {/* TOP BANNER CONTENT */}
            {place === "top-banner" && (
              <div className={styles.content}>
                <h3 className={styles.title}>
                  {ad.title}
                </h3>

                <span
                  className="
                    bg-yellow-400
                    text-black
                    text-[10px]
                    sm:text-xs
                    px-2 py-1
                    rounded-full
                    font-bold
                  "
                >
                  Sponsored
                </span>
              </div>
            )}
          </div>

          {/* NORMAL CONTENT */}
          {place !== "top-banner" && (
            <div className={styles.content}>

              <div className="flex items-center justify-between gap-3">

                <h3 className={styles.title}>
                  {ad.title}
                </h3>

                <span
                  className="
                    text-[10px]
                    uppercase
                    tracking-wide
                    bg-gray-100
                    text-gray-600
                    px-2 py-1
                    rounded-full
                    font-semibold
                    whitespace-nowrap
                  "
                >
                  Sponsored
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                Discover amazing deals and offers
                curated for you on TechBy.
              </p>
            </div>
          )}
        </a>
      ))}
    </div>
  );
};

export default AdBanner;