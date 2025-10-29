export enum TaskPriority {
  High = "Cao",
  Medium = "Trung bình",
  Low = "Thấp",
}

export enum TaskStatus {
  Pending = "Đang chờ",
  Completed = "Hoàn thành",
}

export interface Task {
  id: string;
  name: string;
  priority: TaskPriority;
  status: TaskStatus;
  description: string;
}

export interface TaskFormData {
  name: string;
  priority: TaskPriority;
  description: string;
}
