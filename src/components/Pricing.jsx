import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import payment from "../assets/payment.jpeg";
import { createPurchase } from "../Api/listingApi";
import toast from "react-hot-toast";

export default function PricingPage() {
  const [normalCount, setNormalCount] = useState(0);
  const [featureCount, setFeatureCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const normalOriginal = 149;
  const normalPrice = 79;

  const featureOriginal = 299;
  const featurePrice = 209;

  const total = normalCount * normalPrice + featureCount * featurePrice;

  const originalTotal =
    normalCount * normalOriginal + featureCount * featureOriginal;

  const savings = originalTotal - total;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePurchase = async () => {
    if (!file) {
      toast.error("Please upload payment screenshot");
      return;
    }

    if (normalCount === 0 && featureCount === 0) {
      toast.error("Select at least one listing");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("normalCount", normalCount);
      formData.append("featureCount", featureCount);
      formData.append("totalAmount", total);
      formData.append("screenshot", file);

      const storedData = JSON.parse(localStorage.getItem("sellerToken"));

      await createPurchase(formData, storedData?.token);

      const newOrder = {
        id: Date.now(),
        normalCount,
        featureCount,
        total: total.toFixed(2),
        status: "Pending",
        date: new Date().toLocaleString(),
      };

      setHistory([newOrder, ...history]);

      setNormalCount(0);
      setFeatureCount(0);
      setFile(null);

      toast.success("Purchase request sent to admin ✅");
    } catch (err) {
      console.error(err);
      toast.error("Error submitting purchase");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 py-10 px-4">

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-700">
          Seller Pricing Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Pay securely using QR / Barcode system
        </p>
      </div>

      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-green-100">

        <div className="grid md:grid-cols-2 gap-8">

          {/* NORMAL */}
          <div className="p-5 border rounded-xl">
            <h2 className="font-bold text-lg text-green-700">
              Normal Listing
            </h2>

            <p className="mt-1">
              <span className="line-through text-gray-400 mr-2">
                ₹{normalOriginal}
              </span>
              <span className="text-xl font-bold text-green-700">
                ₹{normalPrice}
              </span>
            </p>

            <div className="flex items-center gap-4 mt-5">
              <button
                onClick={() => setNormalCount(Math.max(0, normalCount - 1))}
                className="p-2 bg-green-100 rounded"
              >
                <Minus size={16} />
              </button>

              <span className="text-xl font-semibold">
                {normalCount}
              </span>

              <button
                onClick={() => setNormalCount(normalCount + 1)}
                className="p-2 bg-green-100 rounded"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* FEATURED */}
          <div className="p-5 border-2 border-green-500 rounded-xl relative">

            <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
              ⭐ Best Value
            </span>

            <h2 className="font-bold text-lg text-green-700">
              Featured Listing
            </h2>

            <p className="mt-1">
              <span className="line-through text-gray-400 mr-2">
                ₹{featureOriginal}
              </span>
              <span className="text-xl font-bold text-green-700">
                ₹{featurePrice}
              </span>
            </p>

            <div className="flex items-center gap-4 mt-5">
              <button
                onClick={() => setFeatureCount(Math.max(0, featureCount - 1))}
                className="p-2 bg-green-100 rounded"
              >
                <Minus size={16} />
              </button>

              <span className="text-xl font-semibold">
                {featureCount}
              </span>

              <button
                onClick={() => setFeatureCount(featureCount + 1)}
                className="p-2 bg-green-100 rounded"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="mt-8 bg-green-50 p-5 rounded-xl">
          <p className="text-gray-500">
            Original Price: ₹{originalTotal}
          </p>

          <p className="text-green-600 font-semibold">
            You Save: ₹{savings}
          </p>

          <p className="text-2xl font-bold text-green-700 mt-1">
            Total: ₹{total.toFixed(2)}
          </p>
        </div>

        {/* QR */}
        <div className="mt-10 text-center border-t pt-6">
          <img src={payment} alt="qr" className="mx-auto my-4 w-64" />

          <input
            type="file"
            onChange={handleFileChange}
            className="mt-4 border p-2 rounded w-full"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handlePurchase}
          disabled={loading}
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700"
        >
          {loading ? "Processing..." : "Confirm Purchase"}
        </button>
      </div>
    </div>
  );
}