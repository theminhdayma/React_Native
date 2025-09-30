import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const employees = [
  "John Doe",
  "Jane Smith",
  "Samuel Johnson",
  "Emily Davis",
  "Michael Brown",
  "Sarah Wilson",
  "David Taylor",
  "James Anderson",
  "Mary Thomas",
  "Robert Lee",
];

export default function EmployeeList() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>List Employee</Text>
      <FlatList
        data={employees}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: 16,
  },
  item: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    color: "#222",
  },
});
