import React from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { addProduct, getProducts } from "../../storage/productStorage";
import { useRouter } from "expo-router";
import { ProductStatus } from "../../types/Product";

export default function ProductCreateScreen() {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [status, setStatus] = React.useState<ProductStatus>("draft");
  const [errors, setErrors] = React.useState({});
  const router = useRouter();

  async function validateAndSubmit() {
    const products = await getProducts();
    const exists = products.some(
      (x) => x.name.trim().toLowerCase() === name.trim().toLowerCase()
    );
    const err: any = {};
    if (!name.trim()) err.name = "Tên sản phẩm không được để trống";
    else if (exists) err.name = "Tên sản phẩm đã tồn tại";
    if (!price || +price <= 0) err.price = "Giá tiền phải > 0";
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }

    await addProduct({ name: name.trim(), price: +price, status });
    Alert.alert("Thêm thành công");
    router.back();
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên sản phẩm</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Tên sản phẩm"
      />

      <Text style={styles.label}>Giá tiền (VND)</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        placeholder="VD: 12000000"
      />

      <Text style={styles.label}>Trạng thái</Text>
      <Picker
        selectedValue={status}
        onValueChange={setStatus}
        style={styles.picker}
      >
        <Picker.Item label="Chưa bán" value="draft" />
        <Picker.Item label="Đang bán" value="active" />
        <Picker.Item label="Ngừng bán" value="inactive" />
      </Picker>

      <Button
        title="THÊM SẢN PHẨM"
        onPress={validateAndSubmit}
        color="#e0a100"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  label: { marginTop: 14, marginBottom: 6, color: "#444", fontSize: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    backgroundColor: "#fff",
  },
  picker: { backgroundColor: "#f9f9f9" },
  err: { color: "#e53935", fontWeight: "bold" },
});
