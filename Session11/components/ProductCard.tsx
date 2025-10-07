import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Product } from "../types/Product";

interface Props {
  item: Product;
  onPress: () => void;
  children?: React.ReactNode;
}

export default function ProductCard({ item, onPress, children }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.img} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    margin: 8,
    alignItems: "center",
    width: 160,
    elevation: 2,
  },
  img: { width: 120, height: 90, borderRadius: 8, marginBottom: 8 },
  name: { fontWeight: "700", fontSize: 16 },
  price: {
    color: "#1976d2",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 8,
  },
});
