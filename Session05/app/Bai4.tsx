import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        style={[styles.button, liked ? styles.liked : styles.notLiked]}
        onPress={toggleLike}
      >
        <Text style={styles.text}>{liked ? "Đã thích" : "Thích"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  liked: {
    backgroundColor: "#0ea5e9",
  },
  notLiked: {
    backgroundColor: "#a1a1aa",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
