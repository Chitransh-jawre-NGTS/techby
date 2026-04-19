// import React, { useState } from "react";
// import axios from "axios";
// import { Mail, Lock, User, Phone, Store, Image } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const SellerRegisterPage = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     fullName: "",
//     shopName: "",
//     phone: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [logoFile, setLogoFile] = useState(null); // for shop logo
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleLogoChange = (e) => {
//     setLogoFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       return alert("Passwords do not match");
//     }

//     setLoading(true);

//     try {
//       // Use FormData to send file
//       const data = new FormData();
//       data.append("name", formData.fullName);
//       data.append("shopName", formData.shopName);
//       data.append("phone", formData.phone);
//       data.append("email", formData.email);
//       data.append("password", formData.password);
//       if (logoFile) data.append("logo", logoFile);

//       await axios.post(
//         "http://localhost:5000/api/auth/sellers/register",
//         data,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       alert("Registration successful!");
//       navigate("/seller-login");
//     } catch (error) {
//       alert(error.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-green-50">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

//         <h2 className="text-3xl font-bold text-center text-green-700 mb-2">
//           Seller Registration
//         </h2>

//         <p className="text-center text-gray-500 mb-6">
//           Create your seller account
//         </p>

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           {/* Full Name */}
//           <div className="relative">
//             <User className="absolute top-3 left-3 text-green-600" size={18}/>
//             <input
//               type="text"
//               name="fullName"
//               placeholder="Full Name"
//               required
//               value={formData.fullName}
//               onChange={handleChange}
//               className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           {/* Shop Name */}
//           <div className="relative">
//             <Store className="absolute top-3 left-3 text-green-600" size={18}/>
//             <input
//               type="text"
//               name="shopName"
//               placeholder="Shop Name"
//               required
//               value={formData.shopName}
//               onChange={handleChange}
//               className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           {/* Logo Upload */}
//           <div className="relative">
//             <Image className="absolute top-3 left-3 text-green-600" size={18}/>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleLogoChange}
//               className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           {/* Phone */}
//           <div className="relative">
//             <Phone className="absolute top-3 left-3 text-green-600" size={18}/>
//             <input
//               type="text"
//               name="phone"
//               placeholder="Mobile Number"
//               required
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           {/* Email */}
//           <div className="relative">
//             <Mail className="absolute top-3 left-3 text-green-600" size={18}/>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               required
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <Lock className="absolute top-3 left-3 text-green-600" size={18}/>
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               required
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           {/* Confirm Password */}
//           <div className="relative">
//             <Lock className="absolute top-3 left-3 text-green-600" size={18}/>
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               required
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg"
//           >
//             {loading ? "Please wait..." : "Register"}
//           </button>
//         </form>

//         <p className="text-center mt-6 text-gray-600">
//           Already have an account?
//           <button
//             onClick={() => navigate("/seller-login")}
//             className="text-green-700 font-semibold ml-2 hover:underline"
//           >
//             Login
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SellerRegisterPage;




import React, { useState } from "react";
import { Mail, Lock, User, Phone, Store, Image } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/slices/authSlice";

const SellerRegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

const [formData, setFormData] = useState({
  fullName: "",
  shopName: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  location: "Indore", // default value
});

  const [logoFile, setLogoFile] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogoChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    // Prepare FormData for file upload
    const data = new FormData();
    data.append("name", formData.fullName);
    data.append("shopName", formData.shopName);
    data.append("phone", formData.phone);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("location", formData.location);

    if (logoFile) {
      data.append("logo", logoFile); // must match backend multer field name
    }

    try {
      const result = await dispatch(register(data));

      if (register.fulfilled.match(result)) {
        alert("Registration successful!");
        navigate("/admin-dashboard");
      } else {
        alert(result.payload?.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="w-full  bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-2">
          Seller Registration
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Create your seller account
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="relative">
            <User className="absolute top-3 left-3 text-green-600" size={18} />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full pl-10 p-3 border rounded-lg"
            />
          </div>

          {/* Shop Name */}
          <div className="relative">
            <Store className="absolute top-3 left-3 text-green-600" size={18} />
            <input
              type="text"
              name="shopName"
              placeholder="Shop Name"
              required
              value={formData.shopName}
              onChange={handleChange}
              className="w-full pl-10 p-3 border rounded-lg"
            />
          </div>

          {/* Logo Upload */}
          <div className="relative">
            <Image className="absolute top-3 left-3 text-green-600" size={18} />
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleLogoChange}
              required
              className="w-full pl-10 p-2 border rounded-lg"
            />
          </div>
{/* Location */}
<div className="relative">
  <select
    name="location"
    value={formData.location}
    onChange={handleChange}
    required
    className="w-full pl-3 p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
  >
    <option value="Indore">Indore</option>
    <option value="Bhopal">Bhopal</option>
    <option value="Gwalior">Gwalior</option>
    <option value="Jabalpur">Jabalpur</option>
    <option value="Ujjain">Ujjain</option>
    <option value="Sagar">Sagar</option>
    <option value="Satna">Satna</option>
    <option value="Rewa">Rewa</option>
    <option value="Ratlam">Ratlam</option>
    <option value="Khandwa">Khandwa</option>
    <option value="Dewas">Dewas</option>
    <option value="Chhindwara">Chhindwara</option>
    <option value="Seoni">Seoni</option>
    <option value="Betul">Betul</option>
    <option value="Shivpuri">Shivpuri</option>
  </select>
</div>

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute top-3 left-3 text-green-600" size={18} />
            <input
              type="text"
              name="phone"
              placeholder="Mobile Number"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-10 p-3 border rounded-lg"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute top-3 left-3 text-green-600" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 p-3 border rounded-lg"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-green-600" size={18} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 p-3 border rounded-lg"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-green-600" size={18} />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-10 p-3 border rounded-lg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg"
          >
            {loading ? "Please wait..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerRegisterPage;