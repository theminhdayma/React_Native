import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { PRODUCTS } from "../../data/products";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../../context/CartContext";

export default function ProductDetailScreen() {
  const navigation = useNavigation();
  const { addToCart, cartItems } = useCart();
  const { params } = useRoute();
  const product = PRODUCTS.find((p) => p.id === (params as any).id);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Product Detail",
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Cart" as never)}
          style={{ marginRight: 12 }}
        >
          <Text>
            <Ionicons name="cart" size={24} color="#1976d2" />
          </Text>
          {cartItems.length > 0 && (
            <View
              style={{
                backgroundColor: "#e53935",
                borderRadius: 10,
                paddingHorizontal: 5,
                position: "absolute",
                top: -6,
                right: -10,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 13 }}>
                {cartItems.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, cartItems.length]);

  if (!product) return null;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.img} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.caption}>Description</Text>
      <Text style={{ fontSize: 14, color: "#444", marginBottom: 24 }}>
        {product.description}
      </Text>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => addToCart(product)}
      >
        <Text style={styles.addBtnText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  img: { width: 320, height: 200, borderRadius: 14, marginBottom: 16 },
  name: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  price: {
    fontSize: 16,
    color: "#1976d2",
    fontWeight: "bold",
    marginBottom: 8,
  },
  caption: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  addBtn: {
    backgroundColor: "#1976d2",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 18,
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
  },
});
