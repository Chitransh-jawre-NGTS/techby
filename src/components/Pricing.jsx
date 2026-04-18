import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import payment from "../assets/payment.jpeg";
import axios from "axios";

export default function PricingPage() {
  const [normalCount, setNormalCount] = useState(0);
  const [featureCount, setFeatureCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const gst = 0.18;
  const normalPrice = 80;
  const featurePrice = 120;

  const total = normalCount * normalPrice + featureCount * featurePrice;
  const gstAmount = total * gst;
  const finalAmount = total + gstAmount;

  // ✅ HANDLE FILE
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // ✅ API CALL
  const handlePurchase = async () => {
    if (!file) {
      alert("Please upload payment screenshot");
      return;
    }

    if (normalCount === 0 && featureCount === 0) {
      alert("Select at least one listing");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("normalCount", normalCount);
      formData.append("featureCount", featureCount);
      formData.append("totalAmount", finalAmount);
      formData.append("screenshot", file);

   const storedData = JSON.parse(localStorage.getItem("sellerToken"));

const res = await axios.post(
  "http://localhost:5000/api/listing/purchase",
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${storedData?.token}`,
    },
  }
);
      

      const newOrder = {
        id: Date.now(),
        normalCount,
        featureCount,
        total: finalAmount.toFixed(2),
        status: "Pending",
        date: new Date().toLocaleString(),
      };

      setHistory([newOrder, ...history]);

      // reset
      setNormalCount(0);
      setFeatureCount(0);
      setFile(null);

      alert("Purchase request sent to admin ✅");
    } catch (err) {
      console.error(err);
      alert("Error submitting purchase");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 py-10 px-4">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-700">
          Seller Pricing Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Pay securely using QR / Barcode system
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-green-100">

        {/* PRICING */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* NORMAL */}
          <div className="p-5 border rounded-xl">
            <h2 className="font-bold text-lg text-green-700">
              Normal Listing (₹80)
            </h2>

            <div className="flex items-center gap-4 mt-4">
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
          <div className="p-5 border rounded-xl">
            <h2 className="font-bold text-lg text-green-700">
              Featured Listing (₹120)
            </h2>

            <div className="flex items-center gap-4 mt-4">
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
          <p>Subtotal: ₹{total}</p>
          <p>GST (18%): ₹{gstAmount.toFixed(2)}</p>
          <p className="text-2xl font-bold text-green-700">
            Total: ₹{finalAmount.toFixed(2)}
          </p>
        </div>

        {/* QR */}
        <div className="mt-10 text-center border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-700">
            📱 Pay via QR
          </h3>

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

      {/* HISTORY */}
      <div className="max-w-5xl mx-auto mt-10">
        <h2 className="text-xl font-bold text-green-700 mb-4">
          📜 Purchase History
        </h2>

        {history.length === 0 ? (
          <p className="text-gray-500">No purchases yet</p>
        ) : (
          history.map((item) => (
            <div key={item.id} className="bg-white p-4 mb-3 rounded-xl shadow border">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">
                    Normal: {item.normalCount} | Featured: {item.featureCount}
                  </p>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-green-700">
                    ₹{item.total}
                  </p>
                  <p className="text-sm text-orange-500">
                    {item.status}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}