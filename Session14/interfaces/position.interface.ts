import { Status } from "../enums/status.enum";
export interface Position {
  id: number;
  positionName: string;
  positionStatus: Status;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePositionRequest {
  positionName: string;
  positionStatus: Status;
  description: string;
}

export interface UpdatePositionRequest {
  positionName?: string;
  positionStatus?: Status;
  description?: string;
}

export interface SearchPositionRequest {
  keyword?: string;
  currentPage: number;
  pageSize: number;
}
