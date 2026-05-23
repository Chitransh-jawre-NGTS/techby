import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaCamera, FaArrowLeft } from "react-icons/fa";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    city: "Indore",
    state: "Madhya Pradesh",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    alert("Profile updated successfully!");
    console.log(user);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* ================= NAVBAR ================= */}
      <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <FaArrowLeft className="text-gray-700" />
          </button>

          <h1 className="text-xl font-bold text-green-700">
            TechBy
          </h1>
        </div>

        <p className="text-sm text-gray-500 hidden sm:block">
          My Profile
        </p>
      </div>

      {/* ================= BODY ================= */}
      <div className="flex-1 flex items-center justify-center p-6">

        {/* PROFILE CARD */}
        <div className="w-[650px] bg-white shadow-xl rounded-2xl p-8">

          <h2 className="text-2xl font-bold text-center mb-6">
            Account Details
          </h2>

          {/* PROFILE IMAGE */}
          <div className="flex flex-col items-center mb-8 relative">

            <div className="w-28 h-28 rounded-full border-4 border-green-600 overflow-hidden flex items-center justify-center bg-gray-100">
              {image ? (
                <img src={image} className="w-full h-full object-cover" />
              ) : (
                <FaUserCircle className="text-7xl text-gray-400" />
              )}
            </div>

            <label className="absolute bottom-0 right-[42%] bg-green-600 p-2 rounded-full text-white cursor-pointer shadow-md hover:bg-green-700">
              <FaCamera />
              <input type="file" className="hidden" onChange={handleImageChange} />
            </label>
          </div>

          {/* FORM */}
          <div className="grid grid-cols-2 gap-5">

            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Phone</label>
              <input
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">City</label>
              <input
                name="city"
                value={user.city}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm text-gray-600">State</label>
              <input
                name="state"
                value={user.state}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
          </div>

          {/* SAVE */}
          <button
            onClick={handleSave}
            className="w-full mt-7 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="bg-white border-t text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} TechBy. All rights reserved.
      </div>
    </div>
  );
};

export default ProfilePage;