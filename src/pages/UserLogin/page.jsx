import React, { useState } from "react";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaUser,
  FaPhone,
  FaArrowRight,
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
import toast from "react-hot-toast";

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

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data ||
          "Registration failed"
      );
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

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center lg:px-4 lg:py-10">

      {/* BACKGROUND BLUR */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-300/30 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-lime-200/40 rounded-full blur-3xl"></div>

      {/* CARD */}
      <div
        className="
          relative
          w-full
          max-w-5xl
          bg-white/90
          backdrop-blur-xl
          lg:rounded-[35px]
          overflow-hidden
          shadow-[0_20px_80px_rgba(0,0,0,0.12)]
          grid
          lg:grid-cols-2
        "
      >

        {/* LEFT SIDE */}
        <div
          className="
            hidden
            lg:flex
            flex-col
            justify-between
            bg-gradient-to-br
            from-green-600
            to-green-500
            text-white
            p-10
            relative
            overflow-hidden
          "
        >

          {/* GLOW */}
          <div className="absolute -top-10 -right-10 w-56 h-56 bg-white/10 rounded-full"></div>

          <div className="absolute bottom-0 -left-10 w-52 h-52 bg-white/10 rounded-full"></div>

          <div className="relative z-10">

            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-bold">
                T
              </div>

              <div>
                <h2 className="text-3xl font-black">
                  Techby
                </h2>

                <p className="text-green-100 text-sm">
                  Buy • Sell • Explore
                </p>
              </div>
            </div>

            <div className="mt-20">
              <h1 className="text-5xl font-black leading-tight">
                {isLogin
                  ? "Welcome Back!"
                  : "Start Selling Smarter"}
              </h1>

              <p className="mt-6 text-green-100 text-lg leading-8">
                India’s modern marketplace for
                electronics, vehicles, properties,
                fashion, jobs and more.
              </p>
            </div>
          </div>

          {/* FEATURES */}
          <div className="relative z-10 space-y-4">

            {[
              "Post products in seconds",
              "Secure login & chat",
              "Boost listings faster",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3"
              >
                <div className="w-3 h-3 rounded-full bg-white"></div>

                <p className="text-white/90">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative p-6 sm:p-10">

          {/* CLOSE */}
          <button
            onClick={() => navigate(-1)}
            className="
              absolute
              top-5
              right-5
              w-11
              h-11
              rounded-full
              bg-gray-100
              hover:bg-gray-200
              flex
              items-center
              justify-center
              text-gray-700
              transition
            "
          >
            <MdClose className="text-2xl" />
          </button>

          {/* TOP */}
          <div className="mt-8 sm:mt-2">

            <p className="text-green-600 font-semibold tracking-wide uppercase text-sm">
              Welcome to Techby
            </p>

            <h2 className="text-4xl font-black text-gray-900 mt-2">
              {isLogin
                ? "Sign In"
                : "Create Account"}
            </h2>

            <p className="text-gray-500 mt-3 leading-7">
              {isLogin
                ? "Login to continue buying and selling amazing products."
                : "Create your Techby account and start selling today."}
            </p>
          </div>

          {/* TOGGLE */}
          <div className="flex bg-gray-100 p-1 rounded-2xl mt-8">

            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-2xl font-semibold transition-all ${
                isLogin
                  ? "bg-green-600 text-white shadow-lg"
                  : "text-gray-600"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-2xl font-semibold transition-all ${
                !isLogin
                  ? "bg-green-600 text-white shadow-lg"
                  : "text-gray-600"
              }`}
            >
              Register
            </button>
          </div>

          {/* GOOGLE */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="
              mt-6
              w-full
              border
              border-gray-200
              rounded-2xl
              py-4
              flex
              items-center
              justify-center
              gap-3
              font-semibold
              bg-white
              hover:bg-gray-50
              transition
              shadow-sm
            "
          >
            <FaGoogle className="text-red-500 text-lg" />

            Continue with Google
          </button>

          

          {/* DIVIDER */}
          <div className="flex items-center gap-4 my-7">

            <div className="flex-1 h-[1px] bg-gray-200"></div>

            <span className="text-gray-400 text-sm">
              OR CONTINUE WITH EMAIL
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
                <label className="text-sm font-semibold text-gray-700">
                  Full Name
                </label>

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    border
                    border-gray-200
                    rounded-2xl
                    px-4
                    bg-gray-50
                    focus-within:border-green-500
                    focus-within:bg-white
                    transition
                  "
                >
                  <FaUser className="text-gray-400" />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-4 bg-transparent outline-none"
                    required
                  />
                </div>
              </div>
            )}

            {/* PHONE */}
            {!isLogin && (
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Phone Number
                </label>

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    border
                    border-gray-200
                    rounded-2xl
                    px-4
                    bg-gray-50
                    focus-within:border-green-500
                    focus-within:bg-white
                    transition
                  "
                >
                  <FaPhone className="text-gray-400" />

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full px-3 py-4 bg-transparent outline-none"
                    required
                  />
                </div>
              </div>
            )}

            {/* EMAIL */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <div
                className="
                  mt-2
                  flex
                  items-center
                  border
                  border-gray-200
                  rounded-2xl
                  px-4
                  bg-gray-50
                  focus-within:border-green-500
                  focus-within:bg-white
                  transition
                "
              >
                <FaEnvelope className="text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="w-full px-3 py-4 bg-transparent outline-none"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>

              <div
                className="
                  mt-2
                  flex
                  items-center
                  border
                  border-gray-200
                  rounded-2xl
                  px-4
                  bg-gray-50
                  focus-within:border-green-500
                  focus-within:bg-white
                  transition
                "
              >
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
                  placeholder="Enter password"
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
                  className="text-gray-500"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-gradient-to-r
                from-green-600
                to-green-500
                hover:from-green-700
                hover:to-green-600
                text-white
                py-4
                rounded-2xl
                font-bold
                text-lg
                flex
                items-center
                justify-center
                gap-3
                shadow-lg
                transition-all
              "
            >
              {loading
                ? "Please wait..."
                : isLogin
                ? "Login Now"
                : "Create Account"}

              {!loading && <FaArrowRight />}
            </button>
          </form>

          {/* BOTTOM */}
          <p className="text-center text-gray-500 mt-8">

            {isLogin
              ? "Don’t have an account?"
              : "Already have an account?"}

            <button
              onClick={() =>
                setIsLogin(!isLogin)
              }
              className="ml-2 text-green-600 font-bold hover:underline"
            >
              {isLogin
                ? "Register"
                : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserAuthPage;