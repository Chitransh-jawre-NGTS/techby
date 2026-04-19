import React, { useEffect, useState } from "react";
import {
  getAllPurchases,
  updatePurchaseStatus,
} from "../../Api/listingApi";

export default function AdminPayments() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getAllPurchases();
      setPurchases(res?.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load purchases");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);

      await updatePurchaseStatus(id, {
        status,
        adminNote:
          status === "approved"
            ? "Approved by admin"
            : "Rejected by admin",
      });

      await fetchPurchases();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-6 sm:p-10 text-center text-gray-600">
        Loading payments...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 sm:p-10 text-center text-red-600">
        {error}
        <button
          onClick={fetchPurchases}
          className="block mx-auto mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-3 sm:p-6">

      {/* HEADER */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700 mb-4 sm:mb-6">
        Admin Payment Approvals
      </h1>

      {purchases.length === 0 ? (
        <div className="text-center text-gray-500">
          No purchase requests found
        </div>
      ) : (
        <div className="space-y-4">
          {purchases.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md p-4 sm:p-5 border hover:shadow-lg transition"
            >

              {/* RESPONSIVE LAYOUT */}
              <div className="flex flex-col md:flex-row md:justify-between gap-4">

                {/* LEFT SIDE */}
                <div className="w-full">
                  <p className="font-bold text-base sm:text-lg text-green-700 break-words">
                    {item.sellerId?.shopName}
                  </p>

                  <p className="text-sm text-gray-500 break-words">
                    {item.sellerId?.email}
                  </p>

                  <p className="mt-2 text-gray-700 text-sm sm:text-base">
                    Normal: <b>{item.normalCount}</b> | Featured:{" "}
                    <b>{item.featureCount}</b>
                  </p>

                  <p className="mt-1 font-semibold text-green-700">
                    ₹{item.totalAmount}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* RIGHT SIDE */}
                <div className="w-full md:w-auto text-left md:text-right">

                  {/* STATUS */}
                  <p
                    className={`mb-2 font-semibold ${
                      item.status === "approved"
                        ? "text-green-600"
                        : item.status === "rejected"
                        ? "text-red-600"
                        : "text-orange-500"
                    }`}
                  >
                    {item.status}
                  </p>

                  {/* SCREENSHOT */}
                  {item.paymentScreenshot?.url && (
                    <a
                      href={item.paymentScreenshot.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 underline text-sm"
                    >
                      View Screenshot
                    </a>
                  )}

                  {/* ACTION BUTTONS */}
                  {item.status === "pending" && (
                    <div className="flex flex-col sm:flex-row gap-2 mt-3 md:justify-end">

                      <button
                        disabled={updatingId === item._id}
                        onClick={() => updateStatus(item._id, "approved")}
                        className="w-full sm:w-auto bg-green-600 text-white px-3 py-2 rounded disabled:opacity-50"
                      >
                        {updatingId === item._id
                          ? "Updating..."
                          : "Approve"}
                      </button>

                      <button
                        disabled={updatingId === item._id}
                        onClick={() => updateStatus(item._id, "rejected")}
                        className="w-full sm:w-auto bg-red-500 text-white px-3 py-2 rounded disabled:opacity-50"
                      >
                        Reject
                      </button>

                    </div>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}