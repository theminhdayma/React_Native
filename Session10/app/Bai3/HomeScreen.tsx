import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

type DrawerParamList = {
  Home: undefined;
  Notifications: undefined;
};

type HomeScreenProp = DrawerNavigationProp<DrawerParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenProp>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{ paddingHorizontal: 10 }}
        >
          <Ionicons name="menu-outline" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đây là màn hình Home</Text>
      <Text style={{ marginTop: 8, color: "#444", textAlign: "center" }}>
        Nhấn vào icon ☰ ở góc trên bên trái để mở menu.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f6f6",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
});
