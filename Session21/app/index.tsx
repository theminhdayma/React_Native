import React, { useEffect } from "react";
import { Alert, Button, Platform, View } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function HomeScreen() {
  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Bạn cần cấp quyền để nhận thông báo!");
        return;
      } else {
        console.log("Quyền thông báo đã được cấp!");
      }

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "Default",
          importance: Notifications.AndroidImportance.HIGH,
        });
      }
    };

    requestPermission();
  }, []);

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "📦 Xem chi tiết sản phẩm",
        body: "Nhấn vào để xem chi tiết Item 123",
        data: { screen: "Details", itemId: 123 },
      },
      trigger: null,
    });

    Alert.alert("Đã gửi thông báo!");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Gửi Local Notification" onPress={sendNotification} />
    </View>
  );
}
