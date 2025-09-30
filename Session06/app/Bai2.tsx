import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const initialData: string[] = [];

export default function DataScreen() {
  const [data, setData] = useState<string[]>(initialData);

  const handleAdd = () => {
    if (data.length === 0) {
      setData(["HTML, CSS, JavaScript", "Python", "React.js"]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>THÊM DỮ LIỆU</Text>
      </TouchableOpacity>

      <FlatList
        data={data}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không có dữ liệu</Text>
        }
        contentContainerStyle={
          data.length === 0
            ? { flex: 1, justifyContent: "center", alignItems: "center" }
            : {}
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  button: {
    backgroundColor: "#189eff",
    paddingVertical: 12,
    borderRadius: 3,
    alignItems: "center",
    marginBottom: 16,
    marginHorizontal: 7,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
  item: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 13,
    paddingHorizontal: 15,
    marginBottom: 10,
    elevation: 1,
  },
  itemText: {
    fontSize: 16,
    color: "#222",
  },
  emptyText: {
    color: "#888",
    fontSize: 18,
    marginTop: 40,
    textAlign: "center",
  },
});
