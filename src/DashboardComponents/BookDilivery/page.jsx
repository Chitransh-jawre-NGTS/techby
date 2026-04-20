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

  const [sellerData, setSellerData] = useState({
    shopName: "",
    shopPhone: "",
    shopAddress: "",
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

  const handleSellerChange = (e) => {
    const { name, value } = e.target;
    setSellerData((prev) => ({ ...prev, [name]: value }));
  };

  // ---------------- CREATE ORDER ----------------
// ---------------- CREATE ORDER ----------------
const handleSubmit = async (e) => {
  e.preventDefault();

  // ❌ PAYMENT VALIDATION TEMPORARILY DISABLED
  if (!formData.productId || !formData.productSize) {
    return toast.error("Please fill required fields");
  }

  const product = products.find((p) => p._id === formData.productId);
  if (!product) return toast.error("Invalid product");

  try {
    await createOrder({
      amount: price,
      productId: product._id,
      ...formData,
      sellerInfo: sellerData,
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
      paymentType: "", // still kept but ignored
    });

    setPrice(0);
  } catch (err) {
    toast.error(err.response?.data?.message || "Server error");
  }
};

  // ---------------- STATUS ----------------
  const getStatus = (status) => {
    const map = {
      pending: "bg-yellow-100 text-yellow-700",
      approved: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
      delivered: "bg-emerald-200 text-emerald-800",
    };
    return map[status] || "bg-gray-100 text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 p-6">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
  🚚 Exclusive: Free for Early Sellers (Limited Time)
</h1>
        <p className="text-gray-500">
          Smart delivery management system
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

        {/* FORM */}
        <div className="backdrop-blur-xl bg-white/70 p-6 rounded-3xl shadow-xl border border-green-100">

          <h2 className="text-xl font-semibold mb-4 text-green-700">
            📦 Create Delivery
          </h2>

          {/* SELLER */}
          <h3 className="text-green-700 font-semibold mb-3">🏪 Seller Details</h3>

          <div className="mb-3">
            <label className="labelStyle">Shop Name</label>
            <input
              name="shopName"
              value={sellerData.shopName}
              onChange={handleSellerChange}
              className="inputStyle"
            />
          </div>

          <div className="mb-3">
            <label className="labelStyle">Shop Phone</label>
            <input
              name="shopPhone"
              value={sellerData.shopPhone}
              onChange={handleSellerChange}
              className="inputStyle"
            />
          </div>

          <div className="mb-3">
            <label className="labelStyle">Shop Address</label>
            <textarea
              name="shopAddress"
              value={sellerData.shopAddress}
              onChange={handleSellerChange}
              className="inputStyle"
            />
          </div>

          {/* PRODUCT */}
          <div className="mb-3">
            <label className="labelStyle">Select Product</label>
            <select
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              className="inputStyle"
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
          </div>

          {/* SIZE */}
          <div className="mb-3">
            <label className="labelStyle">Product Size</label>
            <div className="flex gap-3 mt-2">
              {["small", "big"].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, productSize: size }));
                    setPrice(calculatePrice(size));
                  }}
                  className={`flex-1 p-2 rounded-xl border transition ${
                    formData.productSize === size
                      ? "bg-green-600 text-white shadow-md"
                      : "hover:bg-green-50"
                  }`}
                >
                  {size === "small" ? "Small (like a mobile & tablet) " : "Big (like a laptop) "}
                </button>
              ))}
            </div>
          </div>

          {/* PRICE */}
          {/* {price > 0 && (
            <div className="mb-3 p-3 bg-green-100 text-green-800 rounded-xl text-center font-semibold">
              Total: ₹{price}
            </div>
          )} */}

          {/* CUSTOMER */}
          <div className="mb-3">
            <label className="labelStyle">Customer Name</label>
            <input name="customerName" onChange={handleChange} className="inputStyle" />
          </div>

          <div className="mb-3">
            <label className="labelStyle">Customer Phone</label>
            <input name="customerPhone" onChange={handleChange} className="inputStyle" />
          </div>

          <div className="mb-3">
            <label className="labelStyle">City (Indore only)</label>
            <input name="city" onChange={handleChange} className="inputStyle" />
          </div>

          {/* ADDRESSES */}
          <div className="mb-3">
            <label className="labelStyle">Pickup Address</label>
            <textarea name="pickupAddress" onChange={handleChange} className="inputStyle" />
          </div>

          <div className="mb-3">
            <label className="labelStyle">Delivery Address</label>
            <textarea name="deliveryAddress" onChange={handleChange} className="inputStyle" />
          </div>

          {/* PAYMENT */}
          {/* <div className="mb-3">
            <label className="labelStyle">Payment Type</label>
            <select name="paymentType" onChange={handleChange} className="inputStyle">
              <option value="">Select Payment</option>
              <option value="online">Online</option>
              <option value="cod">COD</option>
            </select>
          </div> */}

          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl shadow-md transition"
          >
            Book Delivery
          </button>
        </div>

        {/* ORDERS */}
        <div className="backdrop-blur-xl bg-white/70 p-6 rounded-3xl shadow-xl border border-green-100">
          <h2 className="text-xl font-semibold mb-4 text-green-700">
            📋 My Deliveries
          </h2>

          {loadingOrders ? (
            <p>Loading...</p>
          ) : deliveries.length === 0 ? (
            <p className="text-gray-400">No deliveries yet</p>
          ) : (
            deliveries.map((d) => (
              <div
                key={d._id}
                className="p-4 mb-3 rounded-xl border hover:shadow-lg transition flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{d.productName}</p>
                  <p className="text-sm text-gray-500">
                    {d.customerName} • {d.city}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded ${getStatus(d.status)}`}>
                    {d.status}
                  </span>
                </div>

                <button
                  onClick={() => setInvoiceData(d)}
                  className="text-green-600 text-sm font-medium hover:underline"
                >
                  Invoice
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* INVOICE */}
      <InvoicePage invoiceData={invoiceData} setInvoiceData={setInvoiceData} />

      {/* STYLES */}
      <style>
        {`
        .inputStyle {
          width: 100%;
          padding: 12px;
          border-radius: 14px;
          border: 1px solid #d1fae5;
          background: white;
          transition: 0.2s;
        }

        .inputStyle:focus {
          border-color: #16a34a;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.2);
          outline: none;
        }

        .labelStyle {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 4px;
        }
        `}
      </style>
    </div>
  );
};

export default BookDelivery;