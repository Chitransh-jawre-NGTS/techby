// src/components/AdBanner.jsx

import React, { useEffect, useRef, useState } from "react";
import { FaBullhorn } from "react-icons/fa";

const AdBanner = ({ place }) => {
  const adRef = useRef(null);

  const [loaded, setLoaded] = useState(false);

  // ================= LOAD AD =================
  useEffect(() => {
  if (!adRef.current) return;

  if (adRef.current.dataset.loaded) return;

  adRef.current.dataset.loaded = "true";

//   const script = document.createElement("script");

//   script.src = "https://nap5k.com/tag.min.js";

//   script.dataset.zone = "11041786";

//   script.async = true;

//   adRef.current.appendChild(script);

  // Wait and check if ad rendered
  const timer = setTimeout(() => {
    if (
      adRef.current &&
      adRef.current.innerHTML.trim() !== ""
    ) {
      setLoaded(true);
    }
  }, 4000);

  return () => clearTimeout(timer);

}, []); 

  // ================= HEIGHTS =================
  const getHeight = () => {
    switch (place) {
      case "top-banner":
        return "min-h-[90px] sm:min-h-[250px] max-w-7xl mx-auto my-4 rounded-xl";

      case "sidebar":
        return "min-h-[250px]";

      case "homepage-middle":
        return "min-h-[120px]";

      case "homepage-bottom":
        return "min-h-[120px]";

      case "product-page":
        return "min-h-[250px]";

      default:
        return "min-h-[120px]";
    }
  };

  // ================= LOADING UI =================
  const LoadingUI = () => (
    <div
      className="
        absolute
        inset-0
        flex
        items-center
        justify-center
        bg-gradient-to-r
        from-gray-100
        via-green-50
        to-gray-100
      "
    >
      <div className="text-center">

        <div
          className="
            w-16
            h-16
            rounded-full
            bg-green-100
            flex
            items-center
            justify-center
            mx-auto
            shadow-md
          "
        >
          <FaBullhorn
            className="
              text-2xl
              text-green-600
              animate-bounce
            "
          />
        </div>

        <p
          className="
            mt-4
            text-sm
            font-semibold
            text-gray-600
          "
        >
          Sponsored Content
        </p>

      </div>
    </div>
  );

  return (
    <div
      className="
        rounded-2xl
        overflow-hidden
        border
        border-gray-200
        bg-white
        shadow-sm
      "
    >
      <div
        className={`
          relative
          w-full
          ${getHeight()}
        `}
      >

        {/* Loading Placeholder */}
        {!loaded && <LoadingUI />}

        {/* AD CONTAINER */}
        <div
          ref={adRef}
          className="
            w-full
            h-full
            flex
            items-center
            justify-center
          "
        />

      </div>
    </div>
  );
};

export default AdBanner;  



























// // src/components/AdBanner.jsx

// import React, { useEffect, useState } from "react";

// const demoAds = [
//   {
//     id: 1,
//     title: "iPhone Exchange Offer",
//     image:
//       "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",

//     redirectUrl:
//       "https://omg10.com/4/11041897",

//     place: "top-banner",
//   },

//   {
//     id: 2,
//     title: "Gaming Laptop Deals",
//     image:
//       "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200&auto=format&fit=crop",

//     redirectUrl:
//       "https://omg10.com/4/11041897",

//     place: "sidebar",
//   },

//   {
//     id: 3,
//     title: "Car Exchange Bonus",
//     image:
//       "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",

//     redirectUrl:
//       "https://omg10.com/4/11041897",

//     place: "homepage-middle",
//   },

//   {
//     id: 4,
//     title: "Mega Fashion Sale",
//     image:
//       "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop",

//     redirectUrl:
//       "https://omg10.com/4/11041897",

//     place: "homepage-bottom",
//   },

//   {
//     id: 5,
//     title: "Property & Rent Deals",
//     image:
//       "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",

//     redirectUrl:
//       "https://omg10.com/4/11041897",

//     place: "product-page",
//   },
// ];

// const AdBanner = ({ place }) => {

