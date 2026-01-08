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

export const updateBankDetails = (data) => {
  return api.post("/suppliers/stores/bankAccountDetails", data);
};

export const updateGstDetails = (data) => {
  return api.put("/suppliers/stores/gstDetails", data);
};
