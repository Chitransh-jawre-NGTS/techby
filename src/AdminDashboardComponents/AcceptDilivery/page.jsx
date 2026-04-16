import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Clock, Truck } from "lucide-react";
import jsPDF from "jspdf";

import {
  getAdminOrders,
  updateOrderStatus,
} from "../../Api/orderApi";

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
      loadDeliveries(); // refresh
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // ---------------- INVOICE ----------------
  const generateInvoice = (d) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Delivery Invoice", 20, 20);

    doc.setFontSize(12);

    doc.text(`Order ID: ${d._id}`, 20, 40);
    doc.text(`Seller: ${d.sellerId?.name || "N/A"}`, 20, 50);
    doc.text(`Product: ${d.productName}`, 20, 60);
    doc.text(`Customer: ${d.customerName}`, 20, 70);
    doc.text(`Phone: ${d.customerPhone}`, 20, 80);
    doc.text(`City: ${d.city}`, 20, 90);
    doc.text(`Amount: ₹${d.amount}`, 20, 100);
    doc.text(`Status: ${d.status}`, 20, 110);

    doc.save(`invoice_${d._id}.pdf`);
  };

  // ---------------- UI ----------------
  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!deliveries.length) {
    return <div className="p-6 text-center">No Deliveries Found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Admin Delivery Management
      </h1>

      <div className="grid gap-4">
        {deliveries.map((d) => (
          <div
            key={d._id}
            className="bg-white shadow rounded-2xl p-4 flex justify-between"
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
                Status:{" "}
                <span className="font-semibold">{d.status}</span>
              </p>
            </div>

            <div className="flex gap-2 items-start">

              {d.status === "pending" && (
                <>
                  <button
                    onClick={() => updateStatus(d._id, "approved")}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => updateStatus(d._id, "rejected")}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </>
              )}

              {d.status === "approved" && (
                <button
                  onClick={() => updateStatus(d._id, "delivered")}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Delivered
                </button>
              )}

              <button
                onClick={() => generateInvoice(d)}
                className="bg-gray-800 text-white px-3 py-1 rounded"
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