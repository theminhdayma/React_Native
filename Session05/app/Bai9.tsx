import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Color = "red" | "yellow" | "green";

const colors: Record<Color, string> = {
  red: "#ff3b30",
  yellow: "#ffcc00",
  green: "#34c759",
};

const order: Color[] = ["green", "yellow", "red"];

export default function TrafficLight() {
  const [activeColor, setActiveColor] = useState<Color>("red");

  const nextLight = () => {
    const currentIndex = order.indexOf(activeColor);
    const nextIndex = (currentIndex + 1) % order.length;
    setActiveColor(order[nextIndex]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {order.map((color) => (
        <View
          key={color}
          style={[
            styles.light,
            {
              backgroundColor: colors[color],
              opacity: color === activeColor ? 1 : 0.3,
            },
          ]}
        />
      ))}

      <TouchableOpacity style={styles.button} onPress={nextLight}>
        <Text style={styles.buttonText}>Chuyển Đèn</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  light: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginVertical: 10,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#0a84ff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
