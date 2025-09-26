import TodoItem, { Todo } from "@/components/TodoItem";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
  ListRenderItem,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Ex6() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", text: "Update API Register" },
    { id: "2", text: "Create API Login" },
    { id: "3", text: "Learn HTML, CSS" },
  ]);
  const [text, setText] = useState<string>("");

  const handleAddTodo = () => {
    if (text.trim() === "") return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text,
    };
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
    setText("");
    Keyboard.dismiss();
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const renderTodoItem: ListRenderItem<Todo> = ({ item }) => (
    <TodoItem item={item} onDelete={handleDeleteTodo} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập ghi chú mới..."
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.addButtonText}>THÊM</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={renderTodoItem}
        style={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Chưa có ghi chú nào.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f2f5",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  addButton: {
    backgroundColor: "#007bff",
    marginLeft: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  list: {
    paddingHorizontal: 16,
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 50,
    fontSize: 16,
  },
});
