import React, { useEffect } from "react";
import { Platform, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import { Stack, useRouter } from "expo-router";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const setupNotifications = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Bạn cần cấp quyền để nhận thông báo!");
        return;
      }

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("reminders", {
          name: "Nhắc nhở",
          importance: Notifications.AndroidImportance.HIGH,
        });
      }
    };

    setupNotifications();

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data;
        console.log("Notification tapped:", data);

        if (data?.screen === "Details") {
          router.push({
            pathname: "/details",
            params: { id: String(data.itemId) },
          });
        }
      }
    );

    return () => subscription.remove();
  }, []);

  return <Stack />;
}
