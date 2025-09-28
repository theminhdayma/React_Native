import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BusinessCard() {
  return (
    <SafeAreaView style={styles.card}>
      <Image
        style={styles.avatar}
        source={{ uri: "https://i.pravatar.cc/150" }}
      />
      <Text style={styles.name}>Nguyễn Thế Minh</Text>
      <Text style={styles.title}>Lập trình viên React Native</Text>
      <Text style={styles.contact}>SĐT: 0364577211</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#38bdf8",
    padding: 24,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2,
    borderColor: "#0ea5e9",
    marginBottom: 14,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#0f172a",
  },
  title: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 6,
  },
  contact: {
    fontSize: 15,
    color: "#0891b2",
  },
});
