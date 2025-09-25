import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";

const boxes = [
  { key: "box1", color: "#EF4444", width: 100, height: 40 },
  { key: "box2", color: "#F97316", width: 80, height: 50 },
  { key: "box3", color: "#22C55E", width: 120, height: 60 },
  { key: "box4", color: "#3B82F6", width: 90, height: 30 },
  { key: "box5", color: "#8B5CF6", width: 110, height: 55 },
];

export default function Bai2() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <Text style={styles.title}>Lần 1: Sắp xếp dọc (column)</Text>
      <View
        style={[
          styles.container,
          { flexDirection: "column", alignItems: "center" },
        ]}
      >
        {boxes.map((box) => (
          <View
            key={box.key}
            style={[
              styles.box,
              {
                backgroundColor: box.color,
                width: box.width,
                height: box.height,
              },
            ]}
          />
        ))}
      </View>

      <Text style={styles.title}>Lần 2: Sắp xếp ngang (row)</Text>
      <View
        style={[
          styles.container,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
        {boxes.map((box) => (
          <View
            key={box.key}
            style={[
              styles.box,
              {
                backgroundColor: box.color,
                width: box.width,
                height: box.height,
              },
            ]}
          />
        ))}
      </View>

      <Text style={styles.title}>Lần 3: Sắp xếp dạng lưới (wrap)</Text>
      <View
        style={[
          styles.container,
          {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignItems: "center",
          },
        ]}
      >
        {boxes.map((box) => (
          <View
            key={box.key}
            style={[
              styles.box,
              {
                backgroundColor: box.color,
                width: box.width,
                height: box.height,
                marginBottom: 10,
              },
            ]}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 110,
    marginBottom: 16,
    paddingVertical: 14,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  box: {
    margin: 4,
    borderRadius: 5,
  },
  title: {
    marginVertical: 6,
    fontWeight: "bold",
    fontSize: 15,
    alignSelf: "center",
  },
});
