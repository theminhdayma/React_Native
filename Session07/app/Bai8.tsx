import React, { useState, useEffect } from "react";
import { TextInput, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function SearchExample() {
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce<string>(searchText, 500);

  React.useEffect(() => {
    if (debouncedSearchText) {
      console.log("Gọi API tìm kiếm với:", debouncedSearchText);
    }
  }, [debouncedSearchText]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Tìm kiếm:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập từ khóa..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <Text style={styles.info}>Đang tìm kiếm: {debouncedSearchText}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f7f7f7" },
  label: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    backgroundColor: "white",
    padding: 13,
    fontSize: 16,
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  info: { marginTop: 20, fontSize: 16, color: "#555" },
});
