import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import { FeedStackParamList } from "../../types/Navigation";

type NavigationProp = NativeStackNavigationProp<
  FeedStackParamList,
  "FeedDetail"
>;
type DetailRouteProp = RouteProp<FeedStackParamList, "FeedDetail">;

export default function FeedDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { params } = useRoute<DetailRouteProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chi tiết bài viết</Text>
      <Text style={styles.id}>ID: {params.id}</Text>
      <Button title="Quay lại FeedList" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 20 },
  id: { fontSize: 18, marginBottom: 20 },
});
