// src/api/productApi.js

import httpClient from "../utils/HttpClient";
import { ENDPOINTS } from "../utils/endpoints";

export const createProduct = (formData) => {
  return httpClient.post(ENDPOINTS.PRODUCTS.CREATE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ---------------- GET SELLER LIMIT ----------------
export const getSellerLimit = () => {
  return httpClient.get(ENDPOINTS.PRODUCTS.LIMIT);
};

export const getMyProducts = () => {
  return httpClient.get(ENDPOINTS.PRODUCTS.MY_PRODUCTS);
};
// Send view to backend
export const increaseProductView = (productId, data) => {
  return httpClient.post(
    `${ENDPOINTS.PRODUCT_STATS.VIEW}/${productId}`,
    data
  );
};


export const updateProduct = (id, formData) => {
  return httpClient.put(ENDPOINTS.PRODUCTS.UPDATE(id), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteProduct = (id) => {
  return httpClient.delete(ENDPOINTS.PRODUCTS.DELETE(id));
};

export const getAllProducts = (lat, lng) => {
  return httpClient.get(ENDPOINTS.PRODUCTS.GET_ALL, {
    params: {
      lat,
      lng,
    }
  });
};



export const getProductById = (id) => {
  return httpClient.get(ENDPOINTS.PRODUCTS.GET_ONE(id));
};

export const getSellerProducts = () => {
  return httpClient.get(ENDPOINTS.PRODUCTS.GET_SELLER_PRODUCTS);
};