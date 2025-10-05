import React from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../types/Navigation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const PRODUCTS = [
  { id: 1, name: "iPhone 15 Pro" },
  { id: 2, name: "MacBook Air M3" },
  { id: 3, name: "Apple Watch Series 9" },
];

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đây là màn hình Home</Text>
      <View style={{ marginVertical: 12 }}>
        <Button
          title="GO TO DETAILS"
          onPress={() => navigation.navigate("Details", { id: 0 })}
        />
      </View>
      <Text style={styles.desc}>Giao diện trang chủ</Text>

      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id.toString()}
        style={{ marginTop: 36, width: "100%" }}
        contentContainerStyle={{ alignItems: "center" }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Details", { id: item.id })}
          >
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={{ textAlign: "center", marginTop: 14, fontSize: 16 }}>
        Màn hình HomeScreen
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
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  desc: { marginBottom: 12, fontSize: 16, marginTop: 18, textAlign: "center" },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    width: 300,
    alignItems: "center",
  },
  cardText: { fontSize: 17, fontWeight: "600" },
});
