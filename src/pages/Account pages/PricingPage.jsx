import React, { useState } from "react";
import { Plus, Minus, ShieldCheck, Zap, TrendingUp } from "lucide-react";
import payment from "../assets/payment.jpeg";
import toast from "react-hot-toast";

export default function PricingPage() {
  const [normalCount, setNormalCount] = useState(0);
  const [featureCount, setFeatureCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // ================= PRICING =================
  const normalOriginal = 149;
  const normalPrice = 79;

  const featureOriginal = 299;
  const featurePrice = 209;

  const total =
    normalCount * normalPrice + featureCount * featurePrice;

  const originalTotal =
    normalCount * normalOriginal +
    featureCount * featureOriginal;

  const savings = originalTotal - total;

  // ================= FILE =================
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // ================= PURCHASE (NO API) =================
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

      // simulate backend delay
      await new Promise((res) => setTimeout(res, 1000));

      const newOrder = {
        id: Date.now(),
        normalCount,
        featureCount,
        total: total.toFixed(2),
        status: "Pending",
        date: new Date().toLocaleString(),
      };

      setHistory((prev) => [newOrder, ...prev]);

      setNormalCount(0);
      setFeatureCount(0);
      setFile(null);

      toast.success("Purchase request submitted successfully ✅");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 py-10 px-4">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-green-700">
          Seller Pricing Dashboard
        </h1>
        <p className="text-gray-500 mt-3 text-lg max-w-2xl mx-auto">
          Boost your product visibility and reach more buyers.
        </p>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl p-8 border border-green-100">

        {/* PRICING GRID */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* NORMAL */}
          <div className="p-7 border rounded-3xl bg-white shadow-sm">
            <h2 className="font-bold text-3xl text-green-700">
              Normal Listing
            </h2>

            <div className="mt-6">
              <span className="line-through text-gray-400 mr-2">
                ₹{normalOriginal}
              </span>
              <span className="text-5xl font-extrabold text-green-700">
                ₹{normalPrice}
              </span>
            </div>

            <div className="flex items-center gap-5 mt-10">
              <button
                onClick={() =>
                  setNormalCount(Math.max(0, normalCount - 1))
                }
              >
                <Minus />
              </button>

              <span className="text-3xl font-bold">
                {normalCount}
              </span>

              <button onClick={() => setNormalCount(normalCount + 1)}>
                <Plus />
              </button>
            </div>
          </div>

          {/* FEATURED */}
          <div className="p-7 border-2 border-green-500 rounded-3xl bg-gradient-to-br from-green-50 to-white">
            <h2 className="font-bold text-3xl text-green-700">
              Featured Listing
            </h2>

            <div className="mt-6">
              <span className="line-through text-gray-400 mr-2">
                ₹{featureOriginal}
              </span>
              <span className="text-5xl font-extrabold text-green-700">
                ₹{featurePrice}
              </span>
            </div>

            <div className="flex items-center gap-5 mt-10">
              <button
                onClick={() =>
                  setFeatureCount(Math.max(0, featureCount - 1))
                }
              >
                <Minus />
              </button>

              <span className="text-3xl font-bold">
                {featureCount}
              </span>

              <button
                onClick={() => setFeatureCount(featureCount + 1)}
              >
                <Plus />
              </button>
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="mt-10 bg-green-50 p-8 rounded-3xl">
          <p>Original: ₹{originalTotal}</p>
          <p>Save: ₹{savings}</p>
          <p className="text-3xl font-bold text-green-700">
            Total: ₹{total.toFixed(2)}
          </p>
        </div>

        {/* PAYMENT */}
        <div className="mt-12 text-center">
          <img src={payment} className="mx-auto w-72" />

          <input
            type="file"
            onChange={handleFileChange}
            className="border p-3 mt-5 w-full"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handlePurchase}
          disabled={loading}
          className="mt-8 w-full bg-green-600 text-white py-4 rounded-2xl font-bold"
        >
          {loading ? "Processing..." : "Confirm Purchase"}
        </button>

        {/* HISTORY */}
        {history.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold">History</h2>

            {history.map((item) => (
              <div
                key={item.id}
                className="border p-4 mt-3 rounded-xl"
              >
                <p>
                  Normal: {item.normalCount} | Featured:{" "}
                  {item.featureCount}
                </p>
                <p>₹{item.total}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}