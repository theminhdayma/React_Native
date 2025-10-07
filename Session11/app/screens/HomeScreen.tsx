import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Mini Shop!</Text>
      <Text style={styles.desc}>Find the best products here</Text>
      <Image source={require("../assets/chair.jpg")} style={styles.img} />
      <Button
        title="Browse All Products"
        onPress={() => navigation.navigate("ProductList" as never)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f6fa",
  },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 8 },
  desc: { color: "#666", marginBottom: 12 },
  img: { width: 260, height: 160, borderRadius: 14, marginBottom: 16 },
});
