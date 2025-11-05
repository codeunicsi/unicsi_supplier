export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token; // converts token to true/false
};

export const getUserRole = () => {
  return localStorage.getItem("userRole");
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
};
