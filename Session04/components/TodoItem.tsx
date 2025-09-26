import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export interface Todo {
  id: string;
  text: string;
}

interface TodoItemProps {
  item: Todo;
  onDelete: (id: string) => void;
}

export default function TodoItem({ item, onDelete }: TodoItemProps) {
  return (
    <View style={styles.todoItem}>
      <Text style={styles.todoText}>{item.text}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
      >
        <Text style={styles.deleteButtonText}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  deleteButton: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
