import { createPosition } from "@/apis/position.apis";
import { Status } from "@/enums/status.enum";
import { CreatePositionRequest } from "@/interfaces/position.interface";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreatePositionScreen() {
  const [formData, setFormData] = useState<CreatePositionRequest>({
    positionName: "",
    positionStatus: Status.ACTIVE,
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.positionName.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập tên vị trí làm việc");
      return;
    }

    if (formData.positionName.trim().length < 2) {
      Alert.alert("Lỗi", "Tên vị trí làm việc phải có ít nhất 2 ký tự");
      return;
    }

    if (!formData.description.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập mô tả");
      return;
    }

    if (formData.description.trim().length < 10) {
      Alert.alert("Lỗi", "Mô tả phải có ít nhất 10 ký tự");
      return;
    }

    try {
      setLoading(true);
      await createPosition(formData);

      setFormData({
        positionName: "",
        positionStatus: Status.ACTIVE,
        description: "",
      });

      Alert.alert("Thành công", "Tạo vị trí làm việc thành công", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error("Error creating position:", error);
      Alert.alert("Lỗi", "Không thể tạo vị trí làm việc");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>← Quay lại</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Tạo Vị trí Làm việc Mới</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tên vị trí làm việc *</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập tên vị trí làm việc"
              value={formData.positionName}
              onChangeText={(text) =>
                setFormData({ ...formData, positionName: text })
              }
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Trạng thái</Text>
            <View style={styles.statusContainer}>
              <TouchableOpacity
                style={[
                  styles.statusButton,
                  formData.positionStatus === Status.ACTIVE &&
                    styles.statusButtonActive,
                ]}
                onPress={() =>
                  setFormData({
                    ...formData,
                    positionStatus: Status.ACTIVE,
                  })
                }
              >
                <Text
                  style={[
                    styles.statusButtonText,
                    formData.positionStatus === Status.ACTIVE &&
                      styles.statusButtonTextActive,
                  ]}
                >
                  Hoạt động
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.statusButton,
                  formData.positionStatus === Status.INACTIVE &&
                    styles.statusButtonActive,
                ]}
                onPress={() =>
                  setFormData({
                    ...formData,
                    positionStatus: Status.INACTIVE,
                  })
                }
              >
                <Text
                  style={[
                    styles.statusButtonText,
                    formData.positionStatus === Status.INACTIVE &&
                      styles.statusButtonTextActive,
                  ]}
                >
                  Không hoạt động
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mô tả *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Nhập mô tả vị trí làm việc"
              value={formData.description}
              onChangeText={(text) =>
                setFormData({ ...formData, description: text })
              }
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => router.back()}
            >
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.submitButton,
                loading && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text style={styles.submitButtonText}>
                {loading ? "Đang tạo..." : "Tạo mới"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    backgroundColor: "#666",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 16,
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  statusContainer: {
    flexDirection: "row",
    gap: 12,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  statusButtonActive: {
    backgroundColor: "#2196F3",
    borderColor: "#2196F3",
  },
  statusButtonText: {
    fontSize: 14,
    color: "#666",
  },
  statusButtonTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#666",
  },
  submitButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#4CAF50",
    alignItems: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#ccc",
  },
  submitButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
