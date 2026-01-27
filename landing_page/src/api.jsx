import axios from "axios";

const token = "Bearer " + localStorage.getItem("token");

const api = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "http://localhost:8000/api/v1/", // backend URL
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Expose-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": 3600,
    authorization: token,
  },
});

export default api;

//  http://localhost:5000
