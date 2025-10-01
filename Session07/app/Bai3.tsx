import React, { useRef } from "react";
import { Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
export default function FocusTextInputScreen() {
  const inputRef = useRef<TextInput>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Ô nhập liệu:</Text>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Nhập gì đó..."
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.button} onPress={handleFocus}>
        <Text style={styles.buttonText}>FOCUS VÀO Ô NHẬP LIỆU</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafbfc", padding: 16 },
  label: { fontSize: 16, marginBottom: 7, color: "#1a1a1a" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 22,
  },
  button: {
    backgroundColor: "#2196f3",
    borderRadius: 4,
    alignItems: "center",
    paddingVertical: 13,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.5,
  },
});
