import { getAllPostsSaved } from "@/apis/post.api";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SavedPost = {
  id: string;
  title: string;
  author: string;
  image: string;
};

const SavedPostCard = ({ item }: { item: SavedPost }) => (
  <View style={styles.card}>
    <Image source={{ uri: item.image }} style={styles.cardImage} />
    <View style={styles.cardContent}>
      <Text
        onPress={() =>
          router.push({
            pathname: "/posts/[id]",
            params: { id: item.id },
          })
        }
        style={styles.cardTitle}
      >
        {item.title}
      </Text>
      <Text style={styles.cardAuthor}>bởi {item.author}</Text>
    </View>
    <TouchableOpacity style={styles.bookmarkButton}>
      <Ionicons name="bookmark" size={24} color="#3b82f6" />
    </TouchableOpacity>
  </View>
);

export default function SavedPostsScreen() {
  const {
    data: savedPosts,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => {
      const response = await getAllPostsSaved();
      return response.data;
    },
    queryKey: ["savedPosts"],
  });

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }
  if (isError) {
    return (
      <Text style={{ textAlign: "center", marginTop: 50 }}>
        Đã có lỗi xảy ra.
      </Text>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={savedPosts}
        renderItem={({ item }) => <SavedPostCard item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Bạn chưa lưu bài viết nào.</Text>
        }
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: "center",
  },
  cardImage: { width: 70, height: 70, borderRadius: 8 },
  cardContent: { flex: 1, marginLeft: 15 },
  cardTitle: { fontSize: 16, fontWeight: "bold" },
  cardAuthor: { fontSize: 14, color: "gray", marginTop: 4 },
  bookmarkButton: { padding: 10 },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "gray",
  },
});
