import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import TaskListItem from "../../../components/TaskListItem";
import { Task, TaskPriority, TaskStatus } from "../../../types";
import { taskApi } from "../../../services/taskApi";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export default function TaskListScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  // State dữ liệu thật và modal
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  // Thêm nút "Thêm mới" (+) vào header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => router.push("/(tabs)/(tasks)/add")}>
          <Ionicons
            name="add-circle"
            size={30}
            color="#007AFF"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, router]);

  const mapPriority = (p: "HIGH" | "MEDIUM" | "LOW"): TaskPriority => {
    switch (p) {
      case "HIGH":
        return TaskPriority.High;
      case "MEDIUM":
        return TaskPriority.Medium;
      default:
        return TaskPriority.Low;
    }
  };

  const mapPriorityToApi = (p: TaskPriority): "HIGH" | "MEDIUM" | "LOW" => {
    switch (p) {
      case TaskPriority.High:
        return "HIGH";
      case TaskPriority.Medium:
        return "MEDIUM";
      default:
        return "LOW";
    }
  };

  // Tải danh sách từ API
  const load = async () => {
    const data = await taskApi.all();
    // Map API -> UI types
    const mapped: Task[] = data.map((t) => ({
      id: String(t.id),
      name: t.name,
      priority: mapPriority(t.priority),
      status:
        t.status === "COMPLETED" ? TaskStatus.Completed : TaskStatus.Pending,
      description: t.description || "",
    }));
    setTasks(mapped);
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  const handleToggleStatus = async (id: string) => {
    const current = tasks.find((t) => t.id === id);
    if (!current) return;
    const next =
      current.status === TaskStatus.Completed ? "PENDING" : "COMPLETED";
    await taskApi.patchStatus(id, next as any);
    load();
  };

  const openDeleteModal = (id: string) => {
    setSelectedTaskId(id);
    setModalVisible(true);
  };

  const handleDeleteTask = async () => {
    if (selectedTaskId) {
      await taskApi.remove(selectedTaskId);
      await load();
    }
    setModalVisible(false);
    setSelectedTaskId(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskListItem
            task={item}
            onToggleStatus={handleToggleStatus}
            onDelete={openDeleteModal}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Modal xác nhận xóa */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Bạn có chắc chắn muốn xóa công việc này?
            </Text>
            <View style={styles.modalButtons}>
              <Button title="Hủy" onPress={() => setModalVisible(false)} />
              <Pressable style={styles.deleteButton} onPress={handleDeleteTask}>
                <Text style={styles.deleteButtonText}>Xóa</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ... (Styles cho màn hình List và Modal)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f8",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
    marginLeft: 15,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
