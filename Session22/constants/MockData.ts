import { Task, TaskPriority, TaskStatus } from "../types";

export const MOCK_TASKS: Task[] = [
  {
    id: "1",
    name: "Hoàn thành báo cáo dự án A",
    priority: TaskPriority.High,
    status: TaskStatus.Pending,
    description:
      "Viết báo cáo tổng kết dự án A, bao gồm các chỉ số KPI và đánh giá rủi ro.",
  },
  {
    id: "2",
    name: "Fix bug UI màn hình Login",
    priority: TaskPriority.Medium,
    status: TaskStatus.Pending,
    description:
      'Nút "Quên mật khẩu" đang bị lệch trên các thiết bị Android cũ.',
  },
  {
    id: "3V",
    name: "Họp team hàng tuần",
    priority: TaskPriority.Low,
    status: TaskStatus.Completed,
    description: "Họp online qua Google Meet lúc 10:00 AM thứ 2.",
  },
  {
    id: "4",
    name: "Nâng cấp server database",
    priority: TaskPriority.High,
    status: TaskStatus.Pending,
    description: "Lên kế hoạch và thực hiện nâng cấp server vào cuối tuần.",
  },
];
