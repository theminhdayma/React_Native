import { LoginReponse, UserLogin } from "@/interfaces/auth.interface";
import axios from "axios";

// Hàm gọi API đăng nhập
export const login = async (userLogin: UserLogin): Promise<LoginReponse> => {
  const response = await axios.post<LoginReponse>(
    "https://nest-api-public.ixe-agent.io.vn/api/v1/auths/login",
    userLogin
  );

  return response.data;
};
