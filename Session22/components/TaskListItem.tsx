import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { Task, TaskPriority, TaskStatus } from "../types";

interface TaskListItemProps {
  task: Task;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

const getPriorityColor = (priority: TaskPriority) => {
  switch (priority) {
    case TaskPriority.High:
      return "#FF3B30";
    case TaskPriority.Medium:
      return "#FF9500";
    case TaskPriority.Low:
      return "#34C759";
    default:
      return "#8E8E93";
  }
};

const TaskListItem: React.FC<TaskListItemProps> = ({
  task,
  onToggleStatus,
  onDelete,
}) => {
  const router = useRouter();
  const isCompleted = task.status === TaskStatus.Completed;

  const navigateToDetail = () => {
    router.push(`/(tabs)/(tasks)/${task.id}`);
  };

  const navigateToEdit = () => {
    // Chuyển đổi task object thành params string
    const params = {
      id: task.id,
      name: task.name,
      priority: task.priority,
      description: task.description,
    };
    router.push({ pathname: "/(tabs)/(tasks)/edit", params: params });
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isCompleted ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => onToggleStatus(task.id)}
          value={isCompleted}
        />
        <TouchableOpacity
          onPress={navigateToDetail}
          style={styles.textContainer}
        >
          <Text style={[styles.taskName, isCompleted && styles.completedText]}>
            {task.name}
          </Text>
          <Text
            style={[
              styles.priorityText,
              { color: getPriorityColor(task.priority) },
            ]}
          >
            Ưu tiên: {task.priority}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={navigateToEdit} style={styles.actionButton}>
          <Ionicons name="pencil" size={22} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(task.id)}
          style={styles.actionButton}
        >
          <Ionicons name="trash" size={22} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(TaskListItem);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  taskName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#8E8E93",
  },
  priorityText: {
    fontSize: 13,
    marginTop: 2,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
});
