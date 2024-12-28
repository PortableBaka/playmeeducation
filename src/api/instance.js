import axios from "axios";

const instance = axios.create({
<<<<<<< HEAD
  baseURL: "https://playmeeducation.com",
=======
  baseURL: "https://api.playmeeducation.com",
>>>>>>> 71f0a63887c5e6fd5a7f80d10296c28462c56803
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
