import React, { useCallback, useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack, useRouter } from "expo-router";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import {
  getAllEmployees,
  deleteEmployee,
  Employee,
  seedIfEmpty,
} from "@/services/employee.repo";

export default function EmployeeListScreen() {
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      await seedIfEmpty();
      const list = await getAllEmployees();
      setEmployees(list);
    } catch (error) {
      console.warn("Load employees failed", error);
      Alert.alert("Lỗi", "Không thể tải danh sách nhân viên");
    } finally {
      setLoading(false);
    }
  }, []);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) load();
  }, [isFocused, load]);

  const handleDelete = (item: Employee) => {
    Alert.alert("Xác nhận", `Bạn có muốn xóa "${item.employeeName}"?`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          await deleteEmployee(item.id);
          await load();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Danh sách Nhân viên",
          headerRight: () => (
            <Link href="/employees/add" asChild>
              <TouchableOpacity>
                <Ionicons name="add-circle" size={32} color="tomato" />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />

      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={employees}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 10 }}
          renderItem={({ item }: { item: Employee }) => (
            <Link
              href={{
                pathname: "/employees/[id]",
                params: { id: item.id.toString() },
              }}
              asChild
            >
              <TouchableOpacity style={styles.itemContainer}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>
                    {item.employeeName} ({item.employeeCode})
                  </Text>
                  <Text style={styles.itemPosition}>{item.positionName}</Text>
                </View>
                <View style={styles.itemActions}>
                  <Link
                    href={{
                      pathname: "/employees/edit/[id]",
                      params: { id: item.id.toString() },
                    }}
                    asChild
                  >
                    <TouchableOpacity>
                      <Ionicons name="pencil" size={24} color="#007AFF" />
                    </TouchableOpacity>
                  </Link>
                  <TouchableOpacity
                    style={{ marginLeft: 15 }}
                    onPress={() => handleDelete(item)}
                  >
                    <Ionicons name="trash" size={24} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Link>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>Chưa có nhân viên</Text>
          }
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  itemContainer: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 18, fontWeight: "bold" },
  itemPosition: { fontSize: 14, color: "gray", marginTop: 4 },
  itemActions: { flexDirection: "row", alignItems: "center" },
  empty: { textAlign: "center", marginTop: 20, color: "#6b7280" },
});
