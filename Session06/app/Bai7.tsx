import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  details: string;
}

const initialData: Product[] = [
  {
    id: "1",
    name: "iPhone 13",
    price: 799,
    description: "Điện thoại thông minh Apple iPhone 13.",
    details: "Màn hình 6.1 inch, camera 12MP, bộ nhớ 128GB.",
  },
  {
    id: "2",
    name: "Samsung Galaxy S21",
    price: 999,
    description: "Điện thoại cao cấp Samsung Galaxy S21.",
    details: "Màn hình 6.2 inch, camera 64MP, bộ nhớ 128GB.",
  },
  {
    id: "3",
    name: "MacBook Pro",
    price: 1299,
    description: "Máy tính xách tay Apple MacBook Pro.",
    details: "Màn hình Retina 13 inch, vi xử lý M1, 256GB SSD.",
  },
  {
    id: "4",
    name: "Dell XPS 13",
    price: 1099,
    description: "Laptop Dell XPS 13 với thiết kế mỏng nhẹ.",
    details: "Màn hình 13 inch, vi xử lý Intel Core i7, 512GB SSD.",
  },
  {
    id: "5",
    name: "Sony WH-1000XM4",
    price: 349,
    description: "Tai nghe Sony WH-1000XM4 chống ồn.",
    details: "Chống ồn chủ động, thời gian sử dụng lên đến 30 giờ.",
  },
  {
    id: "6",
    name: "Apple Watch Series 7",
    price: 399,
    description: "Đồng hồ thông minh Apple Watch Series 7.",
    details: "Màn hình 1.7 inch, GPS, theo dõi sức khoẻ.",
  },
  {
    id: "7",
    name: "iPad Pro",
    price: 799,
    description: "Máy tính bảng Apple iPad Pro.",
    details: "Màn hình 11 inch, chip M1, bộ nhớ 128GB.",
  },
];

const newData = [
  {
    id: "8",
    name: "Google Pixel 6",
    price: 599,
    description: "Điện thoại Google Pixel 6.",
    details: "Màn hình 6.4 inch, camera 50MP, bộ nhớ 128GB.",
  },
  {
    id: "9",
    name: "OnePlus 9 Pro",
    price: 1069,
    description: "Điện thoại OnePlus 9 Pro.",
    details: "Màn hình 6.7 inch, camera 48MP, bộ nhớ 256GB.",
  },
  {
    id: "10",
    name: "Apple AirPods Pro",
    price: 249,
    description: "Tai nghe không dây Apple AirPods Pro.",
    details: "Chống ồn chủ động, thời gian sử dụng lên đến 24 giờ.",
  },
];

export default function ProductListScreen() {
  const [products, setProducts] = useState(initialData);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isLoadedAll, setIsLoadedAll] = useState(false);

  const handleLoadMore = () => {
    if (loadingMore || isLoadedAll) return;
    setLoadingMore(true);
    setTimeout(() => {
      setProducts((prev) => [...prev, ...newData]);
      setLoadingMore(false);
      setIsLoadedAll(true);
    }, 1200);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Danh sách sản phẩm</Text>
      <Text style={styles.headerCount}>
        Số lượng sản phẩm: {products.length}
      </Text>
    </View>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={{ paddingVertical: 18 }}>
        <ActivityIndicator size="small" color="#43a047" />
        <Text style={styles.loadingText}>Đang tải thêm...</Text>
      </View>
    );
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      <Text style={styles.productDesc}>{item.description}</Text>
      <Text style={styles.productDetails}>{item.details}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.15}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8faf8" },
  header: {
    backgroundColor: "#4caf50",
    borderRadius: 9,
    margin: 10,
    padding: 17,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 6,
  },
  headerCount: {
    color: "#e6ffe6",
    fontSize: 15,
  },
  card: {
    backgroundColor: "white",
    padding: 14,
    marginHorizontal: 10,
    marginBottom: 13,
    borderRadius: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  productName: {
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 2,
  },
  productPrice: {
    color: "#43a047",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 2,
  },
  productDesc: {
    fontSize: 13,
    color: "#555",
    marginBottom: 2,
  },
  productDetails: {
    color: "#888",
    fontSize: 12,
    marginTop: 3,
  },
  loadingText: {
    marginTop: 6,
    textAlign: "center",
    color: "#43a047",
    fontSize: 12,
  },
});
