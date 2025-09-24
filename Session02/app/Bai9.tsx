import React from "react";
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const imageIds = [
  "88",
  "96",
  "103",
  "111",
  "124",
  "125",
  "141",
  "145",
  "146",
  "163",
  "164",
  "175",
];
const imageUrls = imageIds.map(
  (id) => `https://picsum.photos/id/${id}/200/200`
);

const { width } = Dimensions.get("window");
const NUM_COLUMNS = 3;
const SPACING = 10;
const ITEM_SIZE = (width - SPACING * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

export default function Ex9() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.grid}>
          {imageUrls.map((url, index) => (
            <TouchableOpacity
              key={index}
              style={styles.imageContainer}
              activeOpacity={0.7}
            >
              <Image source={{ uri: url }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: SPACING,
    paddingTop: SPACING,
  },
  imageContainer: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    marginRight: SPACING,
    marginBottom: SPACING,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
