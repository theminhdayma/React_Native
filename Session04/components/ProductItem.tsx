import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export interface Product {
  id: string;
  name: string;
  price: number;
}

interface ProductItemProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductItem({
  product,
  onAddToCart,
}: ProductItemProps) {
  return (
    <View style={styles.productItem}>
      <View>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>
          {product.price.toLocaleString("vi-VN")}đ
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onAddToCart(product)}
      >
        <Text style={styles.buttonText}>THÊM VÀO GIỎ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  productItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  productName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  productPrice: {
    marginTop: 4,
    color: "#555",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#007bff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});
