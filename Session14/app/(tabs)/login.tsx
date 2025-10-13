import { login } from "@/apis/auth.apis";
import { useAuth } from "@/contexts/AuthContext";
import { LoginDataRequest } from "@/interfaces/auth.interface";
import axios from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginPage() {
  const { login: authLogin } = useAuth();
  const [loginRequest, setLoginRequest] = useState<LoginDataRequest>({
    phoneNumber: "",
    password: "",
    isRemembered: true,
    deviceId: (Math.random() * 1000000).toString(),
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!loginRequest.phoneNumber.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập số điện thoại");
      return;
    }

    if (!loginRequest.password.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập mật khẩu");
      return;
    }

    try {
      setLoading(true);
      const response = await login(loginRequest);

      // Sử dụng AuthContext để lưu auth data
      await authLogin(response.data.accessToken, response.data.user);

      Alert.alert("Thành công", "Đăng nhập thành công!", [
        { text: "OK", onPress: () => router.replace("/") },
      ]);

      console.log("Login successful: ", response);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        Alert.alert(
          "Lỗi",
          error?.response?.data?.message || "Đăng nhập thất bại"
        );
      } else {
        Alert.alert("Lỗi", "Có lỗi xảy ra, vui lòng thử lại");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Đăng nhập</Text>

        <TextInput
          onChangeText={(value) =>
            setLoginRequest({ ...loginRequest, phoneNumber: value })
          }
          value={loginRequest.phoneNumber}
          style={styles.input}
          placeholder="Nhập số điện thoại"
          keyboardType="phone-pad"
          autoCapitalize="none"
        />

        <TextInput
          onChangeText={(value) =>
            setLoginRequest({ ...loginRequest, password: value })
          }
          value={loginRequest.password}
          style={styles.input}
          placeholder="Nhập mật khẩu"
          secureTextEntry
          autoCapitalize="none"
        />

        <Button
          title={loading ? "Đang đăng nhập..." : "Đăng nhập"}
          onPress={handleLogin}
          disabled={loading}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
    color: "#333",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    fontSize: 16,
  },
});
