import {
  CreatePositionRequest,
  Position,
  SearchPositionRequest,
  UpdatePositionRequest,
} from "@/interfaces/position.interface";
import { axiosInstance } from "@/utils/axios-instance";
import { PaginatinedResponse } from "@/utils/response-data";

export const createPosition = async (data: CreatePositionRequest) => {
  const response = await axiosInstance.post<Position>("positions", data);
  return response.data;
};

export const searchPositions = async (params: SearchPositionRequest) => {
  const response = await axiosInstance.get<PaginatinedResponse<Position>>(
    "positions/search-pagination",
    {
      params: {
        keyword: params.keyword || "",
        currentPage: params.currentPage,
        pageSize: params.pageSize,
      },
    }
  );
  return response.data;
};

export const getPositionById = async (id: number) => {
  const response = await axiosInstance.get<Position>(`positions/${id}`);
  return response.data;
};

export const updatePosition = async (
  id: number,
  data: UpdatePositionRequest
) => {
  const response = await axiosInstance.put<Position>(`positions/${id}`, data);
  return response.data;
};

export const deletePosition = async (id: number) => {
  const response = await axiosInstance.delete(`positions/${id}`);
  return response.data;
};
