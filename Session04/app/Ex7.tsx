import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type ErrorState = Partial<Record<keyof FormState, string>>;

const validateEmail = (email: string): boolean => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
};

export default function Ex7() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<ErrorState>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    validateForm();
  }, [form]);

  const handleInputChange = (field: keyof FormState, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
  };

  const validateForm = () => {
    const newErrors: ErrorState = {};

    if (!form.name) newErrors.name = "Vui lòng nhập họ tên.";

    if (!form.email) {
      newErrors.email = "Vui lòng nhập email.";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Email không đúng định dạng.";
    }

    if (!form.password) {
      newErrors.password = "Vui lòng nhập mật khẩu.";
    } else if (form.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không trùng khớp.";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleSubmit = () => {
    if (isFormValid) {
      Alert.alert("Thành công", "Đăng ký tài khoản thành công!");
    }
  };

  const getInputBorderColor = (field: keyof FormState) => {
    return errors[field] ? "#d9534f" : "#ccc";
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Tạo tài khoản</Text>

        <View style={styles.inputGroup}>
          <TextInput
            style={[styles.input, { borderColor: getInputBorderColor("name") }]}
            placeholder="Họ và tên"
            value={form.name}
            onChangeText={(value) => handleInputChange("name", value)}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            style={[
              styles.input,
              { borderColor: getInputBorderColor("email") },
            ]}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(value) => handleInputChange("email", value)}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            style={[
              styles.input,
              { borderColor: getInputBorderColor("password") },
            ]}
            placeholder="Mật khẩu"
            secureTextEntry
            value={form.password}
            onChangeText={(value) => handleInputChange("password", value)}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            style={[
              styles.input,
              { borderColor: getInputBorderColor("confirmPassword") },
            ]}
            placeholder="Xác nhận mật khẩu"
            secureTextEntry
            value={form.confirmPassword}
            onChangeText={(value) =>
              handleInputChange("confirmPassword", value)
            }
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
        </View>

        <TouchableOpacity
          style={[styles.button, !isFormValid && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={!isFormValid}
        >
          <Text style={styles.buttonText}>ĐĂNG KÝ</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  inputGroup: {
    marginBottom: 10,
  },
  input: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  errorText: {
    color: "#d9534f",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: "#a9a9a9",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
