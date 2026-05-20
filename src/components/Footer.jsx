import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaApple,
  FaGooglePlay,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaShieldAlt,
  FaCoins,
  FaBolt,
  FaHeadphones,
  FaMobileAlt,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import logo from "../assets/logo/logo.png";

const Footer = () => {
  const popularCategories = [
    "Cars",
    "Properties",
    "Mobiles",
    "Jobs",
    "Bikes",
    "Electronics",
    "Furniture",
    "Fashion",
  ];

  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Refund Policy", path: "/refund-policy" },
    { name: "Safety Tips", path: "/safety-tips" },
  ];

  const quickLinks = [
    { name: "My Account", path: "/profile" },
    { name: "My Listings", path: "/my-listings" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "Wallet", path: "/wallet" },
    { name: "Jackpot Zone", path: "/jackpot" },
    { name: "Chat", path: "/chat" },
  ];

  return (
    <footer className="bg-[#002f34] text-white mt-10">
      {/* TOP STRIP */}
      <div className="border-b border-white/10 bg-[#01363c]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                <FaShieldAlt />
              </div>

              <div>
                <h4 className="font-semibold text-sm">
                  Trusted Platform
                </h4>

                <p className="text-xs text-gray-300">
                  Verified users & sellers
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400">
                <FaCoins />
              </div>

              <div>
                <h4 className="font-semibold text-sm">
                  Earn Coins
                </h4>

                <p className="text-xs text-gray-300">
                  Refer & unlock rewards
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <FaBolt />
              </div>

              <div>
                <h4 className="font-semibold text-sm">
                  Boost Listings
                </h4>

                <p className="text-xs text-gray-300">
                  Sell products faster
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400">
                <FaHeadphones />
              </div>

              <div>
                <h4 className="font-semibold text-sm">
                  Jackpot Rewards
                </h4>

                <p className="text-xs text-gray-300">
                  Win mobiles & gadgets
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-4 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* BRAND */}
          <div className="lg:col-span-2">

            <img
              src={logo}
              alt="Techby"
              className="h-14 object-contain"
            />

            <p className="text-sm text-gray-300 mt-5 leading-7 max-w-md">
              Techby is a modern local marketplace to buy and
              sell mobiles, electronics, vehicles, furniture,
              fashion and more with trusted sellers near you.
            </p>

            {/* CONTACT */}
            <div className="mt-6 space-y-3 text-sm text-gray-300">

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-green-400" />
                <span>Indore, Madhya Pradesh, India</span>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-green-400" />
                <span>techbysupport@gmail.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-green-400" />
                <span>+91 9876543210</span>
              </div>

            </div>

            {/* SOCIAL */}
            <div className="flex items-center gap-4 mt-7">

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-green-500 transition flex items-center justify-center"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-green-500 transition flex items-center justify-center"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-green-500 transition flex items-center justify-center"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-green-500 transition flex items-center justify-center"
              >
                <FaYoutube />
              </a>

            </div>
          </div>

          {/* POPULAR CATEGORIES */}
          <div>
            <h3 className="font-bold text-lg mb-5 text-white">
              Popular Categories
            </h3>

            <ul className="space-y-3">
              {popularCategories.map((item) => (
                <li key={item}>
                  <Link
                    to={`/search?q=${item.toLowerCase()}`}
                    className="text-sm text-gray-300 hover:text-green-400 transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-bold text-lg mb-5 text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sm text-gray-300 hover:text-green-400 transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="font-bold text-lg mb-5 text-white">
              Company
            </h3>

            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sm text-gray-300 hover:text-green-400 transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* APP SECTION */}
      <div className="border-t border-white/10 bg-[#01363c]">
        <div className="max-w-7xl mx-auto px-4 py-6">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-5">

            {/* TEXT */}
            <div>
              <h3 className="font-bold text-lg">
                Download the Techby App
              </h3>

              <p className="text-sm text-gray-300 mt-1">
                Buy, sell & chat instantly from your phone.
              </p>
            </div>

            {/* STORE BUTTONS */}
            <div className="flex flex-wrap items-center gap-4">

              <button
                className="
                  flex items-center gap-3
                  bg-black
                  px-5 py-3
                  rounded-xl
                  hover:scale-105
                  transition
                "
              >
                <FaApple className="text-2xl" />

                <div className="text-left">
                  <p className="text-[10px] text-gray-300">
                    Download on the
                  </p>

                  <p className="font-semibold text-sm">
                    App Store
                  </p>
                </div>
              </button>

              <button
                className="
                  flex items-center gap-3
                  bg-black
                  px-5 py-3
                  rounded-xl
                  hover:scale-105
                  transition
                "
              >
                <FaGooglePlay className="text-xl text-green-400" />

                <div className="text-left">
                  <p className="text-[10px] text-gray-300">
                    GET IT ON
                  </p>

                  <p className="font-semibold text-sm">
                    Google Play
                  </p>
                </div>
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="bg-[#001f22] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-5">

          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-400">

            <p>
              © {new Date().getFullYear()} Techby. All rights reserved.
            </p>

            <div className="flex items-center gap-5">
              <Link
                to="/privacy-policy"
                className="hover:text-green-400 transition"
              >
                Privacy
              </Link>

              <Link
                to="/terms"
                className="hover:text-green-400 transition"
              >
                Terms
              </Link>

              <Link
                to="/contact"
                className="hover:text-green-400 transition"
              >
                Contact
              </Link>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



// import React from "react";
// import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaPhoneAlt } from "react-icons/fa";
// import { MdEmail, MdLocationOn } from "react-icons/md";
// import logo from "../assets/logo/logo.png";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <footer className="bg-[#1a1a1a] text-gray-300 px-6 md:px-12 lg:px-30 py-10">
//       {/* Top Section */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-gray-600 pb-8">
//         {/* Logo & Contact */}
//         <div>
//           <Link to="/" className="flex items-center space-x-2 mb-4">
//                 <img src={logo} alt="TechBy Logo" className="h-20" />
//                  </Link>
//           {/* <p className="text-sm text-gray-400 mb-2">
//             Call center open weekdays 9:00-20:00, weekends 9:00-18:00
//           </p> */}
//           {/* <p className="flex items-center gap-2 mt-3">
//             <FaPhoneAlt className="text-[#36b37e]" /> 
//           </p> */}
//           <p className="flex items-center gap-2 mt-2">
//             <MdEmail className="text-[#36b37e]" /> techbysupport@gmail.com
//           </p>
//           <p className="flex items-center gap-2 mt-2 text-green-400 font-semibold">
//             <MdLocationOn /> Available only in Indore
//           </p>
//         </div>

//        {/* Quick Links */}
// <div>

//   <h4 className="text-white font-semibold mb-4">QUICK LINKS</h4>
//   <ul className="space-y-2 text-gray-400">
//     <li>
//       <Link to="/about" className="hover:text-white transition">
//         About Us
//       </Link>
//     </li>

//     <li>
//       <Link to="/about" className="hover:text-white transition">
//         Privacy & Policy
//       </Link>
//     </li>

//     <li>
//       <Link to="/about" className="hover:text-white transition">
//         Terms & Conditions
//       </Link>
//     </li>

//     <li>
//       <Link to="/seller-login" className="hover:text-white transition">
//         Seller Login
//       </Link>
//     </li>
//   </ul>
// </div>

//        {/* Social Media */}
// <div>
//   <h4 className="text-white font-semibold mb-4">FOLLOW US</h4>

//   {/* Social Icons */}
//   <div className="flex items-center gap-4 text-lg mb-6">
//     <FaFacebookF className="hover:text-[#36b37e] cursor-pointer" />
//     <FaInstagram className="hover:text-[#36b37e] cursor-pointer" />
//     <FaTwitter className="hover:text-[#36b37e] cursor-pointer" />
//     <FaYoutube className="hover:text-[#36b37e] cursor-pointer" />
//   </div>

//   {/* App Download Section */}
//   <h4 className="text-white font-semibold mb-3">DOWNLOAD APP</h4>

//   <div className="flex gap-3">
//     {/* Apple Store */}
//     <div className="relative">
//       <img
//         src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
//         alt="App Store"
//         className="h-10 opacity-60"
//       />
//       <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white bg-black/60 rounded">
//         Coming Soon
//       </span>
//     </div>

//     {/* Play Store */}
//     <div className="relative">
//       <img
//         src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
//         alt="Play Store"
//         className="h-10 opacity-60"
//       />
//       <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white bg-black/60 rounded">
//         Coming Soon
//       </span>
//     </div>
//   </div>
// </div>
//       </div>

//      {/* Bottom Section */}
// <div className="flex flex-col md:flex-row justify-between items-center pt-6 text-sm text-gray-400">
//   <p>TechBy © 2025. All rights reserved.</p>


// </div>
//     </footer>
//   );
// };

// export default Footer;





// import React, { useState } from "react";
// import {
//   FaInstagram,
//   FaFacebookF,
//   FaTwitter,
//   FaYoutube,
//   FaPhoneAlt,
// } from "react-icons/fa";
// import { MdEmail, MdLocationOn } from "react-icons/md";
// import logo from "../assets/logo/logo.png";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Enquiry:", formData);

//     alert("Your enquiry has been submitted!");

//     setFormData({
//       name: "",
//       phone: "",
//       message: "",
//     });
//   };

//   return (
//     <footer className="bg-[#111] text-gray-300 px-6 md:px-12 lg:px-24 py-12">
      
//       {/* TOP SECTION */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-gray-700 pb-10">

//         {/* LOGO + ABOUT */}
//         <div>
//           <Link to="/" className="flex items-center mb-4">
//             <img src={logo} alt="TechBy Logo" className="h-16" />
//           </Link>

//           <p className="text-sm text-gray-400 leading-6">
//             TechBy is your trusted marketplace to buy and sell quality used products.
//             We connect you with verified sellers to ensure safe and hassle-free shopping.
//           </p>

//           <div className="mt-4 space-y-2 text-sm">
//             <p className="flex items-center gap-2">
//               <MdEmail className="text-green-500" /> techbysupport@gmail.com
//             </p>
//             <p className="flex items-center gap-2">
//               <MdLocationOn className="text-green-500" /> Available in Indore
//             </p>
//           </div>
//         </div>

//         {/* QUICK LINKS */}
//         <div>
//           <h4 className="text-white font-semibold mb-4">QUICK LINKS</h4>
//           <ul className="space-y-2 text-sm">
//             <li><Link to="/about" className="hover:text-green-400">About Us</Link></li>
//             <li><Link to="/privacy" className="hover:text-green-400">Privacy Policy</Link></li>
//             <li><Link to="/terms" className="hover:text-green-400">Terms & Conditions</Link></li>
//             <li><Link to="/seller-login" className="hover:text-green-400">Seller Login</Link></li>
//           </ul>
//         </div>

//         {/* CATEGORIES (IMPORTANT FOR SEO + UX) */}
//         <div>
//           <h4 className="text-white font-semibold mb-4">POPULAR CATEGORIES</h4>
//           <ul className="space-y-2 text-sm">
//             <li className="hover:text-green-400 cursor-pointer">Used Mobiles</li>
//             <li className="hover:text-green-400 cursor-pointer">Laptops</li>
//             <li className="hover:text-green-400 cursor-pointer">Accessories</li>
//             <li className="hover:text-green-400 cursor-pointer">Mobile Repair</li>
//           </ul>
//         </div>

//         {/* SELLER ENQUIRY + CTA */}
// <div>
//   <h4 className="text-white font-semibold mb-4">Become a Seller 🚀</h4>

//   <p className="text-sm text-gray-400 mb-3">
//     Grow your business with TechBy. List your products and connect with real buyers instantly.
//   </p>

//   {/* CTA Button */}
//   <Link
//     to="/seller-login"
//     className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded text-sm font-semibold mb-4 transition"
//   >
//     Start Selling
//   </Link>

//   {/* QUICK ENQUIRY FORM */}
//   <form
//     onSubmit={(e) => {
//       e.preventDefault();
//       alert("Seller enquiry submitted!");
//     }}
//     className="space-y-3"
//   >
//     <input
//       type="text"
//       placeholder="Your Name"
//       required
//       className="w-full px-3 py-2 bg-[#1f1f1f] border border-gray-600 rounded text-sm focus:outline-none focus:border-green-500"
//     />

//     <input
//       type="text"
//       placeholder="Phone Number"
//       required
//       className="w-full px-3 py-2 bg-[#1f1f1f] border border-gray-600 rounded text-sm focus:outline-none focus:border-green-500"
//     />

//     <select
//       className="w-full px-3 py-2 bg-[#1f1f1f] border border-gray-600 rounded text-sm text-gray-300 focus:outline-none focus:border-green-500"
//     >
//       <option>Select Business Type</option>
//       <option>Mobile Shop</option>
//       <option>Laptop Dealer</option>
//       <option>Accessories Seller</option>
//       <option>Repair Service</option>
//     </select>

//     <button
//       type="submit"
//       className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded text-sm font-semibold"
//     >
//       Submit Enquiry
//     </button>
//   </form>
// </div>
//       </div>

//       {/* TRUST SECTION */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center py-8 border-b border-gray-700">
//         <div>
//           <p className="text-green-500 font-bold text-lg">✔ Verified Sellers</p>
//           <p className="text-xs text-gray-400">Only trusted dealers</p>
//         </div>

//         <div>
//           <p className="text-green-500 font-bold text-lg">💬 Direct Chat</p>
//           <p className="text-xs text-gray-400">No middlemen</p>
//         </div>

//         <div>
//           <p className="text-green-500 font-bold text-lg">⚡ Fast Deals</p>
//           <p className="text-xs text-gray-400">Instant contact</p>
//         </div>

//         <div>
//           <p className="text-green-500 font-bold text-lg">🔒 Safe Platform</p>
//           <p className="text-xs text-gray-400">Secure transactions</p>
//         </div>
//       </div>

//       {/* SOCIAL + COPYRIGHT */}
//       <div className="flex flex-col md:flex-row justify-between items-center pt-6 text-sm text-gray-400">
        
//         <p>© 2026 TechBy. All rights reserved.</p>

//         <div className="flex items-center gap-4 text-lg mt-4 md:mt-0">
//           <FaFacebookF className="hover:text-green-400 cursor-pointer" />
//           <FaInstagram className="hover:text-green-400 cursor-pointer" />
//           <FaTwitter className="hover:text-green-400 cursor-pointer" />
//           <FaYoutube className="hover:text-green-400 cursor-pointer" />
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;