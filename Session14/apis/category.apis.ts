import { Category } from "@/interfaces/category.interface";
import { axiosInstance } from "@/utils/axios-instance";
import { PaginatinedResponse } from "@/utils/response-data";

export const getAllCategory = async () => {
  const response = await axiosInstance.get<PaginatinedResponse<Category>>(
    "categories/search-paging"
  );

  return response.data;
};
