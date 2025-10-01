import React from "react";
import {
  Text,
  View,
  FlatList,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Item {
  id: string;
  name: string;
}

const DATA: Item[] = [
  { id: "1", name: "Item 1" },
  { id: "2", name: "Item 2" },
  { id: "3", name: "Item 3" },
  { id: "4", name: "Item 4" },
  { id: "5", name: "Item 5" },
  { id: "6", name: "Item 6" },
  { id: "7", name: "Item 7" },
];

export default function OrientationScreen() {
  const { width, height } = useWindowDimensions();
  const isPortrait = height >= width;

  const numColumns = isPortrait ? 1 : 2;
  const orientationLabel = isPortrait ? "Dọc (Portrait)" : "Ngang (Landscape)";

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.item}>
      <Text style={styles.itemTxt}>{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Trang chủ</Text>
      <View style={styles.modeWrapper}>
        <Text style={styles.modeText}>
          Chế độ hiển thị: <Text style={styles.bold}>{orientationLabel}</Text>
        </Text>
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={{ padding: 12, paddingTop: 0 }}
        columnWrapperStyle={
          !isPortrait ? { justifyContent: "space-between" } : undefined
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafaff" },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 17,
    marginBottom: 9,
    color: "#222",
  },
  modeWrapper: {
    backgroundColor: "#f7f7fb",
    borderRadius: 7,
    padding: 13,
    marginHorizontal: 9,
    marginBottom: 9,
    alignItems: "center",
  },
  modeText: { fontSize: 16, color: "#1d2026", textAlign: "center" },
  bold: { fontWeight: "bold" },
  item: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 22,
    paddingHorizontal: 12,
    marginBottom: 15,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
    elevation: 1,
  },
  itemTxt: { fontSize: 16, color: "#232323" },
});
