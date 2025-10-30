import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React from "react";
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
import { getContactBlocked, updateToggleBlock } from "@/apis/apiContact";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function BlacklistScreen() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: contactsQuery, isLoading } = useQuery({
    queryFn: async () => {
      const response = await getContactBlocked();
      return response.data;
    },
    queryKey: ["contactBlocked"],
  });

  const { mutate: toggleBlockStatus } = useMutation({
    mutationFn: (id: number) => updateToggleBlock(id),
    mutationKey: ["updateToggleBlocked"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      queryClient.invalidateQueries({ queryKey: ["contactBlocked"] });
      Alert.alert("Thành công", "Bỏ chặn liên hệ thành công!");
      router.back();
    },
    onError: () => {
      Alert.alert("Lỗi", "Không thể chặn liên hệ này!");
    },
  });

  const [refresh, setRefresh] = React.useState(0);
  useFocusEffect(
    React.useCallback(() => {
      setRefresh((r) => r + 1); 
    }, [])
  );

  const handleUnblock = (id: number) => {
    toggleBlockStatus(id);
    console.log(`Bỏ chặn (UI-only) cho ID: ${id}`);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.emptyContainer]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {(contactsQuery || []).length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="shield-outline" size={60} color="#ccc" />
          <Text style={styles.emptyText}>Danh sách đen trống</Text>
        </View>
      ) : (
        <FlatList
          data={contactsQuery || []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.phoneText}>{item.phone}</Text>
              </View>
              <TouchableOpacity
                style={styles.unblockButton}
                onPress={() => handleUnblock(item.id)}
              >
                <Text style={styles.unblockButtonText}>Bỏ chặn</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 18, color: "#aaa", marginTop: 10 },
  itemContainer: {
    backgroundColor: "white",
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 1,
  },
  nameText: { fontSize: 16, fontWeight: "600" },
  phoneText: { fontSize: 14, color: "#555", marginTop: 2 },
  unblockButton: {
    backgroundColor: "#34C759",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  unblockButtonText: { color: "white", fontWeight: "bold" },
});
