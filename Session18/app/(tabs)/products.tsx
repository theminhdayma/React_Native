import { addProductToCart, getCarts } from "@/apis/cart.api";
import { getAllProducts } from "@/apis/product.api";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductCardProps } from "@/types/cart";

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: cartData } = useQuery({
    queryKey: ["carts"],
    queryFn: getCarts,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: addProductToCart,
    onSuccess: () => {
      Alert.alert("Thành công", "Đã thêm sản phẩm vào giỏ hàng!");
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: (error) => {
      Alert.alert("Lỗi", "Thêm sản phẩm thất bại: " + error.message);
    },
  });

  const handleAddToCart = (productId: string) => {
    const cartItems = cartData?.data?.cartItems ?? [];
    if (!cartData) return;

    const numericProductId = Number(productId);
    const existingItem = cartItems.find(
      (cartItem: any) => cartItem.productId === numericProductId
    );

    const currentQuantity = existingItem ? existingItem.quantity : 0;

    const payload = {
      productId: numericProductId,
      quantity: 1,
    };

    mutate(payload);
  };

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: item.images[0]?.url }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text
        onPress={() =>
          router.push({
            pathname: "/product-detail",
            params: { id: item.id },
          })
        }
        style={styles.title}
        numberOfLines={2}
      >
        {item?.productName}
      </Text>
      <Text style={styles.price}>{item.price.toLocaleString("vi-VN")} VNĐ</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddToCart(item.id.toString())}
      >
        <Ionicons name="add" size={20} color="white" />
        <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function ProductsScreen() {
  const queryClient = useQueryClient();
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  if (isLoading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (isError) {
    return <Text>Đã có lỗi xảy ra khi tải dữ liệu.</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Cửa hàng" }} />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text>Danh sách trống!</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  listContainer: { padding: 8 },
  card: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 8,
    padding: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: { width: "100%", height: 120, marginBottom: 10 },
  title: { fontSize: 14, fontWeight: "600", textAlign: "center", height: 40 },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e53e3e",
    marginVertical: 8,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  addButtonText: { color: "white", fontWeight: "bold", marginLeft: 4 },
});
