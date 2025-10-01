import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DigitalClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${pad(date.getHours())} : ${pad(date.getMinutes())} : ${pad(
      date.getSeconds()
    )}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Đồng hồ số</Text>
      <View style={styles.clockContainer}>
        <Text style={styles.clockText}>{formatTime(now)}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#181818" },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 12,
    color: "#222",
  },
  clockContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#181818",
  },
  clockText: {
    color: "white",
    fontSize: 56,
    letterSpacing: 2,
    fontWeight: "bold",
  },
});
