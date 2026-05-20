// import axios from "axios";

// const httpClient = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // // ✅ Request Interceptor
// // httpClient.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem("token");
// //     const storeToken = localStorage.getItem("storeToken");

// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }

// //     if (storeToken) {
// //       config.headers["x-store-token"] = storeToken;
// //     }

// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );

// // // ✅ Response Interceptor
// // httpClient.interceptors.response.use(
// //   (response) => response,
// //   (error) => {
// //     if (error.response?.status === 401) {
// //       console.log("Unauthorized - Logging out");
// //       localStorage.removeItem("token");
// //       window.location.href = "/seller-login";
// //     }

// //     return Promise.reject(error);
// //   }
// // );

// export default httpClient;

// utils/HttpClient.js

















// import axios from "axios";

// const httpClient = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
//   withCredentials: true,
//   headers: {},
// });

// httpClient.interceptors.request.use((config) => {
//   const stored = JSON.parse(localStorage.getItem("sellerToken") || "{}");

//   if (stored.token) {
//     // Check if expired
//     if (Date.now() > stored.expiry) {
//       localStorage.removeItem("sellerToken"); // remove expired token
//       return Promise.reject({ message: "Token expired" });
//     }

//     config.headers.Authorization = `Bearer ${stored.token}`;
//   }
//   if (config.data instanceof FormData) {
//     delete config.headers["Content-Type"];
//   }

//   return config;
// });

// export default httpClient;







import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {},
});

// ================= TOKEN HANDLER =================
const getToken = (key) => {
  const data = localStorage.getItem(key);
  if (!data) return null;

  // Case 1: JSON format { token, expiry }
  try {
    const parsed = JSON.parse(data);

    if (parsed?.token) {
      if (!parsed.expiry || Date.now() <= parsed.expiry) {
        return parsed.token;
      }
      return null;
    }
  } catch (e) {
    // Not JSON → treat as raw string token
  }

  // Case 2: raw string token
  return data;
};

// ================= INTERCEPTOR =================
httpClient.interceptors.request.use(
  (config) => {
    // 🔥 SUPPORT BOTH SINGLE & MULTI TOKEN SYSTEM
    const token =
      getToken("token") || // ✅ your actual stored token (IMPORTANT FIX)
      getToken("adminToken") ||
      getToken("sellerToken") ||
      getToken("userToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Remove Content-Type for FormData
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default httpClient;