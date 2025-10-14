import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const baseUrl = axios.create({
    baseURL: "https://nest-api-public.ixe-agent.io.vn/api/v1",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"

    }
});

baseUrl.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

baseUrl.interceptors.response.use(async (response) => {
    if (response.status === 401) {
        try {
            const response = await baseUrl.post("/auths/refresh-token", {
                refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjc4LCJpYXQiOjE3NjAzMzE1NDQsImV4cCI6MTc2MDkzNjM0NH0.37Zj36QRR4LHRlB56vJzxf-E0mCV6wIJjAAqiDmoDpk"
            });
            if (response) {
                const newAccessToken = response.data.accessToken;
                await AsyncStorage.setItem("accessToken", JSON.stringify(newAccessToken));
                response.config.headers.Authorization = `Bearer ${newAccessToken}`;
                return (await axios(response.config)).data;
            }
        } catch (error) {
            alert(error);
            return Promise.reject(error);

        }


    }
})