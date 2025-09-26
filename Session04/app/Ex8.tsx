// File: Ex8.tsx
import ProductItem, { Product } from "@/components/ProductItem";
import React, { useState, useMemo } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CartItem extends Product {
  quantity: number;
}

// Dữ liệu sản phẩm (có thể lấy từ API)
const DUMMY_PRODUCTS: Product[] = [
  { id: "1", name: "iPhone 15 Pro", price: 25000000 },
  { id: "2", name: "MacBook Air M3", price: 32000000 },
  { id: "3", name: "Apple Watch Series 9", price: 11000000 },
  { id: "4", name: "AirPods Pro 2", price: 6000000 },
];

export default function Ex8() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (productToAdd: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productToAdd.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  const totalQuantity = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Số mặt hàng trong giỏ: {totalQuantity}
        </Text>
      </View>
      <FlatList
        data={DUMMY_PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductItem product={item} onAddToCart={handleAddToCart} />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  listContainer: {
    paddingTop: 12,
  },
});
