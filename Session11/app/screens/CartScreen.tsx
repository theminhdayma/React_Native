import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useCart } from "../../context/CartContext";
import { Ionicons } from "@expo/vector-icons";

export default function CartScreen() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const total = cartItems.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(i) => i.product.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image source={{ uri: item.product.image }} style={styles.img} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.product.name}</Text>
              <Text style={styles.price}>${item.product.price}</Text>
            </View>
            <View style={styles.qntControl}>
              <TouchableOpacity
                onPress={() => updateQuantity(item.product.id, -1)}
              >
                <Ionicons name="remove-outline" size={24} color="#444" />
              </TouchableOpacity>
              <Text style={styles.qnt}>{item.quantity}</Text>
              <TouchableOpacity
                onPress={() => updateQuantity(item.product.id, 1)}
              >
                <Ionicons name="add-outline" size={24} color="#444" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => removeFromCart(item.product.id)}
              style={{ marginLeft: 8 }}
            >
              <Ionicons name="trash" size={20} color="#d32f2f" />
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  img: { width: 70, height: 70, borderRadius: 8, marginRight: 10 },
  name: { fontWeight: "bold", fontSize: 16 },
  price: { color: "#1976d2", marginVertical: 2 },
  qntControl: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 12,
    gap: 8,
  },
  qnt: { minWidth: 30, textAlign: "center", fontSize: 18, fontWeight: "bold" },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#f7f7f7",
  },
  totalText: { fontWeight: "bold", fontSize: 18, marginBottom: 12 },
  checkoutBtn: {
    backgroundColor: "#1976d2",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
});
