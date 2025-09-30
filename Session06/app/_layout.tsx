import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import EmployeeList from "./Bai1";
import DataScreen from "./Bai2";
import CourseListScreen from "./Bai3";
import LoadMoreRefreshList from "./Bai4";
import ProductSectionList from "./Bai5_6";
import ProductListScreen from "./Bai7";
import BlogListScreen from "./Bai8";

const Tab = createBottomTabNavigator();

export default function AppLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case "EmployeeList":
              iconName = "list";
              break;
            case "DataScreen":
              iconName = "add";
              break;
            case "CourseListScreen":
              iconName = "book";
              break;
            case "LoadMoreRefreshList":
              iconName = "loading";
              break;
            case "ProductSectionList":
              iconName = "list";
              break;
            case "ProductListScreen":
              iconName = "list";
              break;
            case "BlogListScreen":
              iconName = "list";
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
      <Tab.Screen name="EmployeeList" component={EmployeeList} />
      <Tab.Screen name="DataScreen" component={DataScreen} />
      <Tab.Screen name="CourseListScreen" component={CourseListScreen} />
      <Tab.Screen name="LoadMoreRefreshList" component={LoadMoreRefreshList} />
      <Tab.Screen name="ProductSectionList" component={ProductSectionList} />
      <Tab.Screen name="ProductListScreen" component={ProductListScreen} />
      <Tab.Screen name="BlogListScreen" component={BlogListScreen} />
    </Tab.Navigator>
  );
}
