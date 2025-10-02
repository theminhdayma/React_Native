import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Switch, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "settings";

export default function Settings() {
  const [settings, setSettings] = useState({
    username: "",
    email: "",
    notificationsEnabled: true,
  });
  useEffect(() => {
    const loadSettings = async () => {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value) setSettings(JSON.parse(value));
    };
    loadSettings();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const handleChange = (key: keyof typeof settings, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cài đặt</Text>

      <Text style={styles.label}>Tên hiển thị</Text>
      <TextInput
        style={styles.input}
        value={settings.username}
        onChangeText={(text) => handleChange("username", text)}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={settings.email}
        onChangeText={(text) => handleChange("email", text)}
      />

      <View style={styles.switchRow}>
        <Text style={styles.label}>Nhận thông báo</Text>
        <Switch
          value={settings.notificationsEnabled}
          onValueChange={(val) => handleChange("notificationsEnabled", val)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 24, paddingTop: 40 },
  header: { fontSize: 32, fontWeight: "bold", marginBottom: 24 },
  label: { fontSize: 18, marginVertical: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
