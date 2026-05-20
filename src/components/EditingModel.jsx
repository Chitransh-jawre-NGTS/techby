import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const EditListingModal = ({ open, onClose, data, onSave }) => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
  });

  // Fill previous data when modal opens
  useEffect(() => {
    if (data) {
      setForm({
        title: data.title || "",
        price: data.price || "",
        location: data.location || "",
      });
    }
  }, [data]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave({ ...data, ...form });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      
      <div className="bg-white w-full max-w-md rounded-2xl p-5 relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3"
        >
          <X />
        </button>

        <h2 className="text-xl font-bold mb-4">
          Edit Listing
        </h2>

        {/* TITLE */}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-3 rounded-xl mb-3"
        />

        {/* PRICE */}
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-3 rounded-xl mb-3"
        />

        {/* LOCATION */}
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-3 rounded-xl mb-5"
        />

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold"
        >
          Save Changes
        </button>

      </div>
    </div>
  );
};

export default EditListingModal;