import axios from "axios";
import { AuthStorage } from "./auth-storage";

export const axiosInstance = axios.create({
  baseURL: "https://nest-api-public.ixe-agent.io.vn/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Interceptor để thêm token vào request
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AuthStorage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      await AuthStorage.clearAuthData();
    }
    return Promise.reject(error);
  }
);
