import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TodoList() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks(prevTasks => [...prevTasks, task.trim()]);
    setTask("");
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
          <Text key={index} style={styles.taskText}>{item}</Text>
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
  taskText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
