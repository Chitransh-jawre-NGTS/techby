import React, { useState } from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Package,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import jsPDF from "jspdf";

const AdminDashboard = () => {
  // ================= STATIC DATA =================
  const [orders, setOrders] = useState([
    {
      _id: "1",
      product: "iPhone 15 Pro",
      amount: 99999,
      status: "pending",
    },
    {
      _id: "2",
      product: "Samsung S24",
      amount: 79999,
      status: "paid",
    },
    {
      _id: "3",
      product: "MacBook M2",
      amount: 129999,
      status: "approved",
    },
    {
      _id: "4",
      product: "AirPods Pro",
      amount: 24999,
      status: "delivered",
    },
    {
      _id: "5",
      product: "Gaming Chair",
      amount: 15999,
      status: "rejected",
    },
  ]);

  const [stats] = useState({
    totalOrders: 5,
    newOrders: 1,
    paidOrders: 1,
    deliveredOrders: 1,
    rejectedOrders: 1,
  });

  // ================= UPDATE STATUS (LOCAL ONLY) =================
  const updateStatus = (id, status) => {
    setOrders((prev) =>
      prev.map((o) =>
        o._id === id ? { ...o, status } : o
      )
    );
  };

  // ================= INVOICE =================
  const generateInvoice = (order) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("INVOICE", 20, 20);

    doc.setFontSize(12);
    doc.text(`Order ID: ${order._id}`, 20, 40);
    doc.text(`Product: ${order.product}`, 20, 50);
    doc.text(`Amount: ₹${order.amount}`, 20, 60);
    doc.text(`Status: ${order.status}`, 20, 70);

    doc.text("Thank you for your purchase!", 20, 100);

    doc.save(`invoice_${order._id}.pdf`);
  };

  // ================= STATUS UI =================
  const getStatusUI = (status) => {
    const base = "flex items-center gap-1 text-sm font-medium";

    switch (status) {
      case "pending":
        return (
          <span className={`${base} text-yellow-600`}>
            <Clock size={16} /> Pending
          </span>
        );
      case "paid":
        return (
          <span className={`${base} text-purple-600`}>
            💰 Paid
          </span>
        );
      case "approved":
        return (
          <span className={`${base} text-green-600`}>
            <CheckCircle size={16} /> Approved
          </span>
        );
      case "rejected":
        return (
          <span className={`${base} text-red-600`}>
            <XCircle size={16} /> Rejected
          </span>
        );
      case "delivered":
        return (
          <span className={`${base} text-blue-600`}>
            <Truck size={16} /> Delivered
          </span>
        );
      default:
        return status;
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">

      {/* ================= HEADER ================= */}
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <TrendingUp className="text-blue-600" />
        Admin Dashboard (Static)
      </h1>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-8">

        <Card icon={<ShoppingCart />} label="Total Orders" value={stats.totalOrders} />
        <Card icon={<Clock />} label="New Orders" value={stats.newOrders} />
        <Card icon={<Package />} label="Paid Orders" value={stats.paidOrders} />
        <Card icon={<Truck />} label="Delivered" value={stats.deliveredOrders} />
        <Card icon={<XCircle />} label="Rejected" value={stats.rejectedOrders} />

      </div>

      {/* ================= ORDERS ================= */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="text-xl font-bold mb-4">Orders Management</h2>

        <div className="space-y-4">

          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-xl p-4 flex justify-between items-center"
            >

              {/* LEFT */}
              <div>
                <h3 className="font-semibold text-lg">
                  {order.product}
                </h3>

                <p className="text-gray-500 text-sm">
                  Amount: ₹{order.amount}
                </p>

                <div className="mt-1">
                  {getStatusUI(order.status)}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 flex-wrap">

                {order.status === "paid" && (
                  <>
                    <button
                      onClick={() => updateStatus(order._id, "approved")}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => updateStatus(order._id, "rejected")}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </>
                )}

                {order.status === "approved" && (
                  <button
                    onClick={() => updateStatus(order._id, "delivered")}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Deliver
                  </button>
                )}

                <button
                  onClick={() => generateInvoice(order)}
                  className="bg-gray-900 text-white px-3 py-1 rounded"
                >
                  Invoice
                </button>

              </div>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
};

// ================= CARD COMPONENT =================
const Card = ({ icon, label, value }) => (
  <div className="bg-white p-4 rounded-xl shadow">
    <div className="flex items-center gap-2 text-gray-600">
      {icon}
      {label}
    </div>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);

export default AdminDashboard;