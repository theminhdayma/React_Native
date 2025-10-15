// src/components/PositionListScreen.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fetchPositions, PositionState } from "@/redux/slices/position.slice";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/hooks/useRedux";

export default function PositionListScreen() {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useSelector(
    (state: RootState) => state.positions
  );

  useEffect(() => {
    dispatch(fetchPositions());
  }, [dispatch]);

  const getStatus = (status: string) => {
    if (status === "ACTIVE") {
      return { text: "Đang hoạt động", color: "#38A169" };
    } else {
      return { text: "Không hoạt động", color: "#ea0c0cff" };
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    const { text, color } = getStatus(item.positionStatus);
    return (
      <View style={styles.itemContainer}>
        <View style={styles.infoWrap}>
          <Text style={styles.name}>{item.positionName}</Text>
          <Text style={[styles.statusText, { color }]}>{text}</Text>
        </View>
        <View style={styles.actionWrap}>
          <Ionicons name="trash-outline" size={24} color="#D32F2F" />
          <Ionicons
            name="ios-switch"
            size={32}
            color={item.positionStatus === "ACTIVE" ? "#38A169" : "#ccc"}
            style={{ marginLeft: 16 }}
          />
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <FlatList
        data={list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 12 }}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 40 }}>
            Không có dữ liệu
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#f5f5f5" },
  itemContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 10,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  infoWrap: { flex: 1 },
  name: { fontSize: 18, fontWeight: "bold" },
  statusText: { marginTop: 5, fontSize: 15, fontWeight: "600" },
  actionWrap: { flexDirection: "row", alignItems: "center", gap: 8 },
});
