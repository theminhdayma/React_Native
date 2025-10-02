import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Bai1 from "./Bai1";
import SettingsScreen from "./Bai2";
import CounterScreen from "./Bai3";
import Bai4 from "./Bai4";
import TodoList from "./Bai5";
import Settings from "./Bai6";
import ProductScreen from "./Bai7";
import Bai8 from "./Bai8";

const Tab = createBottomTabNavigator();

export default function AppLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case "Bai1":
              iconName = "person";
              break;
            case "SettingsScreen":
              iconName = "settings";
              break;
            case "CounterScreen":
              iconName = "calculator";
              break;
            case "Bai4":
              iconName = "person";
              break;
            case "TodoList":
              iconName = "list";
              break;
            case "Settings":
              iconName = "settings";
              break;
            case "ProductScreen":
              iconName = "cart";
              break;
            case "Bai8":
              iconName = "people";
              break;
            default:
              iconName = "ellipse";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#0ea5e9",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Bai1" component={Bai1} />
      <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
      <Tab.Screen name="CounterScreen" component={CounterScreen} />
      <Tab.Screen name="Bai4" component={Bai4} />
      <Tab.Screen name="TodoList" component={TodoList} />
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="ProductScreen" component={ProductScreen} />
      <Tab.Screen name="Bai8" component={Bai8} />
    </Tab.Navigator>
  );
}
