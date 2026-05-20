import React, { useState } from "react";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaUser,
  FaPhone,
} from "react-icons/fa";

import { MdClose } from "react-icons/md";

import { useNavigate } from "react-router-dom";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../../config/firebase";

import { useDispatch, useSelector } from "react-redux";

import {
  loginUser,
  registerUser,
  googleLogin,
} from "../../store/slices/userSlice";

const UserAuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector(
    (state) => state.user
  );

  const [showPassword, setShowPassword] =
    useState(false);

  const [isLogin, setIsLogin] =
    useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

      const firebaseToken =
        await userCredential.user.getIdToken();

      await dispatch(
        loginUser({ firebaseToken })
      ).unwrap();

      alert("Login Successful");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // ================= REGISTER =================
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

      const firebaseToken =
        await userCredential.user.getIdToken();

      await dispatch(
        registerUser({
          firebaseToken,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        })
      ).unwrap();

      alert("Registration Successful");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // ================= GOOGLE LOGIN =================
  const handleGoogleLogin = async () => {
    try {
      const provider =
        new GoogleAuthProvider();

      const result =
        await signInWithPopup(auth, provider);

      const firebaseToken =
        await result.user.getIdToken();

      await dispatch(
        googleLogin({ firebaseToken })
      ).unwrap();

      alert("Google Login Successful");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
      <div className="w-full min-h-screen md:min-h-fit max-w-md bg-white md:rounded-3xl shadow-2xl overflow-hidden">

        {/* TOP */}
        <div className="bg-green-500 px-6 pt-4 pb-8 relative">

          <button
            onClick={() => navigate(-1)}
            className="absolute top-5 right-5 text-white text-3xl"
          >
            <MdClose />
          </button>

          <h2 className="text-center text-white text-3xl font-bold mt-10">
            {isLogin
              ? "Welcome Back"
              : "Create Account"}
          </h2>

          <p className="text-center text-green-100 mt-2 text-sm">
            {isLogin
              ? "Login to continue"
              : "Register to start buying & selling"}
          </p>
        </div>

        {/* FORM */}
        <div className="px-6 pb-8">
          <div className="bg-white rounded-t-[40px] md:rounded-3xl p-6 shadow-lg min-h-[70vh]">

            {/* TOGGLE */}
            <div className="flex bg-gray-100 rounded-2xl p-1 mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 rounded-2xl font-semibold ${
                  isLogin
                    ? "bg-green-500 text-white"
                    : "text-gray-600"
                }`}
              >
                Login
              </button>

              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 rounded-2xl font-semibold ${
                  !isLogin
                    ? "bg-green-500 text-white"
                    : "text-gray-600"
                }`}
              >
                Register
              </button>
            </div>

            {/* GOOGLE LOGIN */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full border border-gray-300 rounded-2xl py-4 flex items-center justify-center gap-3 font-medium hover:bg-gray-50 transition"
            >
              <FaGoogle className="text-red-500" />
              Continue with Google
            </button>

            {/* ERROR */}
            {error && (
              <p className="text-red-500 text-center mt-3">
                {error}
              </p>
            )}

            {/* DIVIDER */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-[1px] bg-gray-200"></div>
              <span className="text-gray-400 text-sm">
                OR
              </span>
              <div className="flex-1 h-[1px] bg-gray-200"></div>
            </div>

            {/* FORM */}
            <form
              onSubmit={
                isLogin
                  ? handleLogin
                  : handleRegister
              }
              className="space-y-5"
            >

              {/* NAME */}
              {!isLogin && (
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Full Name
                  </label>

                  <div className="mt-2 flex items-center border rounded-2xl px-4 bg-gray-50">
                    <FaUser className="text-gray-400" />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-4 bg-transparent outline-none"
                      required
                    />
                  </div>
                </div>
              )}

              {/* PHONE */}
              {!isLogin && (
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Phone Number
                  </label>

                  <div className="mt-2 flex items-center border rounded-2xl px-4 bg-gray-50">
                    <FaPhone className="text-gray-400" />

                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-4 bg-transparent outline-none"
                      required
                    />
                  </div>
                </div>
              )}

              {/* EMAIL */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Email Address
                </label>

                <div className="mt-2 flex items-center border rounded-2xl px-4 bg-gray-50">
                  <FaEnvelope className="text-gray-400" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-4 bg-transparent outline-none"
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Password
                </label>

                <div className="mt-2 flex items-center border rounded-2xl px-4 bg-gray-50">
                  <FaLock className="text-gray-400" />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-4 bg-transparent outline-none"
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >
                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold text-lg"
              >
                {loading
                  ? "Please wait..."
                  : isLogin
                  ? "Login"
                  : "Register"}
              </button>
            </form>

            {/* TOGGLE TEXT */}
            <p className="text-center text-sm text-gray-500 mt-8">
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}

              <button
                onClick={() =>
                  setIsLogin(!isLogin)
                }
                className="text-green-600 font-semibold ml-1"
              >
                {isLogin
                  ? "Register"
                  : "Login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAuthPage;