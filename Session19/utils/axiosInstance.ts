import axios from "axios";
import { Alert } from "react-native";

const axiosInstance = axios.create({
  baseURL: "https://nest-api-public.ixe-agent.io.vn/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Gửi các request kèm theo lên API (thông qua interceptor)
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE0LCJyb2xlIjoiS2jDoWNoIGjDoG5nIiwic3RhdHVzIjoiQUNUSVZFIiwiZGV2aWNlSWQiOiIxZjAyNWU5NC0zNGEwLTZlZTAtOWVhOC0zMGJiMjA0MjMyY2YiLCJpYXQiOjE3NjA4NjMxNTEsImV4cCI6MTc2MDg2NDk1MX0.SFUVxbWSYrBiRSEJJZ3DrjOw69lHibhWNZMOwFBL-gk";
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Lấy các phản hồi từ phía server một cách tự động
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is 401 Unauthorized and not a refresh token request itself
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request to prevent infinite loops

      try {
        // Call your refresh token endpoint
        const response = await axios.post(
          "https://nest-api-public.ixe-agent.io.vn/api/v1/auths/refresh-token",
          {
            refreshToken:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE0LCJpYXQiOjE3NjA1OTg2MTYsImV4cCI6MTc2MTIwMzQxNn0.4Nadd87kltbtsy-ywGyGFvYdL8CPrLPtk8w1v4zW_n4",
          }
        );

        const { accessToken } = response?.data?.data;

        // Update stored tokens on AsyncStorage
        // localStorage.setItem("accessToken", accessToken);

        // Update the Authorization header in the original failed request
        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        // Retry the original request with the new access token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        Alert.alert(
          "Cảnh báo",
          "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại"
        );
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;