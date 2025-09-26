import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Ex3() {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn((previousState) => !previousState);
  };

  const containerStyle = {
    backgroundColor: isOn ? "#fff9c4" : "#212121",
  };

  const buttonStyle = {
    backgroundColor: isOn ? "#f57c00" : "#1976d2",
  };

  return (
    <SafeAreaView style={[styles.container, containerStyle]}>
      <View style={styles.lightContainer}>
        <MaterialCommunityIcons
          name={isOn ? "lightbulb-on" : "lightbulb-off"}
          size={200}
          color={isOn ? "#fdd835" : "#616161"}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, buttonStyle]}
        onPress={toggleSwitch}
      >
        <Text style={styles.buttonText}>{isOn ? "TẮT ĐÈN" : "BẬT ĐÈN"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  lightContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 60,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
