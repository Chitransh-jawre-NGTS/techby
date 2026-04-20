import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import {
  FaStore,
  FaMobileAlt,
  FaTools,
  FaShippingFast,
  FaCheckCircle,
  FaUsers,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-gray-300 px-4 sm:px-6 lg:px-8 py-10">
      
      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto">

        {/* TOP FEATURES */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 border-b border-gray-700 pb-8">
          {[
            { title: "Verified Sellers", desc: "Trusted dealers", icon: <FaCheckCircle /> },
            { title: "Direct Contact", desc: "No middleman", icon: <FaUsers /> },
            { title: "Mobiles", desc: "Best deals", icon: <FaMobileAlt /> },
            { title: "Repair", desc: "Fast service", icon: <FaTools /> },
            { title: "Delivery", desc: "Same/Next day", icon: <FaShippingFast /> },
            { title: "Local Market", desc: "Indore only", icon: <FaStore /> },
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="text-green-500 text-lg">{item.icon}</div>
              <p className="text-white font-semibold text-sm">{item.title}</p>
              <p className="text-gray-400 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* MIDDLE SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-b border-gray-700">

          {/* BRAND */}
          <div>
            <h2 className="text-white text-2xl font-bold mb-2">TechBy</h2>

            <p className="text-sm text-gray-400 mb-3">
              Buy & sell used products with verified sellers in Indore.
            </p>

            <p className="flex items-center gap-2 text-sm">
              <MdLocationOn className="text-green-500" /> Indore, India
            </p>

            <p className="flex items-center gap-2 text-sm mt-2">
              <MdEmail className="text-green-500" /> techbysupport@gmail.com
            </p>

            <div className="flex gap-4 mt-4 text-lg">
              <FaFacebookF className="hover:text-green-400 cursor-pointer" />
              <FaInstagram  className="hover:text-green-400 cursor-pointer" />
              <FaTwitter className="hover:text-green-400 cursor-pointer" />
              <FaYoutube className="hover:text-green-400 cursor-pointer" />
            </div>
          </div>

          {/* SELLER CTA */}
          <div>
            <h4 className="text-white font-semibold mb-3">Become Seller</h4>

            <p className="text-sm text-gray-400 mb-4">
              Start selling your products and grow your business.
            </p>

            <a
              href="/seller-login"
              className="block text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded text-sm font-semibold"
            >
              Start Selling
            </a>
          </div>

          {/* LINKS */}
          <div>
            <h4 className="text-white font-semibold mb-3">Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">About</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer">Terms</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* CATEGORIES */}
          <div>
            <h4 className="text-white font-semibold mb-3">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">Mobiles</li>
              <li className="hover:text-white cursor-pointer">Laptops</li>
              <li className="hover:text-white cursor-pointer">Accessories</li>
              <li className="hover:text-white cursor-pointer">Repair</li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        {/* <div className="flex flex-col sm:flex-row justify-between items-center pt-6 text-sm text-gray-400 gap-3">
          <p>© 2026 TechBy. All rights reserved.</p>

          <div className="flex gap-3">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Mastercard-logo.png" className="h-6" />
          </div>
        </div> */}

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