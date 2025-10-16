import {
  getCarts,
  updateQuantityCart,
  deleteCartItem,
  deleteAllCart,
} from "@/apis/cart.api";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartItem } from "@/types/cart";

interface CartItemProps extends CartItem {
  onUpdateQuantity: (
    action: "increase" | "decrease",
    cartItemId: number
  ) => void;
  onDeleteItem: (cartItemId: number) => void;
}

const CartItem: React.FC<{ item: CartItemProps }> = ({ item }) => (
  <View style={styles.itemContainer}>
    <Image
      source={{ uri: item.productImage }}
      style={styles.itemImage}
      resizeMode="contain"
    />
    <View style={styles.itemDetails}>
      <Text style={styles.itemName} numberOfLines={2}>
        {item.productName}
      </Text>
      <Text style={styles.itemPrice}>
        {item.price.toLocaleString("vi-VN")} VNĐ
      </Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() => item.onUpdateQuantity("decrease", item.id)}
        >
          <Ionicons name="remove-circle-outline" size={28} color="#555" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          onPress={() => item.onUpdateQuantity("increase", item.id)}
        >
          <Ionicons name="add-circle-outline" size={28} color="#555" />
        </TouchableOpacity>
      </View>
    </View>
    <TouchableOpacity onPress={() => item.onDeleteItem(item.id)}>
      <Ionicons name="trash-outline" size={24} color="#e53e3e" />
    </TouchableOpacity>
  </View>
);

const CartSummary = ({ totalPrice }: { totalPrice: number }) => (
  <View style={styles.summaryContainer}>
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>Tạm tính</Text>
      <Text style={styles.summaryValue}>
        {totalPrice.toLocaleString("vi-VN")} VNĐ
      </Text>
    </View>
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>Phí vận chuyển</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.textInput}
        placeholder="0 VNĐ"
      />
    </View>
    <View style={styles.separator} />
    <View style={styles.summaryRow}>
      <Text style={styles.totalLabel}>Tổng cộng</Text>
      <Text style={styles.totalValue}>
        {totalPrice.toLocaleString("vi-VN")} VNĐ
      </Text>
    </View>
  </View>
);

export default function CartScreen() {
  const queryClient = useQueryClient();

  const {
    data: cartResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["carts"],
    queryFn: getCarts,
  });

  const { mutate: updateQuantity } = useMutation({
    mutationFn: updateQuantityCart,
    onMutate: async (newData: { id: number; quantity: number }) => {
      await queryClient.cancelQueries({ queryKey: ["carts"] });
      const previousCart = queryClient.getQueryData(["carts"]);
      queryClient.setQueryData(["carts"], (old: any) => {
        if (!old?.data?.cartItems) return old;
        const updatedCartItems = old.data.cartItems.map((item: CartItem) =>
          item.id === newData.id
            ? { ...item, quantity: newData.quantity }
            : item
        );
        const newTotalAmount = updatedCartItems.reduce(
          (acc: any, item: CartItem) => acc + item.price * item.quantity,
          0
        );
        return {
          ...old,
          data: {
            ...old.data,
            cartItems: updatedCartItems,
            totalAmount: newTotalAmount,
          },
        };
      });
      return { previousCart };
    },
    onError: (error: any, newData, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["carts"], context.previousCart);
      }
      Alert.alert("Lỗi", error.message || "Cập nhật thất bại!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      Alert.alert("Thành công", "Đã xóa sản phẩm khỏi giỏ hàng.");
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: () => {
      Alert.alert("Lỗi", "Xóa sản phẩm thất bại!");
    },
  });

  const { mutate: deleteAllItems } = useMutation({
    mutationFn: deleteAllCart,
    onSuccess: () => {
      Alert.alert("Thành công", "Đã xóa tất cả sản phẩm khỏi giỏ hàng.");
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: () => {
      Alert.alert("Lỗi", "Xóa tất cả sản phẩm thất bại!");
    },
  });

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }
  if (isError) {
    return (
      <Text style={{ textAlign: "center", marginTop: 50 }}>
        Đã có lỗi xảy ra.
      </Text>
    );
  }

  const handleUpdateQuantity = (
    action: "increase" | "decrease",
    cartItemId: number
  ) => {
    const item = cartItems.find((item: CartItem) => item.id === cartItemId);
    if (!item) return;

    let newQuantity =
      action === "increase" ? item.quantity + 1 : item.quantity - 1;

    if (newQuantity < 1) {
      handleDeleteItem(cartItemId);
      return;
    }
    updateQuantity({ id: cartItemId, quantity: newQuantity });
  };

  const handleDeleteItem = (cartItemId: number) => {
    Alert.alert(
      "Xóa sản phẩm",
      "Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          onPress: () => deleteItem(cartItemId),
          style: "destructive",
        },
      ]
    );
  };

  const handleDeleteAll = () => {
    Alert.alert(
      "Xóa sản phẩm",
      "Bạn có chắc muốn xóa tất cả sản phẩm này khỏi giỏ hàng?",
      [
        { text: "Hủy", style: "cancel" },
        { text: "Xóa", onPress: () => deleteAllItems(), style: "destructive" },
      ]
    );
  };

  const cartItems = cartResponse?.data?.cartItems ?? [];
  const totalPrice = cartResponse?.data?.totalAmount ?? 0;

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Giỏ hàng của bạn" }} />

      <TouchableOpacity style={styles.buttonClear} onPress={handleDeleteAll}>
        <Text style={styles.text}>Xóa tất cả</Text>
      </TouchableOpacity>

      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <CartItem
            item={{
              ...item,
              onUpdateQuantity: handleUpdateQuantity,
              onDeleteItem: handleDeleteItem,
            }}
          />
        )}
        keyExtractor={(item) => String(item.id)}
        ListFooterComponent={<CartSummary totalPrice={totalPrice} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" }, // CartItem styles
  itemContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    alignItems: "center",
  },
  itemImage: { width: 80, height: 80, borderRadius: 8 },
  itemDetails: { flex: 1, marginLeft: 15, justifyContent: "space-between" },
  itemName: { fontSize: 16, fontWeight: "600" },
  itemPrice: { fontSize: 16, fontWeight: "bold", color: "#e53e3e" },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  quantityText: { fontSize: 18, fontWeight: "bold", marginHorizontal: 15 }, // Summary styles
  summaryContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: "#fafafa",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  summaryLabel: { fontSize: 16, color: "#666" },
  summaryValue: { fontSize: 16, fontWeight: "500" },
  separator: { height: 1, backgroundColor: "#e0e0e0", marginVertical: 10 },
  totalLabel: { fontSize: 18, fontWeight: "bold" },
  totalValue: { fontSize: 18, fontWeight: "bold", color: "#e53e3e" }, // Empty state styles
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
  emptyText: { marginTop: 10, fontSize: 16, color: "#888" },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: 150,
    height: 32,
    paddingHorizontal: 10,
    paddingVertical: 4,
    color: "#333",
  },
  buttonClear: {
    backgroundColor: "red",
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});
