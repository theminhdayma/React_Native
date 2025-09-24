import React from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Ex10() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>Tạo tài khoản</Text>
        <Text style={styles.subtitle}>Điền thông tin để bắt đầu</Text>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, styles.inputError]}
            value="emailkhonghople@"
            editable={false}
          />
          <Text style={styles.errorText}>
            Vui lòng nhập một địa chỉ email hợp lệ.
          </Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Mật khẩu</Text>
          <TextInput
            style={[styles.input, styles.inputSuccess]}
            value="••••••••••••••"
            secureTextEntry
            editable={false}
          />
        </View>

        <Pressable style={[styles.button, styles.buttonDisabled]} disabled>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#F7F9FC",
  },
  container: {
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1D2A39",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6A788A",
    textAlign: "center",
    marginBottom: 40,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#49586A",
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
  },
  inputError: {
    borderColor: "#FF3B30",
    color: "#FF3B30",
  },
  inputSuccess: {
    borderColor: "#34C759",
    color: "#34C759",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 6,
  },
  button: {
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: "#AEB8C4",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
