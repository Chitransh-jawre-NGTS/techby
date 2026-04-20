import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  Truck,
} from "lucide-react";

import {
  getAdminOrders,
  updateOrderStatus,
} from "../../Api/orderApi";

// ✅ IMPORT YOUR EXISTING INVOICE FUNCTION
import { generateInvoice } from "../../data/invoice"; 


// OR adjust path based on your file

const AdminDeliveryPage = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDeliveries();
  }, []);

  // ---------------- FETCH ----------------
  const loadDeliveries = async () => {
    try {
      setLoading(true);
      const res = await getAdminOrders();
      setDeliveries(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- STATUS UPDATE ----------------
  const updateStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      loadDeliveries();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // ---------------- STATUS UI ----------------
  const getStatusUI = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="text-yellow-600 flex items-center gap-1">
            <Clock size={16} /> Pending
          </span>
        );
      case "confirmed":
        return (
          <span className="text-green-600 flex items-center gap-1">
            <CheckCircle size={16} /> Confirmed
          </span>
        );
      case "shipped":
        return (
          <span className="text-blue-600 flex items-center gap-1">
            <Truck size={16} /> Shipped
          </span>
        );
      case "delivered":
        return (
          <span className="text-green-700 flex items-center gap-1">
            <CheckCircle size={16} /> Delivered
          </span>
        );
      case "cancelled":
        return (
          <span className="text-red-600 flex items-center gap-1">
            <XCircle size={16} /> Cancelled
          </span>
        );
      default:
        return status;
    }
  };

  // ---------------- UI ----------------
  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!deliveries.length) {
    return <div className="p-6 text-center">No Deliveries Found</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Admin Delivery Management
      </h1>

      <div className="grid gap-4">
        {deliveries.map((d) => (
          <div
            key={d._id}
            className="bg-white shadow rounded-2xl p-5 flex justify-between items-start hover:shadow-md transition"
          >
            <div>
              <h2 className="font-semibold text-lg">
                {d.productName}
              </h2>

              <p className="text-sm text-gray-500">
                Customer: {d.customerName}
              </p>

              <p className="text-sm text-gray-500">
                Amount: ₹{d.amount}
              </p>

              <p className="text-sm mt-2">
                Status: {getStatusUI(d.status)}
              </p>
            </div>

            <div className="flex flex-col gap-2">

              {/* PENDING */}
              {d.status === "pending" && (
                <>
                  <button
                    onClick={() => updateStatus(d._id, "confirmed")}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Confirm
                  </button>

                  <button
                    onClick={() => updateStatus(d._id, "cancelled")}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </>
              )}

              {/* CONFIRMED */}
              {d.status === "confirmed" && (
                <button
                  onClick={() => updateStatus(d._id, "shipped")}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Ship Order
                </button>
              )}

              {/* SHIPPED */}
              {d.status === "shipped" && (
                <button
                  onClick={() => updateStatus(d._id, "delivered")}
                  className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
                >
                  Mark Delivered
                </button>
              )}

              {/* ✅ INVOICE (NOW USING IMPORTED FUNCTION) */}
              <button
                onClick={() => generateInvoice(d)}
                className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-black"
              >
                Invoice
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDeliveryPage;