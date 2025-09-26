import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  FlatList,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";

interface Product {
  id: string;
  name: string;
  category: "Điện tử" | "Thời trang" | "Gia dụng";
  inStock: boolean;
}

const ALL_PRODUCTS: Product[] = [
  { id: "1", name: "iPhone 15 Pro", category: "Điện tử", inStock: true },
  { id: "2", name: "MacBook Air M3", category: "Điện tử", inStock: true },
  {
    id: "3",
    name: "Tai nghe Sony WH-1000XM5",
    category: "Điện tử",
    inStock: true,
  },
  { id: "4", name: "Áo thun nam", category: "Thời trang", inStock: true },
  { id: "5", name: "Quần Jeans nữ", category: "Thời trang", inStock: false },
  {
    id: "6",
    name: "Nồi chiên không dầu",
    category: "Gia dụng",
    inStock: false,
  },
  { id: "7", name: "Máy lọc không khí", category: "Gia dụng", inStock: true },
];

const CATEGORIES = ["Tất cả", "Điện tử", "Thời trang", "Gia dụng"];

export default function Ex10() {
  const [searchText, setSearchText] = useState("");
  const [isStockOnly, setIsStockOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      if (isStockOnly && !product.inStock) {
        return false;
      }
      if (
        selectedCategory !== "Tất cả" &&
        product.category !== selectedCategory
      ) {
        return false;
      }
      if (
        searchText &&
        !product.name.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [searchText, isStockOnly, selectedCategory]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filtersContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm theo tên sản phẩm..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <View style={styles.switchContainer}>
          <Text style={styles.filterLabel}>
            Chỉ hiển thị hàng còn trong kho
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isStockOnly ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={setIsStockOnly}
            value={isStockOnly}
          />
        </View>
        <View style={styles.pickerWrapper}>
          <Text style={styles.filterLabel}>Lọc theo danh mục:</Text>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            style={styles.picker}
          >
            {CATEGORIES.map((category) => (
              <Picker.Item label={category} value={category} key={category} />
            ))}
          </Picker>
        </View>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productCategory}>{item.category}</Text>
            <Text
              style={[
                styles.stockStatus,
                { color: item.inStock ? "#28a745" : "#dc3545" },
              ]}
            >
              {item.inStock ? "Còn hàng" : "Hết hàng"}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không tìm thấy sản phẩm nào.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f0f2f5"
    },
  filtersContainer: {
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  searchInput: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  filterLabel: { fontSize: 16 },
  pickerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  picker: { flex: 1 },
  listContainer: { padding: 16 },
  productItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  productName: { fontSize: 18, fontWeight: "bold" },
  productCategory: { fontSize: 14, color: "#666", marginTop: 4 },
  stockStatus: { fontSize: 14, fontWeight: "bold", marginTop: 8 },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#666",
  },
});
