import { getProductById } from "@/apis/product.api";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await getProductById(Number(id));
      return response.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (isError) {
    return <Text>Đã có lỗi xảy ra khi tải dữ liệu.</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header tùy chỉnh */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerButton}
        >
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết sản phẩm</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="share-social-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: product.images?.[0]?.url }}
          style={styles.productImage}
        />

        <View style={styles.detailsContainer}>
          {/* Tên và Đánh giá */}
          <Text style={styles.productName}>{product.productName}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" color="#FFC700" size={20} />
            <Text style={styles.ratingText}>
              {product.rating?.rate} ({product.rating?.count?.toLocaleString()}{" "}
              đánh giá)
            </Text>
          </View>

          {/* Mô tả */}
          <Text style={styles.description}>{product.description}</Text>

          {/* Chọn Size */}
          <Text style={styles.sectionTitle}>Dung lượng</Text>
          <View style={styles.sizeContainer}>
            {product.sizes?.map((size: any) => (
              <TouchableOpacity key={size} style={styles.sizeOption}>
                <Text style={styles.sizeText}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.priceLabel}>Giá tiền</Text>
          <Text style={styles.priceValue}>
            {product.price.toLocaleString("vi-VN")} VNĐ
          </Text>
        </View>
        <TouchableOpacity style={styles.addToCartButton}>
          <Ionicons name="cart-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  headerButton: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  productImage: { width: "100%", height: 300, resizeMode: "contain" },
  detailsContainer: { padding: 20 },
  productName: { fontSize: 24, fontWeight: "bold", color: "#222" },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  ratingText: { marginLeft: 8, fontSize: 16, color: "#555" },
  description: {
    fontSize: 16,
    color: "#4A5568",
    lineHeight: 24,
    marginVertical: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  sizeContainer: { flexDirection: "row", marginTop: 10 },
  sizeOption: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  sizeText: { fontSize: 16 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  priceLabel: { fontSize: 16, color: "gray" },
  priceValue: { fontSize: 22, fontWeight: "bold", color: "#e53e3e" },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  addToCartText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
  },
});
