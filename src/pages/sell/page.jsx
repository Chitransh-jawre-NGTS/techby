// ================= IMPORTS =================
import React from "react";
import { categories } from "../../data/Categories";
import { createProduct } from "../../Api/ProductApi";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { ArrowLeft, ImagePlus, MapPin, IndianRupee } from "lucide-react";

export default function SellPage() {
  // ================= STEP STATE =================
  const [step, setStep] = React.useState(1);

  const steps = ["Category", "Subcategory", "Images", "Details", "Pricing"];
  const navigate = useNavigate();
  // ================= SELECTED =================
  const [selectedMainCategory, setSelectedMainCategory] = React.useState(null);

  const [selectedSubCategory, setSelectedSubCategory] = React.useState(null);

  // ================= FORM =================
  const [formData, setFormData] = React.useState({
    mainCategory: "",
    subCategory: "",
    title: "",
    description: "",
    price: "",
    location: "",
    images: [],
    dynamicFields: {},
  });

  const [loading, setLoading] = React.useState(false);

  const [previewUrls, setPreviewUrls] = React.useState([]);

  // ================= IMAGE PREVIEW =================
  React.useEffect(() => {
    const urls = formData.images.map((img) => URL.createObjectURL(img));

    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [formData.images]);

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ================= DYNAMIC FIELD CHANGE =================
  const handleDynamicFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      dynamicFields: {
        ...prev.dynamicFields,
        [field]: value,
      },
    }));
  };

  // ================= CATEGORY =================
  const handleMainCategory = (category) => {
    setSelectedMainCategory(category);

    setFormData((prev) => ({
      ...prev,
      mainCategory: category.label,
    }));

    setStep(2);
  };

  // ================= SUBCATEGORY =================
  const handleSubCategory = (sub) => {
    setSelectedSubCategory(sub);

    setFormData((prev) => ({
      ...prev,
      subCategory: sub.label,
    }));

    setStep(3);
  };

  // ================= IMAGE UPLOAD =================
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    setFormData((prev) => ({
      ...prev,
      images: files,
    }));
  };

  // ================= VALIDATION =================
  const canStep3 = formData.images.length > 0;

  // ================= SUBMIT =================
  const handleFinalSubmit = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const data = new FormData();

      data.append("name", formData.title);
      data.append("desc", formData.description);

      data.append("category", formData.subCategory || formData.mainCategory);

      data.append("totalPrice", formData.price);

    // const storedLocation = JSON.parse(localStorage.getItem("selectedCity"));

const storedLocation = JSON.parse(localStorage.getItem("selectedCity"));

