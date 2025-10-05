import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../types/Navigation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Details">;
type DetailRouteProp = RouteProp<RootStackParamList, "Details">;

export default function DetailsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { params } = useRoute<DetailRouteProp>();
  const id = params?.id ?? 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đây là màn hình Details</Text>
      {/* Nếu nhận được id từ HomeScreen khi mở rộng */}
      <Text style={{ fontSize: 16, textAlign: "center", marginVertical: 30 }}>
        Đây là trang chi tiết cho sản phẩm có ID: {"\n"}
        <Text style={styles.productId}>{id}</Text>
      </Text>
      <Button title="GO BACK" onPress={() => navigation.goBack()} />
      <Text style={{ textAlign: "center", marginTop: 30, fontSize: 16 }}>
        Màn hình DetailsScreen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  productId: { fontSize: 22, color: "#1e90ff", fontWeight: "bold" },
});
