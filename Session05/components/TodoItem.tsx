import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface TodoItemProps {
  task: string;
  onDelete: () => void;
}

export default function TodoItem({ task, onDelete }: TodoItemProps) {
  return (
    <View style={styles.todoItem}>
      <Text style={styles.taskText}>{task}</Text>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: "#e53935",
    borderRadius: 4,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
