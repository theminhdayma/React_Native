import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface CurrencyInputProps {
  label: string;
  value: string;
  onAmountChange: (text: string) => void;
}

export default function CurrencyInput({
  label,
  value,
  onAmountChange,
}: CurrencyInputProps) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(value)}
        onChangeText={onAmountChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
  },
});
