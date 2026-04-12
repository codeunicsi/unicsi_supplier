import api from "../api.jsx";

export const getShopifyOrders = async () => {
  return api.get("suppliers/shopify-orders");
};
