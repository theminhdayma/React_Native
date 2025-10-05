import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import DetailsScreen from "./DetailsScreen";
import type { RootStackParamList } from "../../types/Navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerTitleAlign: "center" }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Danh sách Sản phẩm" }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: "Chi tiết Sản phẩm" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
