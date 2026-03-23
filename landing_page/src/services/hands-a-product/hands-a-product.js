import api from "../../api";

export const fetchHandsAProducts = () => {
  return api.get("/suppliers/source-requests/submitted");
};