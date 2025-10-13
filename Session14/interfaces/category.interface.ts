import { Status } from "../enums/status.enum";

export interface Category {
  id: number;
  categoryName: string;
  categoryDescription: string;
  categoryStatus: Status;
  createdAt: string;
}
