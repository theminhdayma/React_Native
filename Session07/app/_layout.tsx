import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Counter from "./Bai1";
import DigitalClock from "./Bai2";
import FocusTextInputScreen from "./Bai3";
import NetworkStatusScreen from "./Bai4";
import TodoApp from "./Bai5";
import Home from "./Bai6";
import OrientationScreen from "./Bai7";
import SearchExample from "./Bai8";

const Tab = createBottomTabNavigator();

export default function AppLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case "Counter":
              iconName = "calculator";
              break;
            case "DigitalClock":
              iconName = "time";
              break;
            case "FocusTextInputScreen":
              iconName = "text";
              break;
            case "NetworkStatusScreen":
              iconName = "wifi";
              break;
            case "TodoApp":
              iconName = "list";
              break;
            case "Home":
              iconName = "home";
              break;
            case "OrientationScreen":
              iconName = "phone-portrait";
              break;
            case "SearchExample":
              iconName = "search";
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
      <Tab.Screen name="Counter" component={Counter} />
      <Tab.Screen name="DigitalClock" component={DigitalClock} />
      <Tab.Screen name="FocusTextInputScreen" component={FocusTextInputScreen} />
      <Tab.Screen name="NetworkStatusScreen" component={NetworkStatusScreen} />
      <Tab.Screen name="TodoApp" component={TodoApp} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="OrientationScreen" component={OrientationScreen} />
      <Tab.Screen name="SearchExample" component={SearchExample} />
    </Tab.Navigator>
  );
}
