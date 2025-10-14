import {
  deletePosition,
  getPositionById,
  updatePosition,
} from "@/apis/position.apis";
import { Status } from "@/enums/status.enum";
import {
  Position,
  UpdatePositionRequest,
} from "@/interfaces/position.interface";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
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

export default function PositionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [position, setPosition] = useState<Position | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UpdatePositionRequest>({
    positionName: "",
    positionStatus: Status.ACTIVE,
    description: "",
  });

  // Gọi API lấy thông tin chi tiết
  const fetchPositionDetail = async () => {
    try {
      setLoading(true);
      const response = await getPositionById(Number(id));

      // Kiểm tra response structure
      let positionData = response;
      if (response && typeof response === "object" && "data" in response) {
        positionData = (response as any).data;
      }

      setPosition(positionData);
      setFormData({
        positionName: positionData.positionName || "",
        positionStatus: positionData.positionStatus || Status.ACTIVE,
        description: positionData.description || "",
      });
    } catch (error) {
      console.error("Error fetching position detail:", error);
      Alert.alert("Lỗi", "Không thể tải thông tin vị trí làm việc");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!formData.positionName?.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập tên vị trí làm việc");
      return;
    }

    if (formData.positionName.trim().length < 2) {
      Alert.alert("Lỗi", "Tên vị trí làm việc phải có ít nhất 2 ký tự");
      return;
    }

    if (!formData.description?.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập mô tả");
      return;
    }

    if (formData.description.trim().length < 10) {
      Alert.alert("Lỗi", "Mô tả phải có ít nhất 10 ký tự");
      return;
    }

    try {
      setLoading(true);
      await updatePosition(Number(id), formData);
      Alert.alert("Thành công", "Cập nhật vị trí làm việc thành công");
      setIsEditing(false);
      fetchPositionDetail();
    } catch (error) {
      console.error("Error updating position:", error);
      Alert.alert("Lỗi", "Không thể cập nhật vị trí làm việc");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa vị trí làm việc này?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              await deletePosition(Number(id));
              Alert.alert("Thành công", "Xóa vị trí làm việc thành công", [
                { text: "OK", onPress: () => router.back() },
              ]);
            } catch (error) {
              console.error("Error deleting position:", error);
              Alert.alert("Lỗi", "Không thể xóa vị trí làm việc");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    if (id) {
      fetchPositionDetail();
    }
  }, [id]);

  if (loading && !position) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Đang tải...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!position) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Không tìm thấy vị trí làm việc</Text>
        </View>
      </SafeAreaView>
    );
  }

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
          <Text style={styles.title}>
            {isEditing
              ? "Chỉnh sửa Vị trí Làm việc"
              : "Chi tiết Vị trí Làm việc"}
          </Text>
          {!isEditing && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.editButtonText}>Chỉnh sửa</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.content}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tên vị trí làm việc</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={formData.positionName}
                onChangeText={(text) =>
                  setFormData({ ...formData, positionName: text })
                }
              />
            ) : (
              <Text style={styles.value}>
                {position?.positionName || "Không có dữ liệu"}
              </Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Trạng thái</Text>
            {isEditing ? (
              <View style={styles.statusContainer}>
                <TouchableOpacity
                  style={[
                    styles.statusButton,
                    formData.positionStatus === Status.ACTIVE &&
                      styles.statusButtonActive,
                  ]}
                  onPress={() =>
                    setFormData({ ...formData, positionStatus: Status.ACTIVE })
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
            ) : (
              <Text
                style={[
                  styles.statusValue,
                  {
                    color:
                      position?.positionStatus === "ACTIVE"
                        ? "#4CAF50"
                        : "#F44336",
                  },
                ]}
              >
                {position?.positionStatus === "ACTIVE"
                  ? "Hoạt động"
                  : "Không hoạt động"}
              </Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mô tả</Text>
            {isEditing ? (
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(text) =>
                  setFormData({ ...formData, description: text })
                }
                multiline
                numberOfLines={4}
              />
            ) : (
              <Text style={styles.value}>
                {position?.description || "Không có dữ liệu"}
              </Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ngày tạo</Text>
            <Text style={styles.value}>
              {position?.createdAt
                ? new Date(position.createdAt).toLocaleDateString("vi-VN")
                : "Không có dữ liệu"}
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ngày cập nhật</Text>
            <Text style={styles.value}>
              {position?.updatedAt
                ? new Date(position.updatedAt).toLocaleDateString("vi-VN")
                : "Không có dữ liệu"}
            </Text>
          </View>

          {isEditing ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setIsEditing(false);
                  setFormData({
                    positionName: position?.positionName || "",
                    positionStatus: position?.positionStatus || Status.ACTIVE,
                    description: position?.description || "",
                  });
                }}
              >
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  loading && styles.submitButtonDisabled,
                ]}
                onPress={handleUpdate}
                disabled={loading}
              >
                <Text style={styles.submitButtonText}>
                  {loading ? "Đang cập nhật..." : "Cập nhật"}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <Text style={styles.deleteButtonText}>Xóa vị trí làm việc</Text>
            </TouchableOpacity>
          )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#999",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    textAlign: "center",
  },
  editButton: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  content: {
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
  value: {
    fontSize: 16,
    color: "#666",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
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
  statusValue: {
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
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
  deleteButton: {
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#F44336",
    alignItems: "center",
    marginTop: 20,
  },
  deleteButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
