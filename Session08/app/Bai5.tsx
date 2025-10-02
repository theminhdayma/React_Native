import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newText, setNewText] = useState("");

  useEffect(() => {
    const loadTodos = async () => {
      const value = await AsyncStorage.getItem("todos");
      if (value) setTodos(JSON.parse(value));
    };
    loadTodos();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!newText.trim()) return;
    setTodos([...todos, { id: Date.now(), text: newText, completed: false }]);
    setNewText("");
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Thêm công việc mới..."
          value={newText}
          onChangeText={setNewText}
        />
        <Button title="THÊM" onPress={addTodo} />
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item.text}</Text>
            <TouchableOpacity onPress={() => removeTodo(item.id)}>
              <Text style={styles.removeBtn}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Không có công việc nào.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 12, paddingTop: 40 },
  inputRow: { flexDirection: "row", marginBottom: 16 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 6,
    marginRight: 8,
    padding: 10,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fafafa",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  todoText: { fontSize: 18 },
  removeBtn: { fontSize: 28, color: "red", paddingLeft: 20 },
  empty: { textAlign: "center", color: "#bbb", marginTop: 30 },
});
