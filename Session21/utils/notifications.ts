// utils/notifications.ts
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

// Hàm đăng ký và lấy push token
export async function registerForPushNotificationsAsync(): Promise<
  string | null
> {
  let token: string | null = null;

  // Chỉ xin permission trên thiết bị vật lý
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // Nếu chưa cấp quyền thì yêu cầu cấp
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return null;
    }

    // Lấy expo push token
    const tokenData = await Notifications.getExpoPushTokenAsync();
    token = tokenData.data;
  } else {
    alert("Bạn cần chạy trên thiết bị thật để nhận thông báo push!");
    return null;
  }

  // Tuỳ chọn: Cấu hình notification channel cho Android
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
