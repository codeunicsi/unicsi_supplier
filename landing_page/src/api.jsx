import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "http://apis.unicsi.com:5000/api", // backend URL
});

export default api;

//  http://localhost:5000
