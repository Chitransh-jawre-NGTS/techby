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