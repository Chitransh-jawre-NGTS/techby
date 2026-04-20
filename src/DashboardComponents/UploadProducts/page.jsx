import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Upload, CheckCircle } from "lucide-react";
import { itemFields } from "../../data/itemFields";
import { createProduct } from "../../Api/ProductApi";
import toast from "react-hot-toast";
import { getSellerLimit } from "../../Api/ProductApi";
import LimitBar from "../LimitBar";

const UploadProduct = () => {
  const { seller } = useSelector((state) => state.auth); // ✅ get seller from Redux
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    totalPrice: "",
    discountPrice: "",
    images: [],
    featured: false,
    deliveryAvailable: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [limitData, setLimitData] = useState(null);
  const selectedCategory = itemFields[formData.category];
  const dynamicFields = selectedCategory?.fields || [];

  const discountPercent =
    formData.totalPrice && formData.discountPrice
      ? Math.round(
          ((formData.totalPrice - formData.discountPrice) / formData.totalPrice) * 100
        )
      : 0;

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (name === "images" && files) {
      const selectedFiles = Array.from(files).slice(0, 4);
      setFormData((prev) => ({ ...prev, images: selectedFiles }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };
useEffect(() => {
  const fetchLimit = async () => {
    try {
      const res = await getSellerLimit();
      setLimitData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchLimit();
}, []);
 const handleSubmit = async (e) => {
  e.preventDefault();

  // 🚨 VALIDATION START
  if (!formData.title.trim()) {
    return toast.error("Product title is required");
  }

  if (!formData.description.trim()) {
    return toast.error("Description is required");
  }

  if (!formData.category) {
    return toast.error("Please select a category");
  }

  if (!formData.totalPrice || formData.totalPrice <= 0) {
    return toast.error("Enter valid total price");
  }

  if (!formData.discountPrice || formData.discountPrice <= 0) {
    return toast.error("Enter valid discounted price");
  }

  if (Number(formData.discountPrice) > Number(formData.totalPrice)) {
    return toast.error("Discount price cannot be greater than total price");
  }

  if (formData.images.length === 0) {
    return toast.error("Please upload at least 1 image");
  }

  // dynamic fields validation
  for (let field of dynamicFields) {
    if (!formData[field.name]) {
      return toast.error(`${field.label} is required`);
    }
  }
  // 🚨 VALIDATION END

  setLoading(true);

  try {
    const data = new FormData();

    data.append("name", formData.title);
    data.append("desc", formData.description);
    data.append("category", formData.category);
    data.append("totalPrice", formData.totalPrice);
    data.append("discountPrice", formData.discountPrice);
    data.append("featured", formData.featured);
    data.append("deliveryAvailable", formData.deliveryAvailable);

    formData.images.forEach((img) => data.append("images", img));

    dynamicFields.forEach((field) => {
      if (formData[field.name]) {
        data.append(field.name, formData[field.name]);
      }
    });

    const response = await createProduct(data);

    if (response.status === 201 || response.status === 200) {
      setSubmitted(true);
      toast.success("Product uploaded successfully!");

      setFormData({
        title: "",
        description: "",
        category: "",
        totalPrice: "",
        discountPrice: "",
        images: [],
        featured: false,
        deliveryAvailable: false,
      });

      setTimeout(() => setSubmitted(false), 3000);
    } else {
      toast.error(response.data.message || "Upload failed");
    }
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  const renderField = (field) => {
    const dependentValue = formData[field.dependsOn] || "";
    const options = field.dependsOn ? field.options[dependentValue] || [] : field.options;

    if (field.type === "select") {
      const dataListId = `${field.name}-options`;
      return (
        <>
          <input
            list={dataListId}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            placeholder={`Enter ${field.label} or select from list`}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <datalist id={dataListId}>
            {options.map((option, index) => (
              <option key={index} value={option} />
            ))}
          </datalist>
        </>
      );
    }

    return (
      <input
        type={field.type}
        name={field.name}
        value={formData[field.name] || ""}
        onChange={handleChange}
        placeholder={`Enter ${field.label}`}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
      />
    );
  };

  return (
    <div className="mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Upload Used Product
      </h2>
<div className="mb-6">
  <LimitBar limitData={limitData}/>
</div>
      {submitted && (
        <div className="flex items-center justify-center bg-green-50 text-green-700 py-2 rounded-md mb-4">
          <CheckCircle className="w-5 h-5 mr-2" />
          Product uploaded successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Product Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter product title"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your product..."
            rows={4}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">Select Category</option>
            {Object.keys(itemFields).map((key) => (
              <option key={key} value={key}>
                {itemFields[key].label}
              </option>
            ))}
          </select>
        </div>

        {/* Dynamic Fields */}
        {dynamicFields.map((field, index) => (
          <div key={index}>
            <label className="block text-gray-700 font-medium mb-2">{field.label}</label>
            {renderField(field)}
          </div>
        ))}

        {/* Price */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Total Price</label>
            <input
              type="number"
              name="totalPrice"
              value={formData.totalPrice}
              onChange={handleChange}
              placeholder="Enter total price"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Discounted Price</label>
            <input
              type="number"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleChange}
              placeholder="Enter discounted price"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
        </div>

        {/* Discount Display */}
        {discountPercent > 0 && (
          <div className="text-green-600 font-semibold">Discount: {discountPercent}% OFF</div>
        )}

        {/* Checkboxes */}
        <div className="flex gap-6 items-center mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 text-green-600"
            />
            <span className="text-gray-700">
              Featured Product {seller?.location !== "Indore" && "(Indore sellers only)"}
            </span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="deliveryAvailable"
              checked={formData.deliveryAvailable}
              onChange={handleChange}
              className="w-4 h-4 text-green-600"
            />
            <span className="text-gray-700">Delivery Available</span>
          </label>
        </div>
       {/* Product Image Guidelines */}
<div className="bg-white rounded-2xl shadow-md mt-10 p-6 mb-10 border-l-4 border-green-500">
  <h3 className="text-xl font-bold text-green-700 mb-4">
    Product Image Guidelines for Sellers 📸
  </h3>

  <ul className="text-gray-700 text-sm sm:text-base list-disc pl-5 space-y-3 leading-relaxed">
    <li>
      Please upload{" "}
      <span className="font-semibold text-green-600">white background images</span>{" "}
      or{" "}
      <span className="font-semibold text-green-600">
        background removed images
      </span>{" "}
      for better visibility.
    </li>

    <li>
      Do{" "}
      <span className="font-semibold text-red-600">
        not add your shop name, phone number, or promotional text
      </span>{" "}
      directly on the product image.
    </li>

    <li>
      Images with{" "}
      <span className="font-semibold text-red-600">
        direct promotion or contact details
      </span>{" "}
      may be rejected by some advertising platforms.
    </li>

    <li>
      Clean and professional product images help us{" "}
      <span className="font-semibold text-green-600">
        promote your products more effectively.
      </span>
    </li>
  </ul>

  <p className="text-gray-600 text-sm mt-4 leading-relaxed">
    Following these guidelines helps TechBy advertise your products across
    different platforms without any issues and improves product visibility
    for buyers.
  </p>
</div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Upload Images (Max 4)</label>
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            {formData.images.length > 0 ? (
              <div className="flex gap-2 overflow-x-auto w-full h-full p-1">
                {formData.images.map((img, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(img)}
                    alt={`Preview ${index + 1}`}
                    className="h-full object-cover rounded-lg"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="w-8 h-8 text-gray-400" />
                <p className="text-gray-500 mt-2">Click to upload images</p>
              </div>
            )}
            <input
              type="file"
              name="images"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
              multiple
            />
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all shadow-md ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Uploading..." : "Upload Product"}
        </button>
      </form>
      {/* Seller Rules & Important Notes */}
<div className="bg-red-50 rounded-2xl shadow-md p-6 mt-10 mb-10 border-l-4 border-red-500">
  <h3 className="text-xl font-bold text-red-700 mb-4">
    Seller Rules & Important Notes ⚠️
  </h3>

  <ul className="text-gray-700 text-sm sm:text-base list-disc pl-5 space-y-3 leading-relaxed">
    
    <li>
      Please upload images that match the <span className="font-semibold text-red-600">selected product category</span>. 
      Any unrelated images may be <span className="font-semibold text-red-600">automatically removed</span> from the platform.
    </li>

    <li>
      Sellers can upload a maximum of 
      <span className="font-semibold text-red-600"> 5 products per day</span>.
      This helps us maintain quality and fair usage of the platform.
    </li>

    <li>
      Write a <span className="font-semibold text-green-600">catchy product title and clear description</span> 
      so that users are more likely to click and buy your product.
    </li>

    <li>
      Good titles and descriptions help us 
      <span className="font-semibold text-green-600"> promote your products better</span> 
      across the TechBy platform and other promotional channels.
    </li>

  </ul>

  <p className="text-gray-600 text-sm mt-4 leading-relaxed">
    Following these rules helps maintain product quality on TechBy and increases the chances 
    of your products being promoted and discovered by more buyers.
  </p>
</div>
    </div>
  );
};

export default UploadProduct;