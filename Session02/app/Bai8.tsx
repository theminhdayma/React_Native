import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Ex8() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "90%" }}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.primaryButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.text, styles.primaryText]}>Button Primary</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.secondaryButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.text, styles.secondaryText]}>
            Button Secondary
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.dangerButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.text, styles.dangerText]}>Button Danger</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.disabledButton]}
          disabled={true}
        >
          <Text style={[styles.text, styles.disabledText]}>
            Button Disabled
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "100%",
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryButton: {
    backgroundColor: "#007AFF",
  },
  primaryText: {
    color: "#FFFFFF",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  secondaryText: {
    color: "#007AFF",
  },
  dangerButton: {
    backgroundColor: "#FF3B30",
  },
  dangerText: {
    color: "#FFFFFF",
  },
  disabledButton: {
    backgroundColor: "#A9A9A9",
  },
  disabledText: {
    color: "#E0E0E0",
  },
  pressed: {
    opacity: 0.8,
  },
});
