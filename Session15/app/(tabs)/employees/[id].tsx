import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, Link, useRouter } from "expo-router";
import {
  getEmployeeById,
  deleteEmployee,
  Employee,
} from "@/services/employee.repo";

const InfoRow = ({ label, value }: { label: string; value?: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value ?? "-"}</Text>
  </View>
);

export default function EmployeeDetailScreen() {
  const params = useLocalSearchParams();
  const id = Number(params.id);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const e = await getEmployeeById(id);
      if (mounted) setEmployee(e);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  const onDelete = () => {
    if (!employee) return;
    Alert.alert("Xác nhận", `Bạn có muốn xóa \"${employee.employeeName}\"?`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          await deleteEmployee(employee.id);
          router.replace("./");
        },
      },
    ]);
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} />;
  if (!employee)
    return (
      <View style={{ padding: 16 }}>
        <Text>Nhân viên không tồn tại</Text>
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <InfoRow label="Mã nhân viên" value={employee.employeeCode} />
        <InfoRow label="Họ và tên" value={employee.employeeName} />
        <InfoRow label="Số điện thoại" value={employee.phoneNumber} />
        <InfoRow label="Giới tính" value={employee.gender} />
        <InfoRow label="Ngày sinh" value={employee.dateBirth} />
        <InfoRow label="Vị trí" value={employee.positionName} />
        <InfoRow
          label="Ngày tạo"
          value={
            employee.createdAt
              ? new Date(employee.createdAt).toLocaleDateString("vi-VN")
              : undefined
          }
        />

        <View style={{ flexDirection: "row", marginTop: 12 }}>
          <Link href={`./edit/${employee.id}`} asChild>
            <TouchableOpacity style={styles.editBtn}>
              <Text style={{ color: "#fff" }}>Sửa</Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity
            onPress={onDelete}
            style={[
              styles.editBtn,
              { backgroundColor: "#ef4444", marginLeft: 8 },
            ]}
          >
            <Text style={{ color: "#fff" }}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 15 },
  card: { backgroundColor: "white", borderRadius: 10, padding: 20 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: { fontSize: 16, color: "gray" },
  value: { fontSize: 16, fontWeight: "bold" },
  editBtn: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
});
