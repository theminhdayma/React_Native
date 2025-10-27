import Bai1den5 from "@/app/(tabs)/Bai1den5";
import Bai6den8 from "@/app/(tabs)/Bai6den8";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <Tabs>
      <Tabs.Screen
        name="Bai1den5"
        options={{ title: "Bài 1 - 5", headerShown: false }}
      />
      <Tabs.Screen
        name="Bai6den8"
        options={{ title: "Bài 6 - 8", headerShown: false }}
      />
    </Tabs>
  );
}