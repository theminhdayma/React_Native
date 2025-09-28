import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import BusinessCard from "./Bai1";
import Bai2 from "./Bai2";
import Counter from "./Bai3";
import LikeButton from "./Bai4";
import LoginForm from "./Bai5";
import TodoList from "./Bai6";
import Bai7 from "./Bai7";
import Calculator from "./Bai8";
import TrafficLight from "./Bai9";
import ColorPicker from "./Bai10";


const Tab = createBottomTabNavigator();

export default function AppLayout() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            switch (route.name) {
              case "BusinessCard":
                iconName = "card";
                break;
              case "Bai2":
                iconName = "card";
                break;
              case "Counter":
                iconName = "calculator";
                break;
              case "LikeButton":
                iconName = "heart";
                break;
              case "LoginForm":
                iconName = "person";
                break;
              case "TodoList":
                iconName = "list";
                break;
              case "Bai7": 
                iconName = "list";
                break;
              case "Calculator":
                iconName = "calculator";
                break;
              case "TrafficLight":
                iconName = "traffic-light"
                break;
              case "ColorPicker":
                iconName = "picker";
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
        <Tab.Screen name="BusinessCard" component={BusinessCard} />
        <Tab.Screen name="Bai2" component={Bai2} />
        <Tab.Screen name="Counter" component={Counter} />
        <Tab.Screen name="LikeButton" component={LikeButton} />
        <Tab.Screen name="LoginForm" component={LoginForm}/>
        <Tab.Screen name="TodoList" component={TodoList} />
        <Tab.Screen name="Bai7" component={Bai7} />
        <Tab.Screen name="Calculator" component={Calculator} />
        <Tab.Screen name="TrafficLight" component={TrafficLight} />
        <Tab.Screen name="ColorPicker" component={ColorPicker} />
      </Tab.Navigator>
  );
}
