import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

const ALL_ITEMS = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "C#",
  "Java",
  "Kotlin",
  "Swift",
  "Go",
  "Rust",
  "Ruby",
  "PHP",
  "Dart",
];
import { SafeAreaView } from "react-native-safe-area-context";

const PAGE_SIZE = 5;

export default function LoadMoreRefreshList() {
  const [data, setData] = useState(ALL_ITEMS.slice(0, PAGE_SIZE));
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setData(ALL_ITEMS.slice(0, PAGE_SIZE));
      setRefreshing(false);
    }, 1000);
  }, []);

  const onEndReached = useCallback(() => {
    if (data.length >= ALL_ITEMS.length || loadingMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      const nextData = ALL_ITEMS.slice(0, data.length + PAGE_SIZE);
      setData(nextData);
      setLoadingMore(false);
    }, 1000);
  }, [data, loadingMore]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item}</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        ListFooterComponent={
          loadingMore ? (
            <View style={{ paddingVertical: 20 }}>
              <ActivityIndicator size="small" />
            </View>
          ) : null
        }
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4", paddingHorizontal: 12 },
  item: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 16,
    marginBottom: 10,
    elevation: 1,
  },
  text: {
    fontSize: 16,
    color: "#222",
  },
});
