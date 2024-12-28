import axios from "axios";
import { API_BASE } from "../config";

const instance = axios.create({
  baseURL: API_BASE,
  headers: { 
    "Content-Type": "application/json", 
    Accept: "application/json",
  }, 
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
