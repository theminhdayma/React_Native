import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchMode = async () => {
      const value = await AsyncStorage.getItem("darkMode");
      if (value !== null) setIsDarkMode(JSON.parse(value));
    };
    fetchMode();
  }, []);

  const toggleSwitch = async (value: boolean) => {
    setIsDarkMode(value);
    await AsyncStorage.setItem("darkMode", JSON.stringify(value));
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#222" : "#fff" },
      ]}
    >
      <Text style={[styles.text, { color: isDarkMode ? "#fff" : "#000" }]}>
        Chế độ ban đêm
      </Text>
      <Switch
        value={isDarkMode}
        onValueChange={toggleSwitch}
        thumbColor={isDarkMode ? "#2196f3" : "#eee"}
        trackColor={{ false: "#888", true: "#2196f3" }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    marginRight: 12,
  },
});
