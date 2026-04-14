// import React, { useState, useEffect } from "react";
// import { getSellerProducts } from "../../Api/ProductApi";
// import jsPDF from "jspdf";
// import InvoicePage from "./Invoicepage";

// const BookDelivery = () => {
//   const [products, setProducts] = useState([]);
//   const [loadingProducts, setLoadingProducts] = useState(true);
//   const [loadingPayment, setLoadingPayment] = useState(false);

//   const [formData, setFormData] = useState({
//     productId: "",
//     productSize: "",
//     customerName: "",
//     customerPhone: "",
//     city: "",
//     pickupAddress: "",
//     deliveryAddress: "",
//     paymentType: "",
//   });

//   const [price, setPrice] = useState(0);
//   const [deliveries, setDeliveries] = useState([]);
//   const [invoiceData, setInvoiceData] = useState(null);
//   const seller = JSON.parse(localStorage.getItem("user"));

//   // ---------------- FETCH PRODUCTS ----------------
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await getSellerProducts();
//         setProducts(res.data || []);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoadingProducts(false);
//       }
//     };

//     fetchProducts();

//     const saved = JSON.parse(localStorage.getItem("deliveries")) || [];
//     setDeliveries(saved);
//   }, []);

//   // ---------------- PRICE ----------------
//   const calculatePrice = (size) => {
//     const base = size === "small" ? 1 : 180;
//     return Math.round(base * 1.18);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "productSize") {
//       setPrice(calculatePrice(value));
//     }

//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ---------------- SAVE DELIVERY ----------------
//   const saveDelivery = (deliveryData, paymentStatus) => {
//     const newDelivery = { ...deliveryData, paymentStatus };

//     const updated = [newDelivery, ...deliveries];
//     setDeliveries(updated);
//     localStorage.setItem("deliveries", JSON.stringify(updated));

//     setInvoiceData(newDelivery);

//     // reset form
//     setFormData({
//       productId: "",
//       productSize: "",
//       customerName: "",
//       customerPhone: "",
//       city: "",
//       pickupAddress: "",
//       deliveryAddress: "",
//       paymentType: "",
//     });
//     setPrice(0);
//   };

//   // ---------------- PAYMENT ----------------
//   const handlePayment = async (deliveryData) => {
//     try {
//       setLoadingPayment(true);

//       const res = await fetch(
//         "http://localhost:5000/api/payment/create-order",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             amount: deliveryData.price,
//             sellerId: deliveryData.sellerId,
//             product: deliveryData.productName,
//           }),
//         },
//       );

//       const order = await res.json();

//       if (!order?.id) {
//         alert("Order creation failed");
//         return;
//       }

//       const options = {
//         key: "rzp_test_ScepwIxDuOWxxX",
//         amount: order.amount,
//         currency: "INR",
//         name: "TechBy",
//         description: "Delivery Payment",
//         order_id: order.id,

//         handler: async function (response) {
//           const verifyRes = await fetch(
//             "http://localhost:5000/api/payment/verify-payment",
//             {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify(response),
//             },
//           );

//           const data = await verifyRes.json();

//           if (data.success) {
//             // ✅ ONLY HERE ORDER IS CREATED
//             saveDelivery(deliveryData, "PAID");
//           } else {
//             alert("Payment verification failed");
//           }
//         },

//         prefill: {
//           name: deliveryData.customerName,
//           contact: deliveryData.customerPhone,
//         },

//         theme: { color: "#2563eb" },
//       };

//       const rzp = new window.Razorpay(options);

//       // ❌ USER CLOSED POPUP CASE
//       rzp.on("payment.failed", function () {
//         alert("Payment cancelled/failed ❌ No order created");
//       });

//       rzp.open();
//     } catch (err) {
//       console.error(err);
//       alert("Payment failed");
//     } finally {
//       setLoadingPayment(false);
//     }
//   };
//   // ---------------- SUBMIT ----------------
//   const handleSubmit = (e) => {
//   e.preventDefault();

//   if (loadingPayment) return;

//   if (
//     !formData.productId ||
//     !formData.productSize ||
//     !formData.paymentType
//   ) {
//     return alert("Please fill all required fields");
//   }

//   const product = products.find((p) => p._id === formData.productId);
//   if (!product) return alert("Invalid product");

//   const deliveryData = {
//     ...formData,
//     productName: product.name,
//     price,
//     status: "pending",
//     id: Date.now(),
//     invoiceId: "TB-" + Date.now(),
//     createdAt: new Date().toLocaleString(),

//     sellerId: seller?._id,
//     sellerName: seller?.name,
//     shopName: seller?.shopName,
//   };

//   // ✅ PAID → Razorpay
//   if (formData.paymentType === "paid") {
//     handlePayment(deliveryData);
//   }

//   // ✅ COD → create order but mark COD pending
//   else if (formData.paymentType === "cod") {
//     saveDelivery(deliveryData, "COD_PENDING");
//   }
// };
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 p-6">
//       {/* HEADER */}
//       <div className="max-w-6xl mx-auto mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">🚚 Book Delivery</h1>
//         <p className="text-gray-500">
//           Create delivery request & manage invoices
//         </p>
//       </div>