//   const [ads, setAds] = useState([]);

//   // ================= LOAD ADS =================
//   useEffect(() => {

//     const storedAds =
//       JSON.parse(
//         localStorage.getItem("websiteAds")
//       ) || [];

//     const allAds =
//       storedAds.length > 0
//         ? storedAds
//         : demoAds;

//     const filteredAds = allAds.filter(
//       (ad) => ad.place === place
//     );

//     setAds(filteredAds);

//   }, [place]);

//   // ================= NO ADS =================
//   if (!ads.length) return null;

//   // ================= STYLES =================
//   const getStyle = () => {

//     switch (place) {

//       case "top-banner":
//         return {
//           container:
//             "max-w-7xl mx-auto mt-5 rounded-3xl overflow-hidden shadow-md border border-gray-200",

//           image:
//             "h-[120px] sm:h-[320px] w-full object-cover",

//           wrapper:
//             "relative overflow-hidden",

//           overlay:
//             "absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent",

//           title:
//             "text-white text-lg sm:text-4xl font-bold",

//           subtitle:
//             "text-gray-200 text-xs sm:text-base mt-2",

//           button:
//             "mt-4 inline-flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-all duration-300",

//           content:
//             "absolute inset-0 flex flex-col justify-center px-6 sm:px-12",
//         };

//       case "sidebar":
//         return {
//           container:
//             "rounded-3xl overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300",

//           image:
//             "h-[280px] w-full object-cover",

//           wrapper:
//             "relative overflow-hidden",

//           overlay:
//             "absolute inset-0 bg-black/40",

//           title:
//             "text-white text-xl font-bold",

//           subtitle:
//             "text-gray-200 text-sm mt-2",

//           button:
//             "mt-4 inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-xs font-semibold",

//           content:
//             "absolute inset-0 flex flex-col justify-end p-5",
//         };

//       default:
//         return {
//           container:
//             "rounded-3xl overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300",

//           image:
//             "h-[220px] sm:h-[260px] w-full object-cover",

//           wrapper:
//             "relative overflow-hidden",

//           overlay:
//             "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent",

//           title:
//             "text-white text-2xl font-bold",

//           subtitle:
//             "text-gray-200 text-sm mt-2",

//           button:
//             "mt-4 inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-xs font-semibold",

//           content:
//             "absolute inset-0 flex flex-col justify-end p-5",
//         };
//     }
//   };

//   const styles = getStyle();

//   return (
//     <div
//       className={`
//         ${
//           place === "top-banner"
//             ? "space-y-0"
//             : "space-y-4"
//         }
//       `}
//     >

//       {ads.map((ad) => (

//         <a
//           key={ad.id}
//           href={ad.redirectUrl}
//           target="_blank"
//           rel="noreferrer"
//           className={`
//             block
//             bg-white
//             ${styles.container}
//           `}
//         >

//           {/* IMAGE */}
//           <div className={styles.wrapper}>

//             <img
//               src={ad.image}
//               alt={ad.title}
//               className={`
//                 ${styles.image}
//                 hover:scale-105
//                 transition-transform
//                 duration-700
//               `}
//             />

//             {/* OVERLAY */}
//             <div className={styles.overlay} />

//             {/* CONTENT */}
//             <div className={styles.content}>

//               <div
//                 className="
//                   mb-3
//                   inline-flex
//                   items-center
//                   w-fit
//                   px-3
//                   py-1
//                   rounded-full
//                   bg-yellow-400
//                   text-black
//                   text-[10px]
//                   sm:text-xs
//                   font-bold
//                   tracking-wide
//                 "
//               >
//                 Sponsored
//               </div>

//               <h2 className={styles.title}>
//                 {ad.title}
//               </h2>

//               <p className={styles.subtitle}>
//                 Discover premium offers and
//                 exclusive marketplace deals
//                 curated for TechBy users.
//               </p>

//               <button
//                 className={styles.button}
//               >
//                 View Offer →
//               </button>

//             </div>
//           </div>
//         </a>
//       ))}
//     </div>
//   );
// };

// export default AdBanner;