import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Color = "red" | "green" | "blue";

export default function ColorPicker() {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  const changeColor = (color: Color, delta: number) => {
    if (color === "red") {
      setRed(prev => Math.min(255, Math.max(0, prev + delta)));
    } else if (color === "green") {
      setGreen(prev => Math.min(255, Math.max(0, prev + delta)));
    } else if (color === "blue") {
      setBlue(prev => Math.min(255, Math.max(0, prev + delta)));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.preview, { backgroundColor: `rgb(${red},${green},${blue})` }]} />

      {[
        { name: "Red", value: red, key: "red" as Color },
        { name: "Green", value: green, key: "green" as Color },
        { name: "Blue", value: blue, key: "blue" as Color },
      ].map(({ name, value, key }) => (
        <View key={key} style={styles.row}>
          <Text style={styles.text}>{name}: {value}</Text>
          <Button title="+" onPress={() => changeColor(key, 10)} />
          <Button title="-" onPress={() => changeColor(key, -10)} />
        </View>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  preview: {
    height: 150,
    borderRadius: 12,
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    flex: 1,
    fontSize: 18,
  },
});