//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
//         {/* FORM */}
//         <div className="bg-white p-6 rounded-2xl shadow-lg">
//           <h2 className="text-xl font-semibold mb-4">📦 Delivery Form</h2>

//           {/* PRODUCT */}
//           <select
//             name="productId"
//             value={formData.productId}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg mb-4"
//           >
//             <option value="">
//               {loadingProducts ? "Loading..." : "Select Product"}
//             </option>
//             {products.map((p) => (
//               <option key={p._id} value={p._id}>
//                 {p.name}
//               </option>
//             ))}
//           </select>

//           {/* SIZE */}
//           <div className="flex gap-3 mb-4">
//             {["small", "big"].map((size) => (
//               <label
//                 key={size}
//                 className={`flex-1 text-center p-2 border rounded-lg cursor-pointer transition ${
//                   formData.productSize === size
//                     ? "bg-blue-600 text-white"
//                     : "hover:bg-gray-100"
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name="productSize"
//                   value={size}
//                   onChange={handleChange}
//                   hidden
//                 />
//                 {size === "small" ? "Small ₹130" : "Big ₹180"}
//               </label>
//             ))}
//           </div>

//           {/* PRICE */}
//           {price > 0 && (
//             <div className="bg-blue-50 text-blue-700 p-2 rounded-lg text-center mb-4 font-semibold">
//               Total: ₹{price}
//             </div>
//           )}

//           {/* INPUTS */}
//           <input
//             name="customerName"
//             placeholder="Customer Name"
//             value={formData.customerName}
//             onChange={handleChange}
//             className="w-full p-2 border rounded mb-3"
//           />

//           <input
//             name="customerPhone"
//             placeholder="Phone Number"
//             value={formData.customerPhone}
//             onChange={handleChange}
//             className="w-full p-2 border rounded mb-3"
//           />

//           <input
//             name="city"
//             placeholder="City"
//             value={formData.city}
//             onChange={handleChange}
//             className="w-full p-2 border rounded mb-3"
//           />

//           <textarea
//             name="pickupAddress"
//             placeholder="Pickup Address"
//             value={formData.pickupAddress}
//             onChange={handleChange}
//             className="w-full p-2 border rounded mb-3"
//           />

//           <textarea
//             name="deliveryAddress"
//             placeholder="Delivery Address"
//             value={formData.deliveryAddress}
//             onChange={handleChange}
//             className="w-full p-2 border rounded mb-3"
//           />

//           {/* PAYMENT */}
//        {/* PAYMENT */}
// <div className="mb-4">
//   <label className="text-sm font-semibold text-gray-700 mb-1 block">
//     Payment Mode (Seller Collection Type)
//   </label>

//   <select
//     name="paymentType"
//     value={formData.paymentType}
//     onChange={handleChange}
//     className="w-full p-2 border rounded"
//   >
//     <option value="">Select Payment Mode</option>

//     <option value="paid">
//       Paid (Customer already paid online)
//     </option>

//     <option value="paid">
//       Cash on Delivery (Collect payment on delivery)
//     </option>
//   </select>

//   {/* 🔥 NOTE FOR SELLER */}
//   <p className="text-xs text-gray-500 mt-1">
//     Note: This option only defines how payment will be collected.
//     It does NOT trigger payment automatically.
//   </p>
// </div>

//           <button
//             onClick={handleSubmit}
//             disabled={loadingPayment}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
//           >
//             {loadingPayment ? "Processing..." : "Book Delivery"}
//           </button>
//         </div>

//         {/* DELIVERY LIST */}
//         <div className="bg-white p-6 rounded-2xl shadow-lg">
//           <h2 className="text-xl font-semibold mb-4">📋 My Deliveries</h2>

//           <div className="space-y-3 max-h-[500px] overflow-y-auto">
//             {deliveries.length === 0 && (
//               <p className="text-gray-400 text-center">No deliveries yet</p>
//             )}

//             {deliveries.map((d) => (
//               <div
//                 key={d.id}
//                 className="p-4 border rounded-lg flex justify-between items-center hover:shadow transition"
//               >
//                 <div>
//                   <p className="font-semibold text-gray-800">{d.productName}</p>
//                   <p className="text-sm text-gray-500">{d.city}</p>

//                   <p className="text-xs mt-1">
//                     <span className="font-semibold">Payment:</span>{" "}
//                     {d.paymentStatus}
//                   </p>
//                 </div>

//                 <div className="text-right">
//                   <p
//                     className={`text-sm font-semibold ${
//                       d.status === "pending"
//                         ? "text-yellow-500"
//                         : "text-green-600"
//                     }`}
//                   >
//                     {d.status}
//                   </p>

//                   <button
//                     onClick={() => setInvoiceData(d)}
//                     className="text-xs text-blue-600 underline mt-1"
//                   >
//                     View Invoice
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <InvoicePage invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
//     </div>
//   );
// };

