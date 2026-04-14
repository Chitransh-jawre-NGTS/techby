import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Clock, Truck } from "lucide-react";
import jsPDF from "jspdf";
import axios from "axios";

const API_BASE = "http://localhost:5000/api/payment"; // change if needed

const AdminDeliveryPage = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDeliveries();
  }, []);

  // ✅ FETCH FROM BACKEND
  const loadDeliveries = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/admin/orders`);

      const formatted = res.data.map((item) => ({
        id: item._id,
        sellerName: item.sellerId?.name || "N/A",
        product: item.product,
        amount: item.amount,
        status: item.status,
      }));

      setDeliveries(formatted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ UPDATE STATUS (API)
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${API_BASE}/admin/order/${id}`, {
        status: newStatus,
      });

      loadDeliveries(); // refresh
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ INVOICE
  const generateInvoice = (delivery) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Delivery Invoice", 20, 20);

    doc.setFontSize(12);
    doc.text(`Order ID: ${delivery.id}`, 20, 40);
    doc.text(`Seller: ${delivery.sellerName}`, 20, 50);
    doc.text(`Product: ${delivery.product}`, 20, 60);
    doc.text(`Amount: ₹${delivery.amount}`, 20, 70);
    doc.text(`Status: ${delivery.status}`, 20, 80);

    doc.text("Thank you for using our service!", 20, 110);

    doc.save(`invoice_${delivery.id}.pdf`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="flex items-center gap-1 text-yellow-600">
            <Clock size={16} /> Pending
          </span>
        );
      case "approved":
        return (
          <span className="flex items-center gap-1 text-green-600">
            <CheckCircle size={16} /> Approved
          </span>
        );
      case "rejected":
        return (
          <span className="flex items-center gap-1 text-red-600">
            <XCircle size={16} /> Rejected
          </span>
        );
      case "delivered":
        return (
          <span className="flex items-center gap-1 text-blue-600">
            <Truck size={16} /> Delivered
          </span>
        );
      case "paid":
        return (
          <span className="flex items-center gap-1 text-purple-600">
            💰 Paid
          </span>
        );
      default:
        return status;
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading deliveries...</div>;
  }

  // ✅ EMPTY STATE
  if (!deliveries || deliveries.length === 0) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-2xl font-semibold mb-2">No Deliveries Found</h2>
        <p className="text-gray-500">There are no delivery requests yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Delivery Management</h1>

      <div className="grid gap-4">
        {deliveries.map((delivery) => (
          <div
            key={delivery.id}
            className="bg-white shadow-md rounded-2xl p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold text-lg">{delivery.product}</h2>
              <p className="text-sm text-gray-500">
                Seller: {delivery.sellerName}
              </p>
              <p className="text-sm text-gray-500">
                Amount: ₹{delivery.amount}
              </p>
              <div className="mt-2">{getStatusBadge(delivery.status)}</div>
            </div>

            <div className="flex gap-2">
              {delivery.status === "paid" && (
                <>
                  <button
                    onClick={() => updateStatus(delivery.id, "approved")}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateStatus(delivery.id, "rejected")}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Reject
                  </button>
                </>
              )}

              <button
                onClick={() => generateInvoice(delivery)}
                className="bg-gray-800 text-white px-3 py-1 rounded-lg hover:bg-gray-900"
              >
                Download Invoice
              </button>

              {delivery.status === "approved" && (
                <button
                  onClick={() => updateStatus(delivery.id, "delivered")}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                >
                  Mark Delivered
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDeliveryPage;
