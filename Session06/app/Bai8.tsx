import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ListRenderItem,
} from "react-native";

interface Post {
  id: string;
  title: string;
  author: string;
  date: string;
}

const initialData: Post[] = [
  {
    id: "1",
    title: "React Native là gì?",
    author: "John Doe",
    date: "2021-09-01",
  },
  {
    id: "2",
    title: "Làm quen với Redux",
    author: "Jane Smith",
    date: "2021-09-05",
  },
  {
    id: "3",
    title: "Giới thiệu về JavaScript",
    author: "Alice Johnson",
    date: "2021-09-10",
  },
  {
    id: "4",
    title: "Hướng dẫn CSS Flexbox",
    author: "Bob Brown",
    date: "2021-09-12",
  },
  {
    id: "5",
    title: "Học lập trình web từ đâu?",
    author: "Charlie Davis",
    date: "2021-09-15",
  },
];

const moreData: Post[] = [
  {
    id: "6",
    title: "Tìm hiểu về TypeScript",
    author: "David Wilson",
    date: "2021-09-20",
  },
  {
    id: "7",
    title: "Hướng dẫn sử dụng Git",
    author: "Eva Green",
    date: "2021-09-25",
  },
  {
    id: "8",
    title: "Lập trình ReactJS cho người mới bắt đầu",
    author: "Frank Black",
    date: "2021-09-30",
  },
  {
    id: "9",
    title: "Node.js là gì?",
    author: "Grace White",
    date: "2021-10-05",
  },
  {
    id: "10",
    title: "Xây dựng API với Express",
    author: "Hank Blue",
    date: "2021-10-10",
  },
  {
    id: "11",
    title: "Cơ bản về MongoDB",
    author: "Ivy Red",
    date: "2021-10-15",
  },
  {
    id: "12",
    title: "Làm việc với RESTful API",
    author: "Jack Yellow",
    date: "2021-10-20",
  },
  {
    id: "13",
    title: "Giới thiệu về GraphQL",
    author: "Kathy Purple",
    date: "2021-10-25",
  },
  {
    id: "14",
    title: "Triển khai ứng dụng web",
    author: "Leo Orange",
    date: "2021-10-30",
  },
  {
    id: "15",
    title: "Tối ưu hiệu suất ứng dụng web",
    author: "Mia Pink",
    date: "2021-11-05",
  },
  {
    id: "16",
    title: "Bảo mật ứng dụng web",
    author: "Nina Gray",
    date: "2021-11-10",
  },
  {
    id: "17",
    title: "Làm việc với WebSocket",
    author: "Oscar Silver",
    date: "2021-11-15",
  },
  {
    id: "18",
    title: "Giới thiệu về Progressive Web Apps",
    author: "Pam Gold",
    date: "2021-11-20",
  },
  {
    id: "19",
    title: "Sử dụng Docker cho phát triển web",
    author: "Quinn Bronze",
    date: "2021-11-25",
  },
  {
    id: "20",
    title: "Tương lai của phát triển web",
    author: "Rita Copper",
    date: "2021-11-30",
  },
];

export default function BlogListScreen() {
  const [posts, setPosts] = useState<Post[]>(initialData);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = () => {
    if (loadingMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      setPosts((prev) => [...prev, ...moreData]);
      setLoadingMore(false);
    }, 1000);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Danh sách bài viết</Text>
      <Text style={styles.headerCount}>Số lượng bài viết: {posts.length}</Text>
    </View>
  );

  const renderFooter = () =>
    loadingMore ? (
      <View style={{ paddingVertical: 18 }}>
        <ActivityIndicator size="small" color="#43a047" />
        <Text style={styles.loadingText}>Đang tải thêm...</Text>
      </View>
    ) : null;

  const renderItem: ListRenderItem<Post> = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postAuthor}>
        Tác giả: <Text style={{ color: "#388e3c" }}>{item.author}</Text>
      </Text>
      <Text style={styles.postDate}>Ngày đăng: {item.date}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.15}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8faf8" },
  header: {
    backgroundColor: "#4caf50",
    borderRadius: 9,
    margin: 10,
    padding: 17,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 6,
  },
  headerCount: { color: "#e6ffe6", fontSize: 15 },
  card: {
    backgroundColor: "white",
    padding: 14,
    marginHorizontal: 10,
    marginBottom: 13,
    borderRadius: 10,
    elevation: 1,
  },
  postTitle: { fontWeight: "bold", fontSize: 16 },
  postAuthor: { fontSize: 14, color: "#4caf50", marginTop: 4 },
  postDate: { fontSize: 13, color: "#444", marginTop: 4 },
  loadingText: {
    marginTop: 6,
    textAlign: "center",
    color: "#43a047",
    fontSize: 12,
  },
});
