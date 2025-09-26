import { FormData } from "@/app/Ex9";
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface StepProps {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string) => void;
}

export default function Step1({ formData, handleInputChange }: StepProps) {
  return (
    <View>
      <Text style={styles.stepTitle}>Bước 1: Thông tin cá nhân</Text>
      <TextInput
        style={styles.input}
        placeholder="Họ và tên"
        value={formData.name}
        onChangeText={(value) => handleInputChange("name", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tuổi"
        keyboardType="number-pad"
        value={formData.age}
        onChangeText={(value) => handleInputChange("age", value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  stepTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
