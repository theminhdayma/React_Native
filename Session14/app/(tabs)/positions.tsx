import { searchPositions } from "@/apis/position.apis";
import { Position } from "@/interfaces/position.interface";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PositionListScreen() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const fetchPositions = async (
    page: number = 1,
    searchKeyword: string = ""
  ) => {
    try {
      setLoading(true);
      const response = await searchPositions({
        keyword: searchKeyword,
        currentPage: page,
        pageSize: pageSize,
      });

      if (page === 1) {
        setPositions(response.data);
      } else {
        setPositions((prev) => [...prev, ...response.data]);
      }

      setTotalPages((response as any).totalPages);
    } catch (error) {
      console.error("Error fetching positions:", error);
      Alert.alert("Lỗi", "Không thể tải danh sách vị trí làm việc");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchPositions(1, keyword);
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages && !loading) {
      fetchPositions(currentPage + 1, keyword);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPositions(1, keyword);
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPositions();
    }, [])
  );

  const renderPositionItem = ({ item }: { item: Position }) => (
    <TouchableOpacity
      style={styles.positionItem}
      onPress={() => router.push(`/position-detail/${item.id}`)}
    >
      <View style={styles.positionInfo}>
        <Text style={styles.positionName}>{item.positionName}</Text>
        <Text style={styles.positionDescription}>{item.description}</Text>
        <Text
          style={[
            styles.positionStatus,
            { color: item.positionStatus === "ACTIVE" ? "#4CAF50" : "#F44336" },
          ]}
        >
          {item.positionStatus === "ACTIVE" ? "Hoạt động" : "Không hoạt động"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quản lý Vị trí Làm việc</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/position-create")}
        >
          <Text style={styles.addButtonText}>+ Thêm mới</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm vị trí làm việc..."
          value={keyword}
          onChangeText={setKeyword}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Tìm</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={positions}
        renderItem={renderPositionItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không có dữ liệu</Text>
          </View>
        }
      />
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  positionItem: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  positionInfo: {
    flex: 1,
  },
  positionName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  positionDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  positionStatus: {
    fontSize: 12,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
});
