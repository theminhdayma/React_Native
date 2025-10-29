import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import * as yup from "yup";
import TaskForm from "../../../components/TaskForm";
import { TaskFormData, TaskPriority } from "../../../types";
import { taskApi } from "../../../services/taskApi";

// Schema tương tự Add
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Tên công việc là bắt buộc")
    .min(3, "Tên phải có ít nhất 3 ký tự"),
  priority: yup
    .mixed<TaskPriority>()
    .oneOf(Object.values(TaskPriority))
    .required(),
  description: yup.string().optional().nullable(),
});

export default function EditTaskScreen() {
  const router = useRouter();
  const params = useLocalSearchParams() as unknown as TaskFormData & {
    id: string;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: params.name || "",
      priority: params.priority || TaskPriority.Medium,
      description: params.description || "",
    },
  });

  const onSubmit = handleSubmit(async (data: TaskFormData) => {
    await taskApi.update(params.id, {
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
  });

  if (!params.id) {
    return (
      <View>
        <Text>Không tìm thấy công việc.</Text>
      </View>
    );
  }

  return (
    <TaskForm control={control} errors={errors} onSubmit={onSubmit} isEdit />
  );
}
