import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPayments() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPurchases = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/listing/admin/purchases",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      setPurchases(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const updateStatus = async (id, status) => {
    console.log("Token:", localStorage.getItem("adminToken"));
    try {
     const stored = JSON.parse(localStorage.getItem("adminToken"));

await axios.put(
  `http://localhost:5000/api/listing/admin/purchase/${id}`,
  { status,
  adminNote: "Approved by admin" },
  {
    headers: {
      Authorization: `Bearer ${stored.token}`,
    },
  }
);

      fetchPurchases();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Admin Payment Approvals
      </h1>

      {purchases.length === 0 ? (
        <p>No requests</p>
      ) : (
        purchases.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-md p-5 mb-4 border"
          >
            <div className="flex justify-between">
              <div>
                <p className="font-bold text-lg text-green-700">
                  {item.sellerId?.shopName}
                </p>
                <p className="text-sm text-gray-500">
                  {item.sellerId?.email}
                </p>

                <p className="mt-2">
                  Normal: {item.normalCount} | Featured: {item.featureCount}
                </p>

                <p className="mt-1 font-semibold">
                  ₹{item.totalAmount}
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="text-right">
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

                {item.status === "pending" && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => updateStatus(item._id, "approved")}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => updateStatus(item._id, "rejected")}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
