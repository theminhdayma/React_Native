import React, { useReducer, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Todo {
  id: string;
  name: string;
  completed: boolean;
}

type Action =
  | { type: "ADD_TODO"; name: string }
  | { type: "TOGGLE_TODO"; id: string }
  | { type: "DELETE_TODO"; id: string };

function todoReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "ADD_TODO":
      if (!action.name.trim()) return state;
      return [
        ...state,
        { id: Date.now().toString(), name: action.name, completed: false },
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
}

export default function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [text, setText] = useState("");
  const inputRef = useRef<TextInput>(null);

  const onAdd = () => {
    dispatch({ type: "ADD_TODO", name: text });
    setText("");
    inputRef.current?.clear();
  };

  const renderItem = ({ item }: { item: Todo }) => (
    <View style={styles.item}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => dispatch({ type: "TOGGLE_TODO", id: item.id })}
      >
        <Text style={[styles.itemText, item.completed && styles.completedText]}>
          {item.name}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => dispatch({ type: "DELETE_TODO", id: item.id })}
      >
        <Text style={styles.delete}>❌</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Trang chủ</Text>
      <View style={styles.inputRow}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Thêm công việc mới..."
          value={text}
          onChangeText={setText}
          onSubmitEditing={onAdd}
        />
        <TouchableOpacity style={styles.addButton} onPress={onAdd}>
          <Text style={{ color: "white", fontWeight: "bold" }}>THÊM</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ marginTop: 10, paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafbfc" },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 16,
    marginBottom: 8,
    color: "#222",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: "#2196f3",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 2,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginHorizontal: 8,
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 15,
    elevation: 1,
  },
  itemText: {
    fontSize: 16,
    color: "#222",
  },
  completedText: {
    color: "#bbb",
    textDecorationLine: "line-through",
  },
  delete: {
    fontSize: 26,
    color: "#ef4444",
    marginLeft: 12,
  },
});
