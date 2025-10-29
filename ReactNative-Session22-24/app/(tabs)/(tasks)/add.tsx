import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import TaskForm from "../../../components/TaskForm";
import { TaskFormData, TaskPriority } from "../../../types";
import { taskApi } from "../../../services/taskApi";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Tên công việc là bắt buộc")
    .min(3, "Tên phải có ít nhất 3 ký tự"),
  priority: yup.string().oneOf(Object.values(TaskPriority)).required(),
  description: yup.string().optional(),
});

export default function AddTaskScreen() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      priority: TaskPriority.Medium,
      description: "",
    },
  });

  const onSubmit = async (data: TaskFormData) => {
    await taskApi.create({
      name: data.name,
      priority:
        data.priority === TaskPriority.High
          ? "HIGH"
          : data.priority === TaskPriority.Medium
          ? "MEDIUM"
          : "LOW",
      description: data.description || "",
    });
    router.back();
  };

  return (
    <TaskForm
      control={control}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}
