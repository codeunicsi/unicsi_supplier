// src/services/profile/profile.service.js
import api from "../../api";

export const fetchProfile = () => {
  return api.get("/suppliers/profile/personalDetails");
};

export const fetchBankDetails = () => {
  return api.get("/suppliers/stores/bankAccountDetails");
};

export const updatePersonalDetails = (data) => {
  return api.put("/suppliers/profile/personalDetails", data);
};

export const AddBankDetails = (data) => {
  return api.post("/suppliers/stores/bankAccountDetails", data);
};

export const updateBankDetails = (data) => {
  return api.put("/suppliers/stores/bankAccountDetails", data);
};

export const AddGstDetails = (data) => {
  return api.post("/suppliers/stores/gstDetails", data);
};

export const getGstDetails = () => {
  return api.get("/suppliers/stores/gstDetails");
};

export const updateGstDetails = (data) => {
  return api.put("/suppliers/stores/gstDetails", data);
};

export const getBulkOrders = async () => {
  const data = await api.get("suppliers/bulk-orders");
  return data;
};

export const uploadBiltiDetails = async (formData) => {
  return await api.post("suppliers/upload-bilti", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getRequestProducts = async () => {
  const data = await api.get("suppliers/source-requests/submitted");
  return data;
};

export const getSupplierProfile = async () => {
  return await api.get("suppliers/profile/personalDetails");
};

// profile.service.js

export const postSaveNewAddress = async (formData) => {
  return await api.post("suppliers/stores/warehouses", formData);
};
export const getSaveNewAddressById = async (warehouseId) => {
  return await api.get(`suppliers/stores/warehouses/${warehouseId}`);
};
export const fetchAllAddresses = async () => {
  return await api.get("suppliers/stores/warehouses");
};
export const putNewAddressById = async (warehouseId, formData) => {
  return await api.put(`suppliers/stores/warehouses/${warehouseId}`, formData);
};

export const toggleWarehouseStatus = async (warehouseId, isActive) => {
  return await api.put(`suppliers/stores/warehouses/${warehouseId}/toggle`, {
    is_active: isActive,
  });
};

export const deleteNewAddressById = async (warehouseId) => {
  return await api.delete(`suppliers/stores/warehouses/${warehouseId}`);
};

export const shopifyOrders = async () => {
  return await api.get("suppliers/stores/shopify-orders");
};

export const updateOrderStatus = async (orderId, status) => {
  return await api.put(`suppliers/stores/shopify-orders/${orderId}/status`, { status });
};

export const createShipment = async (payload) => {
  return await api.post("velocity/shipment/forward", payload);
};

export const trackShipment = async (awbs) => {
  return await api.post("velocity/track", { awbs });
};
