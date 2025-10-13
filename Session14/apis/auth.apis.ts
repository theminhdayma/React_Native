import { LoginDataRequest, LoginResponse } from "@/interfaces/auth.interface";
import { axiosInstance } from "@/utils/axios-instance";
import { SingleResponse } from "@/utils/response-data";

export const login = async (loginData: LoginDataRequest) => {
  const response = await axiosInstance.post<SingleResponse<LoginResponse>>(
    "auths/login",
    loginData
  );

  return response.data;
};  