import React from "react";
import { View, Text, StyleSheet } from "react-native";
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Trang chủ</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  txt: { fontSize: 20, fontWeight: "700" },
});
