import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CounterScreen() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      const value = await AsyncStorage.getItem("counterValue");
      if (value !== null) setCount(Number(value));
    };
    fetchCount();
  }, []);

  const updateCount = async (newCount: number) => {
    setCount(newCount);
    await AsyncStorage.setItem("counterValue", newCount.toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.buttonRow}>
        <Button title="GIẢM (-)" onPress={() => updateCount(count - 1)} />
        <View style={{ width: 16 }} />
        <Button title="TĂNG (+)" onPress={() => updateCount(count + 1)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eef7fd",
  },
  count: {
    fontSize: 96,
    fontWeight: "bold",
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
