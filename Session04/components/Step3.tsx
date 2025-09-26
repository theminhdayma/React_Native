import { FormData } from "@/app/Ex9";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface StepProps {
  formData: FormData;
}

export default function Step3({ formData }: StepProps) {
  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.stepTitle}>Bước 3: Xác nhận thông tin</Text>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Họ tên:</Text>
        <Text style={styles.value}>{formData.name}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Tuổi:</Text>
        <Text style={styles.value}>{formData.age}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Điện thoại:</Text>
        <Text style={styles.value}>{formData.phone}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Địa chỉ:</Text>
        <Text style={styles.value}>{formData.address}</Text>
      </View>
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
  summaryContainer: { padding: 10, backgroundColor: "white", borderRadius: 8 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  label: { fontSize: 16, color: "#666" },
  value: { fontSize: 16, fontWeight: "bold", color: "#333" },
});