// export default BookDelivery;





import React, { useState, useEffect } from "react";
import { getSellerProducts } from "../../Api/ProductApi";
import toast from "react-hot-toast";
import InvoicePage from "./Invoicepage";

const BookDelivery = () => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

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
  const [deliveries, setDeliveries] = useState([]);
  const [invoiceData, setInvoiceData] = useState(null);

  const seller = JSON.parse(localStorage.getItem("user"));

  // ---------------- FETCH PRODUCTS ----------------
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getSellerProducts();
        setProducts(res.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load products");
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();

    const saved = JSON.parse(localStorage.getItem("deliveries")) || [];
    setDeliveries(saved);
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

  // ---------------- SAVE DELIVERY ----------------
  const saveDelivery = (deliveryData, paymentStatus) => {
    const newDelivery = { ...deliveryData, paymentStatus };

    const updated = [newDelivery, ...deliveries];
    setDeliveries(updated);
    localStorage.setItem("deliveries", JSON.stringify(updated));

    setInvoiceData(newDelivery);

    toast.success("Delivery booked successfully 🚚");

    // reset form
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
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.productId ||
      !formData.productSize ||
      !formData.paymentType
    ) {
      return toast.error("Please fill all required fields");
    }

    const product = products.find((p) => p._id === formData.productId);
    if (!product) return toast.error("Invalid product");

    const deliveryData = {
      ...formData,
      productName: product.name,
      price,
      status: "pending",
      id: Date.now(),
      invoiceId: "TB-" + Date.now(),
      createdAt: new Date().toLocaleString(),

      sellerId: seller?._id,
      sellerName: seller?.name,
      shopName: seller?.shopName,
    };

    // ✅ SIMPLE FLOW (NO ONLINE PAYMENT)
    saveDelivery(deliveryData, "PAY_AT_PICKUP");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 p-6">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          🚚 Book Delivery
        </h1>
        <p className="text-gray-500">
          Create delivery request & manage invoices
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

        {/* FORM */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            📦 Delivery Form
          </h2>

          {/* PRODUCT */}
          <select
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mb-4"
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

          {/* SIZE */}
          <div className="flex gap-3 mb-4">
            {["small", "big"].map((size) => (
              <label
                key={size}
                className={`flex-1 text-center p-2 border rounded-lg cursor-pointer transition ${
                  formData.productSize === size
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <input
                  type="radio"
                  name="productSize"
                  value={size}
                  onChange={handleChange}
                  hidden
                />
                {size === "small" ? "Small ₹130" : "Big ₹180"}
              </label>
            ))}
          </div>

          {/* PRICE */}
          {price > 0 && (
            <div className="bg-blue-50 text-blue-700 p-2 rounded-lg text-center mb-4 font-semibold">
              Total: ₹{price}
            </div>
          )}

          {/* INPUTS */}
          <input
            name="customerName"
            placeholder="Customer Name"
            value={formData.customerName}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />

          <input
            name="customerPhone"
            placeholder="Phone Number"
            value={formData.customerPhone}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />

          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />

          <textarea
            name="pickupAddress"
            placeholder="Pickup Address"
            value={formData.pickupAddress}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />

          <textarea
            name="deliveryAddress"
            placeholder="Delivery Address"
            value={formData.deliveryAddress}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />

          {/* PAYMENT */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-700 mb-1 block">
              Payment Mode
            </label>

            <select
              name="paymentType"
              value={formData.paymentType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Payment Mode</option>

              <option value="online">
                Already Paid Online
              </option>

              <option value="cod">
                Cash on Delivery (Pay at Pickup)
              </option>
            </select>

            <p className="text-xs text-red-500 mt-2">
              ⚠️ Seller must pay delivery charge to delivery boy at pickup time
            </p>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Book Delivery
          </button>
        </div>

        {/* DELIVERY LIST */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            📋 My Deliveries
          </h2>

          <div className="space-y-3 max-h-[500px] overflow-y-auto">

            {deliveries.length === 0 && (
              <p className="text-gray-400 text-center">
                No deliveries yet
              </p>
            )}

            {deliveries.map((d) => (
              <div
                key={d.id}
                className="p-4 border rounded-lg flex justify-between items-center hover:shadow transition"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {d.productName}
                  </p>

                  <p className="text-sm text-gray-500">
                    {d.city}
                  </p>

                  <p className="text-xs mt-1">
                    <span className="font-semibold">
                      Payment:
                    </span>{" "}
                    Pay at Pickup
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-yellow-500">
                    pending
                  </p>

                  <button
                    onClick={() => setInvoiceData(d)}
                    className="text-xs text-blue-600 underline mt-1"
                  >
                    View Invoice
                  </button>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* INVOICE */}
      <InvoicePage
        invoiceData={invoiceData}
        setInvoiceData={setInvoiceData}
      />
    </div>
  );
};

export default BookDelivery;