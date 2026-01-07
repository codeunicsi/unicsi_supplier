// src/services/profile/profile.service.js
import api from "../../api";

export const fetchProfile = () => {
  return api.get("/supplier/profile");
};

export const updatePersonalDetails = (data) => {
  return api.put("/supplier/profile/personal", data);
};

export const updateBankDetails = (data) => {
  return api.put("/supplier/profile/bank", data);
};

export const updateGstDetails = (data) => {
  return api.put("/supplier/profile/gst", data);
};
