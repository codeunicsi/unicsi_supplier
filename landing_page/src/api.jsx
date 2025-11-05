import axios from "axios";

const api = axios.create({
  baseURL: "http://147.93.28.253:5000/api", // backend URL
});

export default api;

//  http://localhost:5000
