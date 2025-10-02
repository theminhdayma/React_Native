import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Bai1() {
  const [name, setName] = useState("");
  const [savedName, setSavedName] = useState("");

  useEffect(() => {
    const loadName = async () => {
      const value = await AsyncStorage.getItem("userName");
      if (value) setSavedName(value);
    };
    loadName();
  }, []);

  const handleSave = async () => {
    if (name) {
      await AsyncStorage.setItem("userName", name);
      setSavedName(name);
    }
  };

  if (savedName) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Chào mừng trở lại, {savedName}!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nhập tên của bạn:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ví dụ: An Nguyễn"
        value={name}
        onChangeText={setName}
      />
      <Button title="LƯU" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  label: { fontSize: 18, marginBottom: 8 },
  input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 16 },
  welcome: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
});
