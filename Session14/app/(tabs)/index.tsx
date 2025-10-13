import { getAllCategory } from "@/apis/category.apis";
import { searchPositions } from "@/apis/position.apis";
import { useAuth } from "@/contexts/AuthContext";
import { Category } from "@/interfaces/category.interface";
import { Position } from "@/interfaces/position.interface";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user, logout, isLoggedIn } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(false);

  console.log("Categories: ", categories);
  console.log("Positions: ", positions);

  // Gọi API lấy dữ liệu
  const featchCategories = async () => {
    try {
      const response = await getAllCategory();
      console.log("Categories API response:", response);
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      Alert.alert("Lỗi", "Không thể tải danh sách categories");
    }
  };

  const featchPositions = async () => {
    try {
      const response = await searchPositions({
        keyword: "",
        currentPage: 1,
        pageSize: 5,
      });
      console.log("Positions API response:", response);
      // API trả về PaginatinedResponse<Position>, data nằm trong response.data
      setPositions(response.data || []);
    } catch (error) {
      console.error("Error fetching positions:", error);
      Alert.alert("Lỗi", "Không thể tải danh sách positions");
    }
  };

  const fetchData = async () => {
    if (!isLoggedIn) return;

    setLoading(true);
    try {
      await Promise.all([featchCategories(), featchPositions()]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isLoggedIn]);

  // Refresh khi quay lại trang home
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [isLoggedIn])
  );

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
            router.replace("/login");
          } catch (error) {
            Alert.alert("Lỗi", "Không thể đăng xuất");
          }
        },
      },
    ]);
  };

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity style={styles.itemCard}>
      <Text style={styles.itemTitle}>Id: {item.id}</Text>
      <Text style={styles.itemSubtitle}>CategoryName: {item.categoryName}</Text>
      <Text style={styles.itemSubtitle}>
        CategoryStatus: {item.categoryStatus}
      </Text>
      <Text style={styles.itemSubtitle}>
        CategoryDescription: {item.categoryDescription}
      </Text>
    </TouchableOpacity>
  );

  const renderPositionItem = ({ item }: { item: Position }) => (
    <TouchableOpacity
      style={styles.itemCard}
      onPress={() => router.push(`/position-detail/${item.id}`)}
    >
      <Text style={styles.itemTitle}>Id: {item.id}</Text>
      <Text style={styles.itemSubtitle}>PositionName: {item.positionName}</Text>
      <Text style={styles.itemSubtitle}>
        PositionStatus: {item.positionStatus}
      </Text>
      <Text style={styles.itemSubtitle}>Description: {item.description}</Text>
    </TouchableOpacity>
  );

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loginPrompt}>
          <Text style={styles.loginPromptText}>
            Vui lòng đăng nhập để tiếp tục
          </Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.loginButtonText}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.welcomeText}>
            Xin chào, {user?.firstName} {user?.lastName}
          </Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Categories ({categories.length})
          </Text>
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => router.push("/(tabs)/positions")}
          >
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={categories.slice(0, 3)}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No categories</Text>
            </View>
          }
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Positions ({positions.length})
          </Text>
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => router.push("/positions")}
          >
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={positions.slice(0, 3)}
          renderItem={renderPositionItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No positions</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  welcomeText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: "#F44336",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loginPrompt: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  loginPromptText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  section: {
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  viewAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#2196F3",
    borderRadius: 6,
  },
  viewAllText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  itemCard: {
    backgroundColor: "#fff",
    marginHorizontal: 8,
    marginVertical: 4,
    padding: 16,
    borderRadius: 8,
    width: 280,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
});
