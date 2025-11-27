import axios from "axios";
import { API_URL } from "@/config.js";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Agrega un interceptor para incluir el token en el encabezado de autorización
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
