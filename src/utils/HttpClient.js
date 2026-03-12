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
import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  // do not hardcode Content-Type here; let individual requests
  // specify it or allow axios to infer (needed for FormData uploads)
  headers: {},
});

httpClient.interceptors.request.use((config) => {
  const stored = JSON.parse(localStorage.getItem("sellerToken") || "{}");

  if (stored.token) {
    // Check if expired
    if (Date.now() > stored.expiry) {
      localStorage.removeItem("sellerToken"); // remove expired token
      return Promise.reject({ message: "Token expired" });
    }

    config.headers.Authorization = `Bearer ${stored.token}`;
  }

  // when sending FormData we must not specify application/json;
  // delete any existing Content-Type so axios will set the proper
  // multipart/form-data header including the boundary
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

export default httpClient;