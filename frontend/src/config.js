import axios from "axios";

// 🔹 define API base URL first
const API_BASE = "http://localhost:5000/api/auth";  // update if needed

// 🔹 create axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// optional: attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔹 export both
export { API_BASE };
export default api;
