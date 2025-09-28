import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface BusinessCardProps {
  avatarUrl: string;
  name: string;
  jobTitle: string;
  contactInfo: string;
}

export default function BusinessCard({ avatarUrl, name, jobTitle, contactInfo }: BusinessCardProps) {
  return (
    <View style={styles.card}>
      <Image style={styles.avatar} source={{ uri: avatarUrl }} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.title}>{jobTitle}</Text>
      <Text style={styles.contact}>{contactInfo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  card: {
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#38bdf8",
    padding: 24,
    marginVertical: 12,
    width: 300,
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