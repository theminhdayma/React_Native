import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext, useTheme, ThemeType } from "../components/ThemeContext";

function ChildComponent() {
  return (
    <View style={{ marginTop: 18 }}>
      <Text style={{ fontSize: 17, color: useTheme().theme === "dark" ? "#fafafa" : "#222" }}>
        Đây là Component Con
      </Text>
      <GrandChildComponent />
    </View>
  );
}

function GrandChildComponent() {
  const { theme } = useTheme();
  return (
    <View style={[
      styles.grandChild,
      { backgroundColor: theme === "dark" ? "#222" : "#f2f2f2" }
    ]}>
      <Text style={{ color: theme === "dark" ? "#fff" : "#222" }}>
        Tôi là Component Cháu
      </Text>
    </View>
  );
}

export default function Home() {
  const [theme, setTheme] = useState<ThemeType>("light");
  const value = {
    theme,
    toggleTheme: () => setTheme(prev => prev === "dark" ? "light" : "dark")
  };

  return (
    <ThemeContext.Provider value={value}>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme === "dark" ? "#181818" : "#f6f7fa" }}>
        <Text style={[
          styles.header,
          { color: theme === "dark" ? "#fff" : "#1a1a1a" }
        ]}>Trang chủ</Text>
        <View style={[
          styles.box,
          { backgroundColor: theme === "dark" ? "#181818" : "#eceff1" }
        ]}>
          <View style={styles.row}>
            <Text style={[styles.themeTitle, { color: theme === "dark" ? "#fff" : "#191919" }]}>
              Theme Switcher
            </Text>
            <Switch
              value={theme === "dark"}
              onValueChange={value.toggleTheme}
              thumbColor={theme === "dark" ? "#1976d2" : "#fff"}
              trackColor={{ false: "#dadada", true: "#607D8B" }}
            />
          </View>
          <ChildComponent />
        </View>
      </SafeAreaView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  header: { fontWeight: "bold", fontSize: 20, margin: 16 },
  box: { margin: 10, borderRadius: 9, padding: 16, paddingTop: 13 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 20, justifyContent: "space-between" },
  themeTitle: { fontWeight: "bold", fontSize: 21 },
  grandChild: {
    marginTop: 17,
    borderRadius: 8,
    padding: 13,
    paddingHorizontal: 12,
  },
});
