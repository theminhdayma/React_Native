import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const allCourses = ["HTML", "CSS", "JavaScript", "Java", "Python", "PHP", "C#"];

export default function CourseListScreen() {
  const [visibleCount, setVisibleCount] = useState(4);

  const handleLoadMore = () => {
    setVisibleCount(allCourses.length);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={allCourses.slice(0, visibleCount)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerText}>Danh sách Khóa học</Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            {visibleCount < allCourses.length && (
              <TouchableOpacity style={styles.button} onPress={handleLoadMore}>
                <Text style={styles.buttonText}>TẢI THÊM</Text>
              </TouchableOpacity>
            )}
          </View>
        }
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    paddingHorizontal: 12,
  },
  header: {
    backgroundColor: "#ededed",
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 15,
    marginVertical: 6,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
  },
  item: {
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 5,
    paddingVertical: 15,
    paddingHorizontal: 16,
    elevation: 1,
  },
  itemText: {
    fontSize: 15,
    color: "#222",
  },
  footer: {
    paddingVertical: 18,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#189eff",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 4,
    elevation: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
