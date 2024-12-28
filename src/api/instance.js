import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
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
