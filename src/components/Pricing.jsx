import React, { useState } from "react";
import { Plus, Minus, ShieldCheck, Zap, TrendingUp } from "lucide-react";
import payment from "../assets/payment.jpeg";
import { createPurchase } from "../Api/listingApi";
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

  const total = normalCount * normalPrice + featureCount * featurePrice;

  const originalTotal =
    normalCount * normalOriginal + featureCount * featureOriginal;

  const savings = originalTotal - total;

  // ================= FILE =================
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // ================= PURCHASE =================
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

      toast.success("Purchase request sent successfully ✅");
    } catch (err) {
      console.error(err);
      toast.error("Error submitting purchase");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 py-10 px-4">

      {/* ================= HEADER ================= */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-green-700">
          Seller Pricing Dashboard
        </h1>

        <p className="text-gray-500 mt-3 text-lg max-w-2xl mx-auto">
          Boost your product visibility and reach more buyers with powerful
          listing plans designed for faster sales and better engagement.
        </p>
      </div>

      {/* ================= MAIN ================= */}
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl p-8 border border-green-100">

        {/* ================= PRICING GRID ================= */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* ================= NORMAL LISTING ================= */}
          <div className="p-7 border rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-300">

            <div className="flex items-center justify-between">
              <h2 className="font-bold text-3xl text-green-700">
                Normal Listing
              </h2>

              <span className="bg-green-100 text-green-700 text-xs px-4 py-2 rounded-full font-semibold">
                Budget Friendly
              </span>
            </div>

            <p className="text-gray-500 mt-3">
              Perfect for regular product uploads with strong marketplace
              visibility and direct buyer reach.
            </p>

            {/* PRICE */}
            <div className="mt-6">
              <span className="line-through text-gray-400 text-lg mr-2">
                ₹{normalOriginal}
              </span>

              <span className="text-5xl font-extrabold text-green-700">
                ₹{normalPrice}
              </span>

              <span className="text-gray-500 ml-2">
                / listing
              </span>
            </div>

            {/* FEATURES */}
            <ul className="mt-8 space-y-4 text-sm">

              <li className="flex items-center gap-3">
                <ShieldCheck className="text-green-600" size={18} />
                Product visible for 45 days
              </li>

              <li className="flex items-center gap-3">
                <ShieldCheck className="text-green-600" size={18} />
                Appears in marketplace search results
              </li>

              <li className="flex items-center gap-3">
                <ShieldCheck className="text-green-600" size={18} />
                WhatsApp & call visibility
              </li>

              <li className="flex items-center gap-3">
                <ShieldCheck className="text-green-600" size={18} />
                Multiple product image uploads
              </li>

              <li className="flex items-center gap-3">
                <ShieldCheck className="text-green-600" size={18} />
                Mobile & desktop visibility
              </li>

              <li className="flex items-center gap-3">
                <ShieldCheck className="text-green-600" size={18} />
                Direct buyer interaction
              </li>

              <li className="flex items-center gap-3">
                <ShieldCheck className="text-green-600" size={18} />
                Trusted seller profile visibility
              </li>
            </ul>

            {/* COUNTER */}
            <div className="flex items-center gap-5 mt-10">

              <button
                onClick={() =>
                  setNormalCount(Math.max(0, normalCount - 1))
                }
                className="p-3 bg-green-100 rounded-xl hover:bg-green-200 transition"
              >
                <Minus size={18} />
              </button>

              <span className="text-3xl font-bold">
                {normalCount}
              </span>

              <button
                onClick={() =>
                  setNormalCount(normalCount + 1)
                }
                className="p-3 bg-green-100 rounded-xl hover:bg-green-200 transition"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* ================= FEATURED LISTING ================= */}
          <div className="p-7 border-2 border-green-500 rounded-3xl bg-gradient-to-br from-green-50 to-white shadow-xl relative overflow-hidden">

            <div className="absolute top-0 right-0 bg-green-600 text-white px-5 py-2 text-sm font-semibold rounded-bl-2xl">
              ⭐ Most Popular
            </div>

            <h2 className="font-bold text-3xl text-green-700">
              Featured Listing
            </h2>

            <p className="text-gray-600 mt-3">
              Get premium visibility, higher search ranking, and more buyer
              engagement to sell products faster.
            </p>

            {/* PRICE */}
            <div className="mt-6">
              <span className="line-through text-gray-400 text-lg mr-2">
                ₹{featureOriginal}
              </span>

              <span className="text-5xl font-extrabold text-green-700">
                ₹{featurePrice}
              </span>

              <span className="text-gray-500 ml-2">
                / listing
              </span>
            </div>

            {/* FEATURES */}
            <ul className="mt-8 space-y-4 text-sm">

              <li className="flex items-center gap-3">
                <Zap className="text-green-600" size={18} />
                Homepage featured placement
              </li>

              <li className="flex items-center gap-3">
                <Zap className="text-green-600" size={18} />
                Higher ranking in search results
              </li>

              <li className="flex items-center gap-3">
                <Zap className="text-green-600" size={18} />
                Priority category visibility
              </li>

              <li className="flex items-center gap-3">
                <Zap className="text-green-600" size={18} />
                Increased buyer impressions
              </li>

              <li className="flex items-center gap-3">
                <Zap className="text-green-600" size={18} />
                Faster product discovery
              </li>

              <li className="flex items-center gap-3">
                <Zap className="text-green-600" size={18} />
                Premium seller highlighting
              </li>

              <li className="flex items-center gap-3">
                <Zap className="text-green-600" size={18} />
                Better conversion opportunity
              </li>

              <li className="flex items-center gap-3">
                <Zap className="text-green-600" size={18} />
                45 days premium visibility
              </li>
            </ul>

            {/* INFO BOX */}
            <div className="bg-green-100 border border-green-200 rounded-2xl p-4 mt-8">
              <p className="text-sm text-green-700 font-medium">
                Featured listings receive significantly more visibility and
                improve chances of faster sales.
              </p>
            </div>

            {/* COUNTER */}
            <div className="flex items-center gap-5 mt-10">

              <button
                onClick={() =>
                  setFeatureCount(Math.max(0, featureCount - 1))
                }
                className="p-3 bg-green-100 rounded-xl hover:bg-green-200 transition"
              >
                <Minus size={18} />
              </button>

              <span className="text-3xl font-bold">
                {featureCount}
              </span>

              <button
                onClick={() =>
                  setFeatureCount(featureCount + 1)
                }
                className="p-3 bg-green-100 rounded-xl hover:bg-green-200 transition"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* ================= SUMMARY ================= */}
        <div className="mt-10 bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-3xl border border-green-200">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>
              <p className="text-gray-500 text-lg">
                Original Price
              </p>

              <h3 className="text-3xl font-bold text-gray-700">
                ₹{originalTotal}
              </h3>
            </div>

            <div>
              <p className="text-green-600 text-lg">
                You Save
              </p>

              <h3 className="text-3xl font-bold text-green-700">
                ₹{savings}
              </h3>
            </div>

            <div>
              <p className="text-gray-500 text-lg">
                Total Amount
              </p>

              <h3 className="text-5xl font-extrabold text-green-700">
                ₹{total.toFixed(2)}
              </h3>
            </div>
          </div>
        </div>

        {/* ================= TRUST SECTION ================= */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <TrendingUp className="text-green-600 mb-4" size={32} />

            <h3 className="font-bold text-xl text-green-700">
              Faster Sales
            </h3>

            <p className="text-sm text-gray-500 mt-3">
              Featured products attract more attention and improve buyer
              engagement significantly.
            </p>
          </div>

          <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <ShieldCheck className="text-green-600 mb-4" size={32} />

            <h3 className="font-bold text-xl text-green-700">
              Trusted Marketplace
            </h3>

            <p className="text-sm text-gray-500 mt-3">
              Reach genuine local buyers actively searching for products in your
              area.
            </p>
          </div>

          <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <Zap className="text-green-600 mb-4" size={32} />

            <h3 className="font-bold text-xl text-green-700">
              Business Growth
            </h3>

            <p className="text-sm text-gray-500 mt-3">
              Increase your store visibility and improve conversions with
              premium listings.
            </p>
          </div>
        </div>

        {/* ================= PAYMENT ================= */}
        <div className="mt-12 border-t pt-10 text-center">

          <h2 className="text-3xl font-bold text-green-700">
            Complete Your Payment
          </h2>

          <p className="text-gray-500 mt-2">
            Scan the QR code and upload payment screenshot for admin approval.
          </p>

          <img
            src={payment}
            alt="payment"
            className="mx-auto my-6 w-72 rounded-2xl shadow-lg border"
          />

          <div className="max-w-xl mx-auto">
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border border-gray-300 p-3 rounded-xl"
            />
          </div>
        </div>

        {/* ================= BUTTON ================= */}
        <button
          onClick={handlePurchase}
          disabled={loading}
          className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl text-lg font-bold transition-all duration-300 shadow-lg"
        >
          {loading ? "Processing..." : "Confirm Purchase"}
        </button>

        {/* ================= HISTORY ================= */}
        {history.length > 0 && (
          <div className="mt-14">
            <h2 className="text-3xl font-bold text-green-700 mb-6">
              Purchase History
            </h2>

            <div className="space-y-4">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between bg-green-50"
                >
                  <div>
                    <p className="font-semibold">
                      Normal: {item.normalCount} | Featured:{" "}
                      {item.featureCount}
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                      {item.date}
                    </p>
                  </div>

                  <div className="mt-4 md:mt-0 text-right">
                    <p className="font-bold text-green-700 text-xl">
                      ₹{item.total}
                    </p>

                    <span className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}