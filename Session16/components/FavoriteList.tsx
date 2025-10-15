// src/components/FavoriteList.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { setFavoritesBatch } from "@/redux/slices/favorite.slice";
import { RootState } from "@/redux/store";

export default function FavoriteList() {
  const users = useSelector((state: RootState) => state.favorite.users);
  const dispatch = useDispatch();

  const handleUpdateFavorites = () => {
    dispatch(
      setFavoritesBatch([
        { id: 3, favorite: true },
        { id: 4, favorite: true },
        { id: 5, favorite: true },
      ])
    );
  };

  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      <Text style={styles.header}>List Favorites User</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.label}>
              UserName: <Text style={styles.boldName}>{item.name}</Text>
            </Text>
            <Text style={styles.label}>
              Favorites:{" "}
              <Text style={styles.icon}>{item.favorite ? "❤️" : "?"}</Text>
            </Text>
          </View>
        )}
        ListFooterComponent={
          <TouchableOpacity
            style={styles.button}
            onPress={handleUpdateFavorites}
          >
            <Text style={styles.buttonText}>Cập nhật danh sách ưu thích</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    fontWeight: "bold",
    margin: 12,
    color: "#333",
  },
  item: {
    backgroundColor: "#fff",
    padding: 12,
  },
  label: {
    fontSize: 18,
    color: "#888",
    marginBottom: 4,
  },
  boldName: {
    fontWeight: "bold",
    color: "#111",
  },
  icon: {
    fontSize: 22,
    color: "#e53935",
  },
  separator: {
    height: 1,
    backgroundColor: "#ececec",
    marginHorizontal: 8,
  },
  button: {
    backgroundColor: "#1976d2",
    margin: 16,
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
