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
