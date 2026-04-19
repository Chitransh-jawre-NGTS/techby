import HttpClient from "../utils/HttpClient";

// GET seller analytics
export const getSellerStats = (sellerId) => {
  return HttpClient.get(`/product-stats/seller/${sellerId}`);
};