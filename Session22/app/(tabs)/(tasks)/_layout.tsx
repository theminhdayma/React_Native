import { Stack } from "expo-router";
import React from "react";

export default function TaskStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Danh sách Công việc" }} />
      <Stack.Screen name="[id]" options={{ title: "Chi tiết Công việc" }} />
      <Stack.Screen
        name="add"
        options={{ title: "Thêm mới Công việc", presentation: "modal" }}
      />
      <Stack.Screen
        name="edit"
        options={{ title: "Chỉnh sửa Công việc", presentation: "modal" }}
      />
    </Stack>
  );
}
