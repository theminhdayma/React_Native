import TodoItem from "@/components/TodoItem";
import React, { useState } from "react";
import { View, TextInput, Button, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Bai7() {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks(prevTasks => [...prevTasks, task.trim()]);
    setTask("");
  };

  const deleteTask = (indexToDelete: number) => {
    setTasks(prevTasks => prevTasks.filter((_, index) => index !== indexToDelete));
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập công việc mới"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Thêm" onPress={addTask} />

      <ScrollView style={styles.list}>
        {tasks.map((item, index) => (
          <TodoItem key={index} task={item} onDelete={() => deleteTask(index)} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  list: {
    marginTop: 20,
  },
});
