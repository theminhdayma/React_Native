import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, Alert } from "react-native";
import EmployeeForm from "@/components/EmployeeForm";
import { useLocalSearchParams } from "expo-router";
import {
  getEmployeeById,
  updateEmployee,
  Employee,
} from "@/services/employee.repo";
import { useRouter } from "expo-router";

export default function EditEmployeeScreen() {
  const params = useLocalSearchParams();
  const id = Number(params.id);
  const [initialData, setInitialData] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const e = await getEmployeeById(id);
      if (mounted) setInitialData(e);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  const onSubmit = async (payload: any) => {
    try {
      await updateEmployee(id, {
        employeeCode: payload.employeeCode,
        employeeName: payload.employeeName,
        phoneNumber: payload.phoneNumber ?? "",
        gender: payload.gender,
        dateBirth: payload.dateBirth,
        positionId: payload.positionId ?? 0,
        positionName: "",
      } as any);
      Alert.alert("Thành công", "Đã cập nhật nhân viên");
      router.back();
    } catch (e) {
      Alert.alert("Lỗi", "Không cập nhật được nhân viên");
    }
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} />;
  if (!initialData)
    return (
      <View style={{ padding: 16 }}>
        <Text>Nhân viên không tồn tại</Text>
      </View>
    );

  return <EmployeeForm initialData={initialData} onSubmit={onSubmit} />;
}
