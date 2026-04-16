import React, { useState, useEffect } from "react";
import { getSellerProducts } from "../../Api/ProductApi";
import { createOrder, getSellerOrders } from "../../Api/orderApi";
import toast from "react-hot-toast";
import InvoicePage from "./Invoicepage";

const BookDelivery = () => {
  const [products, setProducts] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [invoiceData, setInvoiceData] = useState(null);

  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const [formData, setFormData] = useState({
    productId: "",
    productSize: "",
    customerName: "",
    customerPhone: "",
    city: "",
    pickupAddress: "",
    deliveryAddress: "",
    paymentType: "",
  });

  const [price, setPrice] = useState(0);

  // ---------------- PRODUCTS ----------------
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getSellerProducts();
        setProducts(res.data || []);
      } catch {
        toast.error("Failed to load products");
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  // ---------------- ORDERS ----------------
  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const res = await getSellerOrders();
      setDeliveries(res.data || []);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ---------------- PRICE ----------------
  const calculatePrice = (size) => {
    const base = size === "small" ? 130 : 180;
    return Math.round(base * 1.18);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "productSize") {
      setPrice(calculatePrice(value));
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ---------------- CREATE ORDER ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.productId || !formData.productSize || !formData.paymentType) {
      return toast.error("Please fill required fields");
    }

    const product = products.find((p) => p._id === formData.productId);
    if (!product) return toast.error("Invalid product");

    try {
      await createOrder({
        amount: price,
        productId: product._id,
        ...formData,
      });

      toast.success("Order created 🚚");
      fetchOrders();

      setFormData({
        productId: "",
        productSize: "",
        customerName: "",
        customerPhone: "",
        city: "",
        pickupAddress: "",
        deliveryAddress: "",
        paymentType: "",
      });

      setPrice(0);
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    }
  };

  // ---------------- STATUS STYLE ----------------
  const getStatus = (status) => {
    const map = {
      pending: "bg-yellow-100 text-yellow-700",
      approved: "bg-blue-100 text-blue-700",
      rejected: "bg-red-100 text-red-700",
      delivered: "bg-green-100 text-green-700",
    };

    return map[status] || "bg-gray-100 text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 p-6">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold">🚚 Book Delivery</h1>
        <p className="text-gray-500">Manage your orders & track deliveries</p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

        {/* FORM */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">📦 Create Delivery</h2>

          <select
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">
              {loadingProducts ? "Loading..." : "Select Product"}
            </option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>

          <div className="flex gap-3 mb-4">
            {["small", "big"].map((size) => (
              <label
                key={size}
                className={`flex-1 text-center p-2 border rounded cursor-pointer ${
                  formData.productSize === size
                    ? "bg-blue-600 text-white"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="productSize"
                  value={size}
                  hidden
                  onChange={handleChange}
                />
                {size === "small" ? "Small ₹130" : "Big ₹180"}
              </label>
            ))}
          </div>

          {price > 0 && (
            <div className="bg-blue-50 text-center p-2 rounded mb-4 font-semibold">
              Total: ₹{price}
            </div>
          )}

          <input name="customerName" placeholder="Customer Name" onChange={handleChange} className="w-full p-2 border mb-2 rounded" />
          <input name="customerPhone" placeholder="Phone" onChange={handleChange} className="w-full p-2 border mb-2 rounded" />
          <input name="city" placeholder="City" onChange={handleChange} className="w-full p-2 border mb-2 rounded" />

          <textarea name="pickupAddress" placeholder="Pickup Address" onChange={handleChange} className="w-full p-2 border mb-2 rounded" />
          <textarea name="deliveryAddress" placeholder="Delivery Address" onChange={handleChange} className="w-full p-2 border mb-2 rounded" />

          <select name="paymentType" onChange={handleChange} className="w-full p-2 border mb-4 rounded">
            <option value="">Payment Type</option>
            <option value="online">Online</option>
            <option value="cod">COD</option>
          </select>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Book Delivery
          </button>
        </div>

        {/* ORDERS */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">📋 My Deliveries</h2>

          {loadingOrders ? (
            <p>Loading...</p>
          ) : deliveries.length === 0 ? (
            <p className="text-gray-400">No deliveries yet</p>
          ) : (
            deliveries.map((d) => (
              <div
                key={d._id}
                className="p-4 border rounded-lg mb-3 flex justify-between items-center hover:shadow"
              >
                <div>
                  <p className="font-semibold">{d.productName}</p>
                  <p className="text-sm text-gray-500">
                    {d.customerName} • {d.city}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded mt-1 inline-block ${getStatus(
                      d.status
                    )}`}
                  >
                    {d.status}
                  </span>
                </div>

                <button
                  onClick={() => setInvoiceData(d)}
                  className="text-blue-600 text-sm underline"
                >
                  Invoice
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 🧠 SELLER INFO PANEL */}
      <div className="max-w-6xl mx-auto mt-8 bg-white p-5 rounded-xl shadow">

        <h3 className="text-lg font-semibold mb-3">📌 Important Notes for Sellers</h3>

        <ul className="text-sm text-gray-600 space-y-2">
          <li>✔ Orders are automatically linked to your seller account</li>
          <li>✔ You do NOT need to send sellerId manually</li>
          <li>✔ Order status updates will reflect in real-time dashboard</li>
          <li>✔ Only "approved" orders should be processed for delivery</li>
          <li>✔ Invoice can be downloaded anytime from order list</li>
        </ul>

      </div>

      {/* INVOICE */}
      <InvoicePage invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
    </div>
  );
};

export default BookDelivery;