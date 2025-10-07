import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ProductCard2 from "../../components/ProductCard2";
import { getProducts, removeProduct } from "../../storage/productStorage";
import { Product2 } from "../../types/Product";

export default function ProductListScreen() {
  const [data, setData] = React.useState<Product2[]>([]);
  const router = useRouter();

  async function reload() {
    setData(await getProducts());
  }

  useFocusEffect(
    React.useCallback(() => {
      reload();
    }, [])
  );

  function confirmDelete(id: string) {
    Alert.alert("Xóa sản phẩm", "Bạn có chắc chắn muốn xóa sản phẩm này?", [
      { text: "HỦY", style: "cancel" },
      {
        text: "XÓA",
        style: "destructive",
        onPress: async () => {
          await removeProduct(id);
          reload();
        },
      },
    ]);
  }
  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "#f5f5f5" }}>
      <View style={styles.header}>
        <Text style={styles.title}>Danh sách Sản phẩm</Text>
        <TouchableOpacity onPress={() => router.push("/products/new")}>
          <Ionicons name="add-circle" size={30} color="#10ad3c" />
        </TouchableOpacity>
      </View>
      {data.length === 0 ? (
        <View style={styles.empty}>
          <Text>Chưa có sản phẩm nào.</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard2
              product={item}
              onPress={() => router.push(`/products/${item.id}`)}
              onEdit={() =>
                router.push({ pathname: `/products/edit/${item.id}` })
              }
              onDelete={() => confirmDelete(item.id)}
            />
          )}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  title: { fontSize: 19, fontWeight: "700" },
  empty: { flex: 1, alignItems: "center", justifyContent: "center" },
});
