import React from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getProductById, removeProduct } from "../../storage/productStorage";
import ProductStatusBadge from "../../components/ProductStatusBadge";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [prod, setProd] = React.useState<any>(null);

  React.useEffect(() => {
    getProductById(id as string).then(setProd);
  }, [id]);

  if (!prod) return null;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.tit}>Tên sản phẩm</Text>
        <Text style={styles.bold}>{prod.name}</Text>
        <Text style={styles.tit}>Giá tiền</Text>
        <Text style={styles.price}>{prod.price.toLocaleString("vi")} VND</Text>
        <Text style={styles.tit}>Trạng thái</Text>
        <ProductStatusBadge status={prod.status} />
      </View>
      <Button
        title="XÓA"
        color="#e53935"
        onPress={() =>
          Alert.alert(
            "Xóa sản phẩm",
            "Bạn có chắc chắn muốn xóa sản phẩm này?",
            [
              { text: "HỦY", style: "cancel" },
              {
                text: "XÓA",
                style: "destructive",
                onPress: async () => {
                  await removeProduct(prod.id);
                  router.back();
                },
              },
            ]
          )
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#faf9f8" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 18,
    marginBottom: 22,
    elevation: 1,
  },
  tit: { color: "#888", marginTop: 10 },
  bold: { fontWeight: "bold", fontSize: 18 },
  price: { fontSize: 16, color: "#e0a100", fontWeight: "bold", marginTop: 5 },
});
