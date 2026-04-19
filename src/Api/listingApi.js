import HttpClient from "../utils/HttpClient";

// CREATE PURCHASE
export const createPurchase = (formData) => {
  return HttpClient.post("/listing/purchase", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// GET ALL PURCHASES (ADMIN)
export const getAllPurchases = () => {
  return HttpClient.get("/listing/admin/purchases");
};

// UPDATE PURCHASE STATUS
export const updatePurchaseStatus = (id, data) => {
  return HttpClient.put(`/listing/admin/purchase/${id}`, data);
};