import { getAllCategories } from "@/apis/categories.api";
import { getAllPostsByMe, getPostById, updatePost } from "@/apis/post.api";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Post {
  title: string;
  content: string;
  image: string;
  categoryId: number;
}

type Category = {
  id: number;
  name: string;
};

// Dữ liệu giả cho bài viết đang chỉnh sửa
const EXISTING_POST = {
  title: "10 Mẹo hay để tối ưu hiệu năng React Native",
  content:
    "Nội dung chi tiết của bài viết... Lập trình React Native đòi hỏi sự chú ý đến từng chi tiết nhỏ để đảm bảo ứng dụng không chỉ hoạt động đúng mà còn mượt mà.",
  image:
    "https://images.unsplash.com/photo-1607703703520-bb2a8e3523f4?q=80&w=2070&auto=format&fit=crop",
};

export default function EditPostScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const { data: postDetail } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const response = await getPostById(Number(id));
      return response.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    setEditingPost(postDetail);
  }, []);

  // Lấy danh sách danh mục
  const { data: categories } = useQuery({
    queryFn: async () => {
      const response = await getAllCategories();
      return response.data;
    },
    queryKey: ["categories"],
  });

  const { mutate: updatePostMutation } = useMutation({
    mutationFn: updatePost,
    mutationKey: ["updatePost"],
    onSuccess: () => {
      Alert.alert("Thành công!", "Cập nhật bài viết thành công!");
      router.back();
    },
    onError: () => {
      Alert.alert("Thất bại!", "Cập nhật bài viết thất bại!");
    },
  });

  const handleChange = (field: string, value: any) => {
    if (editingPost) {
      setEditingPost({
        ...editingPost,
        [field]: value,
      });
    }
  };

  const handleUpdate = () => {
    updatePostMutation(editingPost);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={28} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.publishButton}
              onPress={handleUpdate}
            >
              <Text style={styles.publishButtonText}>Cập nhật</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TextInput
          placeholder="Nhập URL hình ảnh"
          placeholderTextColor="#aaa"
          value={editingPost?.image}
          style={styles.imageInput}
          onChangeText={(text) => handleChange("image", text)}
        />

        <TextInput
          style={styles.titleInput}
          placeholder="Tiêu đề bài viết..."
          placeholderTextColor="#aaa"
          value={editingPost?.title}
          onChangeText={(text) => handleChange("title", text)}
        />
        <TextInput
          style={styles.contentInput}
          placeholder="Nội dung của bạn..."
          placeholderTextColor="#aaa"
          value={editingPost?.content}
          onChangeText={(text) => handleChange("content", text)}
          multiline
        />

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={editingPost?.categoryId}
            onValueChange={(text) => handleChange("categoryId", text)}
          >
            <Picker.Item label="Chọn danh mục" value={0} />
            {categories.map((item: Category) => (
              <Picker.Item key={item.id} label={item.name} value={item.id} />
            ))}
          </Picker>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  scrollContainer: { padding: 20 },
  publishButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  publishButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  imageInput: {
    borderWidth: 1,
    borderColor: "#dadada",
    padding: 16,
    marginVertical: 16,
    borderRadius: 10,
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  titleInput: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
    paddingBottom: 10,
  },
  contentInput: {
    fontSize: 18,
    lineHeight: 28,
    textAlignVertical: "top",
    minHeight: 300,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    overflow: "hidden",
  },
});
