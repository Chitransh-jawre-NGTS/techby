// src/api/authApi.js

import httpClient from "../utils/HttpClient";
import { ENDPOINTS } from "../utils/endpoints";

export const loginAdmin = (data) => {
  return httpClient.post(ENDPOINTS.ADMIN.LOGIN, data);
};
export const registerSeller = (data) => {
  return httpClient.post(ENDPOINTS.AUTH.REGISTER, data);
};

export const loginSeller = (data) => {
  return httpClient.post(ENDPOINTS.AUTH.LOGIN, data);
};

export const logoutSeller = () => {
  localStorage.removeItem("sellerToken");
  // reset auth state in Redux
};
// ✅ GET ALL SELLERS (Admin)
export const getAllSellers = () => {
  return httpClient.get(ENDPOINTS.ADMIN.GET_ALL_SELLERS);
};

export const getSellerProfile = () => {
  return httpClient.get(ENDPOINTS.AUTH.PROFILE);
};
export const deleteSeller = (id) => {
  return httpClient.delete(`${ENDPOINTS.ADMIN.DELETE_SELLER}/${id}`);
};

export const verifySeller = () => {
  return httpClient.get(ENDPOINTS.AUTH.VERIFY);
};

export const getDashboard = () => {
  return httpClient.get(ENDPOINTS.AUTH.DASHBOARD);
};


// ================= LOGIN =================
export const loginUserApi = (data) => {
  return httpClient.post(
    ENDPOINTS.USER.LOGIN,
    data
  );
};

// ================= REGISTER =================
export const registerUserApi = (data) => {
  return httpClient.post(
    ENDPOINTS.USER.REGISTER,
    data
  );
};

// ================= GOOGLE LOGIN =================
export const googleLoginApi = (data) => {
  return httpClient.post(
    ENDPOINTS.USER.GOOGLE_LOGIN,
    data
  );
};

// ================= VERIFY USER =================
export const verifyUserApi = () => {
  return httpClient.get(
    ENDPOINTS.USER.VERIFY
  );
};

// ================= GET PROFILE =================
export const getUserProfileApi = () => {
  return httpClient.get(
    ENDPOINTS.USER.PROFILE
  );
};

// ================= UPDATE PROFILE =================
export const updateUserProfileApi = (data) => {
  return httpClient.put(
    ENDPOINTS.USER.UPDATE_PROFILE,
    data
  );
};

// ================= LOGOUT =================
export const logoutUserApi = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};