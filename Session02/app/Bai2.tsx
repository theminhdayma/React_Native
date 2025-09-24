import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Ex2() {
  const [count, setCount] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.countText}>{count}</Text>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Giảm"
            onPress={() => setCount(count - 1)}
            color={Platform.OS === "ios" ? "white" : "#f44336"}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Tăng"
            onPress={() => setCount(count + 1)}
            color={Platform.OS === "ios" ? "white" : "#4caf50"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  countText: {
    fontSize: 80,
    fontWeight: "bold",
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
  buttonWrapper: {
    width: "45%",
  },
});
