import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Product {
  productId: string;
  name: string;
}

interface CartItem extends Product {
  quantity: number;
}

const PRODUCTS: Product[] = [
  { productId: "a1", name: "Laptop Pro" },
  { productId: "b2", name: "Chuột không dây" },
  { productId: "c3", name: "Bàn phím cơ" },
];

const CART_KEY = "cart";

export default function ProductScreen() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      const value = await AsyncStorage.getItem(CART_KEY);
      if (value) setCart(JSON.parse(value));
    };
    fetchCart();
  }, []);

  const addToCart = async (product: Product) => {
    let cartData = await AsyncStorage.getItem(CART_KEY);
    let currentCart: CartItem[] = cartData ? JSON.parse(cartData) : [];

    const index = currentCart.findIndex(
      (item) => item.productId === product.productId
    );

    if (index !== -1) {
      currentCart[index].quantity += 1;
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }

    await AsyncStorage.setItem(CART_KEY, JSON.stringify(currentCart));
    setCart(currentCart);

    Alert.alert("Thành công", `Đã thêm "${product.name}" vào giỏ!`);
  };

  const renderCart = () => {
    if (cart.length === 0)
      return <Text style={{ color: "#888" }}>Giỏ hàng trống.</Text>;
    return (
      <View>
        <Text style={{ fontWeight: "bold" }}>Giỏ hàng của bạn</Text>
        <FlatList
          data={cart}
          keyExtractor={(item) => item.productId}
          renderItem={({ item }) => (
            <Text>
              - {item.name} (Số lượng: {item.quantity})
            </Text>
          )}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng của bạn</Text>
      {renderCart()}
      <Text style={styles.section}>Danh sách sản phẩm</Text>
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <View style={styles.productRow}>
            <Text style={styles.productName}>{item.name}</Text>
            <Button title="THÊM VÀO GIỎ" onPress={() => addToCart(item)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16, paddingTop: 40 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  section: { fontWeight: "bold", fontSize: 18, marginVertical: 16 },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafafa",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    justifyContent: "space-between",
  },
  productName: { fontSize: 16 },
});
