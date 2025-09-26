import { FormData } from "@/app/Ex9";
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface StepProps {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string) => void;
}

export default function Step2({ formData, handleInputChange }: StepProps) {
  return (
    <View>
      <Text style={styles.stepTitle}>Bước 2: Thông tin liên hệ</Text>
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        keyboardType="phone-pad"
        value={formData.phone}
        onChangeText={(value) => handleInputChange("phone", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Địa chỉ"
        value={formData.address}
        onChangeText={(value) => handleInputChange("address", value)}
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
