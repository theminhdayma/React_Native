import React, { useState, useMemo } from "react";
import { View, Text, SectionList, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DATA = [
  {
    title: "Điện thoại",
    data: ["iPhone", "Samsung Galaxy", "Google Pixel", "OnePlus", "Xiaomi"],
  },
  {
    title: "Laptop",
    data: [
      "MacBook Pro",
      "Dell XPS",
      "Lenovo ThinkPad",
      "HP Spectre",
      "Asus ZenBook",
    ],
  },
  {
    title: "Máy tính bảng",
    data: ["iPad Pro", "Samsung Galaxy Tab", "Microsoft Surface"],
  },
];

export default function ProductSectionList() {
  const [search, setSearch] = useState("");

  const sections = useMemo(() => {
    if (!search.trim()) return DATA;
    const keyword = search.trim().toLowerCase();
    return DATA.map((section) => ({
      ...section,
      data: section.data.filter((item) => item.toLowerCase().includes(keyword)),
    })).filter((section) => section.data.length > 0);
  }, [search]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm..."
        value={search}
        onChangeText={setSearch}
      />
      <SectionList
        sections={sections}
        keyExtractor={(item, idx) => item + idx}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingVertical: 10 }}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 30, color: "#888" }}>
            Không tìm thấy mục nào.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    paddingHorizontal: 10,
    paddingTop: 14,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    paddingHorizontal: 12,
    marginBottom: 10,
    height: 42,
  },
  sectionHeader: {
    backgroundColor: "#dedede",
    borderRadius: 8,
    paddingVertical: 13,
    paddingHorizontal: 14,
    marginTop: 6,
  },
  sectionHeaderText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#444",
  },
  item: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 16,
    marginBottom: 9,
    marginTop: 0,
  },
  itemText: {
    fontSize: 15,
    color: "#222",
  },
});
