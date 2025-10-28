import React, { useEffect, useState } from "react";
import { View, Button, Alert, Text, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

export default function Bai6() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) setExpoPushToken(token);
    });

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("👉 Notification tapped!");
        console.log(
          "Data nhận được:",
          response.notification.request.content.data
        );
      }
    );

    return () => subscription.remove();
  }, []);

  const scheduleNotificationAsync = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Nhắc học React Native",
        body: "Đây là thông báo từ channel 'reminders'",
        data: {
          studentId: "SV001",
          course: "React Native",
        },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 10,
        channelId: "reminders",
      },
    });

    Alert.alert("Đã lên lịch nhắc nhở sau 10 giây.");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Button
        title="Nhắc tôi sau 10 giây"
        onPress={scheduleNotificationAsync}
      />
      <Text style={{ marginTop: 20, textAlign: "center" }}>
        Expo Push Token: {"\n"}
        {expoPushToken ? expoPushToken : "Đang lấy token..."}
      </Text>
    </View>
  );
}

async function registerForPushNotificationsAsync(): Promise<string | null> {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert("Không có quyền gửi thông báo!");
      return null;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo Push Token:", token);
  } else {
    Alert.alert("Phải chạy trên thiết bị thật để lấy token!");
    return null;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("reminders", {
      name: "Nhắc nhở",
      importance: Notifications.AndroidImportance.HIGH,
    });

    await Notifications.setNotificationChannelAsync("news", {
      name: "Tin tức",
      importance: Notifications.AndroidImportance.DEFAULT,
    });

    console.log("✅ Channels 'reminders' và 'news' đã được tạo");
  }

  return token;
}
