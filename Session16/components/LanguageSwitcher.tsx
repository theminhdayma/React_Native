// src/components/LanguageSwitcher.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { texts } from "../constants/texts";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { setEnglish, setVietnamese } from "@/redux/slices/language.slice";
import { RootState } from "@/redux/store";

export default function LanguageSwitcher() {
  const locale = useSelector((state: RootState) => state.language.locale);
  const dispatch = useDispatch();
  const curText = texts[locale as keyof typeof texts];

  return (
    <View style={styles.container}>
      <View style={styles.languageBar}>
        <TouchableOpacity
          style={[styles.button, locale === "vi" && styles.selected]}
          onPress={() => dispatch(setVietnamese())}
        >
          <Text
            style={[
              styles.buttonText,
              locale === "vi" ? styles.selectedText : styles.unselectedText,
            ]}
          >
            Tiếng Việt
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, locale === "en" && styles.selected]}
          onPress={() => dispatch(setEnglish())}
        >
          <Text
            style={[
              styles.buttonText,
              locale === "en" ? styles.selectedText : styles.unselectedText,
            ]}
          >
            English
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 32 }}>
        <Text style={styles.desc}>{curText.description}</Text>
        <Text style={styles.school}>{curText.school}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    justifyContent: "flex-start",
    marginTop: 40,
  },
  languageBar: { flexDirection: "row", marginTop: 10, marginBottom: 10 },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#f4f4f4",
    borderRadius: 5,
    marginRight: 10,
    minWidth: 110,
    alignItems: "center",
  },
  selected: {
    backgroundColor: "#e0e0e0",
    borderWidth: 1,
    borderColor: "#1976d2",
  },
  buttonText: { fontSize: 16, fontWeight: "bold" },
  selectedText: { color: "#003cff" },
  unselectedText: { color: "#444" },
  desc: { marginTop: 26, fontSize: 17, color: "#555" },
  school: { marginTop: 18, fontWeight: "bold", fontSize: 22, color: "#222" },
});
