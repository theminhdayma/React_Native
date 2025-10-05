import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import NotificationsScreen from "./NotificationsScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: "left",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Trang chủ" }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ title: "Notifications" }}
      />
    </Drawer.Navigator>
  );
}