data.append("city", storedLocation?.city || "");
data.append("state", storedLocation?.state || "");
data.append("district", storedLocation?.district || "");
data.append("country", storedLocation?.country || "");
data.append("postalCode", storedLocation?.postalCode || "");
data.append("lat", storedLocation?.lat || "");
data.append("lng", storedLocation?.lng || "");

      // ================= DYNAMIC FIELDS =================
      Object.keys(formData.dynamicFields).forEach((key) => {
        data.append(key, formData.dynamicFields[key]);
      });

      // ================= IMAGES =================
      formData.images.forEach((img) => {
        data.append("images", img);
      });

      // ================= API =================
      const res = await createProduct(data, token);

      console.log(res.data);

      alert("Product Uploaded Successfully 🚀");

      // RESET
      setStep(1);

      setSelectedMainCategory(null);

      setSelectedSubCategory(null);

      setFormData({
        mainCategory: "",
        subCategory: "",
        title: "",
        description: "",
        price: "",
        location: "",
        images: [],
        dynamicFields: {},
      });
    } catch (err) {
      console.log(err);

      alert(err?.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-24">
      {/* HEADER */}
      <div className="sticky top-0 z-30 bg-green-600 text-white shadow-md">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
          >
            <FaArrowLeft className="text-gray-700" />
          </button>

          {/* TITLE */}
          <h1 className="text-xl font-bold flex-1 text-center">
            Sell on Techby
          </h1>

          {/* EMPTY DIV FOR PERFECT CENTER */}
          <div className="w-10"></div>
        </div>
      </div>

      <div className="max-w-3xl border border-green-300 lg:mt-10 rounded-2xl mx-auto px-4 py-5">
        {/* PROGRESS */}
        <div className="flex items-center justify-between mb-8 overflow-x-auto scrollbar-hide">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center min-w-[60px]">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  step >= i + 1
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {i + 1}
              </div>

              <p
                className={`text-[11px] mt-2 font-medium ${
                  step >= i + 1 ? "text-green-700" : "text-gray-400"
                }`}
              >
                {s}
              </p>
            </div>
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-1">Choose Category</h2>

            <p className="text-gray-500 mb-6">
              Select a category for your product
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {categories.map((category) => {
                const Icon = category.icon;

                return (
                  <button
                    key={category.slug}
                    onClick={() => handleMainCategory(category)}
                    className="bg-white border border-gray-200 hover:border-green-500 hover:shadow-lg rounded-3xl p-5 transition-all duration-200 text-left group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition">
                      <Icon size={28} />
                    </div>

                    <h3 className="font-semibold text-gray-800">
                      {category.label}
                    </h3>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-2 text-green-700 font-semibold mb-5"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <h2 className="text-2xl font-bold mb-1">Select Subcategory</h2>

            <p className="text-gray-500 mb-6">{selectedMainCategory?.label}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {selectedMainCategory?.subCategories?.map((sub) => {
                const Icon = sub.icon;

                return (
                  <button
                    key={sub.slug}
                    onClick={() => handleSubCategory(sub)}
                    className="bg-white border border-gray-200 hover:border-green-500 hover:shadow-lg rounded-3xl p-5 transition-all duration-200 text-left group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition">
                      <Icon size={26} />
                    </div>

                    <h3 className="font-semibold text-gray-800">{sub.label}</h3>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="bg-white rounded-3xl p-5 shadow-sm border">
            <h2 className="text-2xl font-bold mb-2">Upload Images</h2>

            <p className="text-gray-500 mb-6">Add high quality photos</p>

            <label className="border-2 border-dashed border-green-300 rounded-3xl h-52 flex flex-col items-center justify-center cursor-pointer bg-green-50 hover:bg-green-100 transition">
              <input
                type="file"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />

              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm mb-4">
                <ImagePlus size={32} className="text-green-600" />
              </div>

              <p className="font-semibold text-green-700">Upload Images</p>

              <span className="text-sm text-gray-500 mt-1">
                JPG, PNG supported
              </span>
            </label>

            {previewUrls.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-5">
                {previewUrls.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt=""
                    className="h-28 w-full object-cover rounded-2xl border"
                  />
                ))}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(2)}
                className="w-full bg-gray-100 hover:bg-gray-200 py-3 rounded-2xl font-semibold"
              >
                Back
              </button>

              <button
                disabled={!canStep3}
                onClick={() => setStep(4)}
                className={`w-full py-3 rounded-2xl font-semibold ${
                  canStep3
                    ? "bg-green-600 text-white"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="bg-white rounded-3xl p-5 shadow-sm border">
            <h2 className="text-2xl font-bold mb-6">Product Details</h2>

            <input
              name="title"
              placeholder="Product title"
              value={formData.title}
              onChange={handleChange}
              className="w-full mb-4 p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500"
            />

            <textarea
              name="description"
              placeholder="Describe your product"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full mb-4 p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* DYNAMIC FIELDS */}
            <div className="space-y-4">
              {selectedSubCategory?.fields?.map((field) => (
                <input
                  key={field}
                  placeholder={`Enter ${field}`}
                  value={formData.dynamicFields[field] || ""}
                  onChange={(e) =>
                    handleDynamicFieldChange(field, e.target.value)
                  }
                  className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500"
                />
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(3)}
                className="w-full bg-gray-100 hover:bg-gray-200 py-3 rounded-2xl font-semibold"
              >
                Back
              </button>

              <button
                onClick={() => setStep(5)}
                className="w-full bg-green-600 text-white py-3 rounded-2xl font-semibold"
              >
                Continue
              </button>
            </div>
          </div>
        )}

       {/* STEP 5 */}
{step === 5 && (
  <div className="bg-white rounded-3xl p-5 shadow-sm border">
    <h2 className="text-2xl font-bold mb-6">
      Pricing & Location
    </h2>

    {/* PRICE INPUT (UNCHANGED) */}
    <div className="relative mb-4">
      <IndianRupee
        size={18}
        className="absolute left-4 top-4 text-green-600"
      />

      <input
        name="price"
        type="number"
        placeholder="Enter price"
        value={formData.price}
        onChange={handleChange}
        className="w-full pl-10 p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>

    {/* LOCATION (AUTO FROM LOCALSTORAGE - READ ONLY) */}
    <div className="relative mb-4">
      <MapPin
        size={18}
        className="absolute left-4 top-4 text-green-600"
      />

      <div className="w-full pl-10 p-4 border border-gray-200 rounded-2xl bg-gray-100 text-gray-700">
        {JSON.parse(localStorage.getItem("location"))?.city ||
          JSON.parse(localStorage.getItem("location")) ||
          "Location not available"}
      </div>
    </div>

    <div className="flex gap-3 mt-6">
      <button
        onClick={() => setStep(4)}
        className="w-full bg-gray-100 hover:bg-gray-200 py-3 rounded-2xl font-semibold"
      >
        Back
      </button>

      <button
        onClick={handleFinalSubmit}
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 rounded-2xl font-semibold disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Submit Product"}
      </button>
    </div>
  </div>
)}
      </div>
    </div>
  );
}
