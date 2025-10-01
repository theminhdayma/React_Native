import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNetInfo } from "@react-native-community/netinfo";

export default function NetworkStatusScreen() {
  const netInfo = useNetInfo();
  const isConnected = netInfo.isConnected === true;

  return (
    <SafeAreaView style={styles.container}>
      {!isConnected && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Không có kết nối mạng</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.heading}>Trạng thái kết nối mạng</Text>
        <Text style={styles.line}>
          Có kết nối không?{" "}
          <Text style={{ fontWeight: "bold" }}>
            {isConnected ? "Có" : "Không"}
          </Text>
        </Text>
        <Text style={styles.line}>
          Loại kết nối:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {isConnected ? netInfo.type : "---"}
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f6f6" },
  banner: {
    backgroundColor: "#ef4444",
    paddingVertical: 10,
    alignItems: "center",
  },
  bannerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  content: {
    paddingTop: 30,
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 5,
  },
  line: {
    fontSize: 17,
    marginVertical: 6,
  },
});
