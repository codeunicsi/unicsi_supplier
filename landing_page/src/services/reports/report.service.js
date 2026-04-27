import api from "../../api";

export const fetchReportOverview = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return api.get(`/suppliers/reports/overview${query ? `?${query}` : ""}`);
};

export const fetchSalesTimeSeries = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return api.get(`/suppliers/reports/sales${query ? `?${query}` : ""}`);
};

export const fetchTopProducts = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return api.get(`/suppliers/reports/top-products${query ? `?${query}` : ""}`);
};
