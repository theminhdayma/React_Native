import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FeedListScreen from "./FeedListScreen";
import FeedDetailScreen from "./FeedDetailScreen";
import type { FeedStackParamList } from "../../types/Navigation";

const Stack = createNativeStackNavigator<FeedStackParamList>();

export default function FeedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FeedList"
        component={FeedListScreen}
        options={{ title: "Feed" }}
      />
      <Stack.Screen
        name="FeedDetail"
        component={FeedDetailScreen}
        options={{ title: "Chi tiết" }}
      />
    </Stack.Navigator>
  );
}
