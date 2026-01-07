import api from "../api";

export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

export const getToken = () => {
    return localStorage.getItem('token');
};


export const login = (token, userRole) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', userRole);
};

export const getUserRole = () => {
  return localStorage.getItem("userRole");
};

export const logout = () => {
  api.post("/auth/logout");
  console.log("logout");
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
  window.location.href = "/login";
};
