import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { setGridMode, setListMode } from "@/redux/slices/mode.slice";
import { RootState } from "@/redux/store";

const data = [1, 2, 3, 4, 5, 6];

export default function DisplayScreen() {
  const mode = useSelector((state: RootState) => state.mode.mode);
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, mode === "list" && styles.active]}
          onPress={() => dispatch(setListMode())}
        >
          <Text
            style={mode === "list" ? styles.activeText : styles.inactiveText}
          >
            List mode
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, mode === "grid" && styles.active]}
          onPress={() => dispatch(setGridMode())}
        >
          <Text
            style={mode === "grid" ? styles.activeText : styles.inactiveText}
          >
            Grid mode
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View
            style={[
              styles.box,
              mode === "grid" ? styles.gridBox : styles.listBox,
            ]}
          >
            <Text style={styles.boxText}>{item}</Text>
          </View>
        )}
        keyExtractor={(item) => item.toString()}
        numColumns={mode === "grid" ? 2 : 1}
        contentContainerStyle={{ padding: 10 }}
        key={mode === "grid" ? "grid" : "list"} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    padding: 8,
    marginBottom: 10,
  },
  toggleButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 30,
    marginHorizontal: 4,
  },
  active: {
    backgroundColor: "#1976d2",
  },
  inactiveText: {
    color: "#333",
    fontWeight: "bold",
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f44336",
    margin: 7,
  },
  gridBox: {
    flex: 1,
    height: 140,
    borderRadius: 14,
  },
  listBox: {
    width: "98%",
    height: 90,
    borderRadius: 14,
  },
  boxText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
  },
});
