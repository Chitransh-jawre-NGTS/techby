// import React, { useState } from "react";
// import { Mail, Lock } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../store/slices/authSlice";

// const SellerLoginPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { loading } = useSelector((state) => state.auth);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const result = await dispatch(login(formData));

//     if (login.fulfilled.match(result)) {
//       alert("Login successful!");
//       navigate("/seller-dashboard");
//     } else {
//       alert(result.payload?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-green-50">

//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

//         <h2 className="text-3xl font-bold text-center text-green-700 mb-2">
//           Seller Login
//         </h2>

//         <p className="text-center text-gray-500 mb-6">
//           Login to manage your products
//         </p>

//         <form className="space-y-4" onSubmit={handleSubmit}>

//           <div className="relative">
//             <Mail className="absolute top-3 left-3 text-green-600" size={18} />

//             <input
//               type="email"
//               name="email"
//               placeholder="Email Address"
//               required
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           <div className="relative">
//             <Lock className="absolute top-3 left-3 text-green-600" size={18} />

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

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
//           >
//             {loading ? "Please wait..." : "Login"}
//           </button>

//         </form>

//       </div>
//     </div>
//   );
// };

// export default SellerLoginPage;








import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login as loginSeller } from "../../store/slices/authSlice";
import { toast } from "react-hot-toast";
const SellerLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // 👁️ Toggle state
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginSeller(formData));

    if (loginSeller.fulfilled.match(result)) {
      toast.success("Seller login successful!");
      navigate("/seller-dashboard");
    } else {
      toast.error(result.payload?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Seller Login
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          
          {/* EMAIL */}
          <div className="relative">
            <Mail className="absolute top-3 left-3 text-green-600" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 p-3 border rounded-lg"
            />
          </div>

          {/* PASSWORD WITH EYE */}
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-green-600" size={18} />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 p-3 border rounded-lg"
            />

            {/* 👁️ Eye Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-3 text-gray-500 hover:text-green-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
          >
            {loading ? "Please wait..." : "Login as Seller"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerLogin;