import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const buttons = [
  ["7", "8", "9", "/"],
  ["4", "5", "6", "*"],
  ["1", "2", "3", "-"],
  ["C", "0", "=", "+"],
];

export default function Calculator() {
  const [expression, setExpression] = useState("");

  const handlePress = (value: string) => {
    if (value === "C") {
      setExpression("");
      return;
    }

    if (value === "=") {
      try {
        const result = eval(expression);
        setExpression(String(result));
      } catch (e) {
        setExpression("Lỗi");
      }
      return;
    }

    setExpression((prev) => prev + value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        <Text style={styles.screenText}>{expression || "0"}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.buttonsRow}>
            {row.map((button) => (
              <TouchableOpacity
                key={button}
                style={styles.button}
                onPress={() => handlePress(button)}
              >
                <Text style={styles.buttonText}>{button}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  screen: {
    height: 80,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  screenText: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
  },
  buttonsContainer: {},
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#fff",
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 60,
  },
  buttonText: {
    fontSize: 24,
    color: "#333",
    fontWeight: "bold",
  },
});
