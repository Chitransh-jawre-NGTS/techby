// import httpClient from "../utils/HttpClient";

// // ✅ GET SELLER ORDERS
// export const getSellerOrders = (sellerId) => {
  
//   return httpClient.get(`/order/seller/orders?sellerId=${sellerId}`);
  
// };

// // ✅ CREATE ORDER
// export const createOrder = (data) => {
//   return httpClient.post("/order/create-order", data);
  
// };

// orderApi.js
import httpClient from "../utils/HttpClient";

// GET SELLER ORDERS (NO sellerId)
export const getSellerOrders = () => {
  return httpClient.get("/order/seller/orders");
};

// CREATE ORDER
export const createOrder = (data) => {
  return httpClient.post("/order/create-order", data);
};

// ✅ ADMIN - GET ALL ORDERS
export const getAdminOrders = () => {
  return httpClient.get("/order/admin/orders");
};

// ✅ ADMIN - UPDATE ORDER STATUS
export const updateOrderStatus = (id, status) => {
  return httpClient.put(`/order/admin/order/${id}`, { status });
};