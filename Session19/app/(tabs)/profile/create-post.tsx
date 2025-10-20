import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addPost } from "@/apis/post.api";
import { getAllCategories } from "@/apis/categories.api";
import { FlatList } from "react-native";

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

export default function CreatePostScreen() {
  const router = useRouter();

  const [inputValue, setInputValue] = useState<Post>({
    title: "",
    content: "",
    image: "",
    categoryId: 0,
  });

  const [error, setError] = useState({
    title: "",
    image: "",
    categoryId: "",
  });

  const handleChange = (field: string, value: any) => {
    setInputValue({
      ...inputValue,
      [field]: value,
    });
  };

  // Lấy danh sách danh mục
  const { data: categories } = useQuery({
    queryFn: async () => {
      const response = await getAllCategories();
      return response.data;
    },
    queryKey: ["categories"],
  });

  const { mutate: addPostMutation, isPending } = useMutation({
    mutationFn: addPost,
    mutationKey: ["addPost"],
    onSuccess: (data) => {
      Alert.alert("Thành công", "Đã đăng bài viết mới!");
      router.back();
    },
    onError: (error) => {
      console.error("Lỗi khi thêm bài viết:", error);
      Alert.alert("Lỗi", "Không thể đăng bài. Vui lòng thử lại.");
    },
  });

  const handleAdd = () => {
    if (isPending) return;
    let isValid = true;

    const newError = {
      title: "",
      image: "",
      categoryId: "",
    };

    if (!inputValue.image.trim()) {
      newError.image = "Vui lòng nhập URL hình ảnh!";
      isValid = false;
    }

    if (!inputValue.title.trim()) {
      newError.title = "Tiêu đề không được để trống!";
      isValid = false;
    }

    if (inputValue.categoryId == 0) {
      newError.categoryId = "Vui lòng chọn danh mục!";
      isValid = false;
    }

    setError(newError);
    if (!isValid) return;
    addPostMutation(inputValue);
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
              style={[
                styles.publishButton,
                isPending && styles.publishButtonDisabled, // <-- 5. Style khi đang tải
              ]}
              onPress={handleAdd}
              disabled={isPending} // <-- Vô hiệu hóa nút khi đang tải
            >
              {isPending ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.publishButtonText}>Đăng bài</Text>
              )}
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TextInput
          placeholder="Nhập URL hình ảnh"
          placeholderTextColor="#aaa"
          value={inputValue.image}
          style={styles.imageInput}
          onChangeText={(text) => handleChange("image", text)}
        />
        {error.image && <Text style={styles.error}>{error.image}</Text>}

        <TextInput
          style={styles.titleInput}
          placeholder="Tiêu đề bài viết..."
          placeholderTextColor="#aaa"
          value={inputValue.title}
          onChangeText={(text) => handleChange("title", text)}
        />
        {error.title && <Text style={styles.error}>{error.title}</Text>}

        <TextInput
          style={styles.contentInput}
          placeholder="Nội dung của bạn..."
          placeholderTextColor="#aaa"
          value={inputValue.content}
          onChangeText={(text) => handleChange("content", text)}
          multiline
        />

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={inputValue.categoryId}
            onValueChange={(text) => handleChange("categoryId", text)}
          >
            <Picker.Item label="Chọn danh mục" value={0} />
            {categories.map((item: Category) => (
              <Picker.Item key={item.id} label={item.name} value={item.id} />
            ))}
          </Picker>
        </View>
        {error.categoryId && (
          <Text style={styles.error}>{error.categoryId}</Text>
        )}
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
  publishButtonDisabled: {
    backgroundColor: "#a0c8f0",
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
    textAlignVertical: "top", // For Android
    minHeight: 300,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    overflow: "hidden",
  },
  error: {
    fontSize: 14,
    color: "red",
  },
});
