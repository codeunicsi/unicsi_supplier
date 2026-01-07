// src/services/profile/profile.service.js
import api from "../../api";

export const fetchProfile = () => {
  return api.get("/supplier/stores/profile");
};

export const updatePersonalDetails = (data) => {
  return api.put("/suppliers/profile/personalDetails", data);
};

export const updateBankDetails = (data) => {
  return api.put("/suppliers/profile/bank", data);
};

export const updateGstDetails = (data) => {
  return api.put("/suppliers/profile/gst", data);
};
