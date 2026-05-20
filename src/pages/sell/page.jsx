import React from "react";
import { categories } from "../../data/Categories";
import { createProduct } from "../../Api/ProductApi";

export default function SellPage() {
  // ================= STEP STATE =================
  const [step, setStep] = React.useState(1);
  const steps = ["Category", "Subcategory", "Images", "Details", "Pricing"];

  // ================= SELECTED =================
  const [selectedMainCategory, setSelectedMainCategory] =
    React.useState(null);

  const [selectedSubCategory, setSelectedSubCategory] =
    React.useState(null);

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

  // ================= IMAGE PREVIEW CLEANUP =================
  React.useEffect(() => {
    const urls = formData.images.map((img) => URL.createObjectURL(img));
    setPreviewUrls(urls);

    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [formData.images]);

  // ================= UPDATE HELPERS =================
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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

  // ================= STEP VALIDATION =================
  const canStep3 = formData.images.length > 0;

  // ================= FINAL SUBMIT =================
  const handleFinalSubmit = async () => {
  setLoading(true);

  try {
    const token = localStorage.getItem("token"); // or redux auth token

    const data = new FormData();

    // ================= BASIC FIELDS =================
    data.append("name", formData.title);
    data.append("desc", formData.description);
    data.append("category", formData.subCategory || formData.mainCategory);
    data.append("totalPrice", formData.price);
    data.append("city", formData.location);

    // ================= DYNAMIC FIELDS =================
    Object.keys(formData.dynamicFields).forEach((key) => {
      data.append(key, formData.dynamicFields[key]);
    });

    // ================= IMAGES =================
    formData.images.forEach((img) => {
      data.append("images", img);
    });

    // ================= API CALL =================
    const res = await createProduct(data, token);

    console.log("UPLOAD SUCCESS:", res.data);

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
    console.error(err);
    alert(err?.response?.data?.message || "Upload failed");
  } finally {
    setLoading(false);
  }
};

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-gray-100 pb-24">

      {/* HEADER */}
      <div className="bg-green-600 text-white px-4 py-4 sticky top-0 z-20 shadow-md">
        <h1 className="text-xl font-bold text-center">Sell on Techby</h1>
      </div>

      <div className="max-w-2xl mx-auto p-4">

        {/* PROGRESS BAR */}
        <div className="flex justify-between mb-6">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`text-xs font-semibold ${
                step > i + 1
                  ? "text-green-600"
                  : step === i + 1
                  ? "text-black"
                  : "text-gray-400"
              }`}
            >
              {i + 1}. {s}
            </div>
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <h2 className="text-3xl font-bold mb-1">Choose Category</h2>
            <p className="text-gray-500 mb-6">Select main category</p>

            <div className="grid grid-cols-2 gap-4">
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => handleMainCategory(category)}
                  className="bg-white rounded-2xl p-5 border hover:border-green-500 shadow-sm hover:shadow-md transition text-left"
                >
                  <div className="text-3xl mb-3">📦</div>
                  <h3 className="font-semibold">{category.label}</h3>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <button
              onClick={() => setStep(1)}
              className="mb-4 text-sm text-green-600 font-semibold"
            >
              ← Back
            </button>

            <h2 className="text-2xl font-bold mb-1">Select Subcategory</h2>
            <p className="text-gray-500 mb-6">
              {selectedMainCategory?.label}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {selectedMainCategory?.subCategories?.map((sub) => (
                <button
                  key={sub.slug}
                  onClick={() => handleSubCategory(sub)}
                  className="bg-white rounded-2xl p-5 border hover:border-green-500 shadow-sm hover:shadow-md transition text-left"
                >
                  <div className="text-2xl mb-3">🏷️</div>
                  <h3 className="font-semibold">{sub.label}</h3>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="text-xl font-bold mb-2">Upload Images</h2>
            <p className="text-gray-500 mb-5">Add clear photos</p>

            <label className="border-2 border-dashed border-green-400 rounded-2xl h-48 flex flex-col items-center justify-center cursor-pointer bg-green-50 hover:bg-green-100 transition">
              <input
                type="file"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="text-4xl">📷</div>
              <p className="font-semibold text-green-700 mt-2">
                Upload Images
              </p>
            </label>

            {previewUrls.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-4">
                {previewUrls.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    className="h-24 w-full object-cover rounded-xl"
                  />
                ))}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(2)}
                className="w-full bg-gray-200 py-3 rounded-xl font-semibold"
              >
                Back
              </button>

              <button
                disabled={!canStep3}
                onClick={() => setStep(4)}
                className={`w-full py-3 rounded-xl font-semibold ${
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
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="text-xl font-bold mb-5">Product Details</h2>

            <input
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full mb-3 p-3 border rounded-xl"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full mb-3 p-3 border rounded-xl"
              rows={4}
            />

            {selectedSubCategory?.fields?.map((field) => (
              <input
                key={field}
                placeholder={field}
                value={formData.dynamicFields[field] || ""}
                onChange={(e) =>
                  handleDynamicFieldChange(field, e.target.value)
                }
                className="w-full mb-3 p-3 border rounded-xl"
              />
            ))}

            <div className="flex gap-3">
              <button
                onClick={() => setStep(3)}
                className="w-full bg-gray-200 py-3 rounded-xl font-semibold"
              >
                Back
              </button>

              <button
                onClick={() => setStep(5)}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="text-xl font-bold mb-5">Pricing & Location</h2>

            <input
              name="price"
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full mb-3 p-3 border rounded-xl"
            />

            <input
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full mb-3 p-3 border rounded-xl"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setStep(4)}
                className="w-full bg-gray-200 py-3 rounded-xl font-semibold"
              >
                Back
              </button>

              <button
                onClick={handleFinalSubmit}
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
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