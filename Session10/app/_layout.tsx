import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function AppLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case "FeedTab":
              iconName = "list";
              break;
            case "Messages":
              iconName = "chatbubbles";
              break;
            case "DrawerTab":
              iconName = "menu";
              break;
            case "BottomTabs":
              iconName = "apps";
              break;
            case "HomeStack":
              iconName = "home";
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
      <Tab.Screen
        name="FeedTab"
        component={require("./Bai5/FeedStack").default}
      />
      <Tab.Screen
        name="Messages"
        component={require("./Bai5/MessagesScreen").default}
      />
      <Tab.Screen
        name="DrawerTab"
        component={require("./Bai3/DrawerNavigator").default}
      />
      <Tab.Screen
        name="BottomTabs"
        component={require("./Bai2/BottomTabs").default}
      />
      <Tab.Screen
        name="HomeStack"
        component={require("./Bai1_4/HomeStack").default}
      />
    </Tab.Navigator>
  );
}
