import React from "react";
import EmployeeForm from "../../../components/EmployeeForm";
import { createEmployee } from "@/services/employee.repo";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

export default function AddEmployeeScreen() {
  const router = useRouter();

  const onSubmit = async (payload: any) => {
    try {
      await createEmployee({
        employeeCode: payload.employeeCode,
        employeeName: payload.employeeName,
        phoneNumber: payload.phoneNumber ?? "",
        gender: payload.gender,
        dateBirth: payload.dateBirth,
        positionId: payload.positionId ?? 0,
        positionName: "",
      } as any);
      Alert.alert("Thành công", "Đã thêm nhân viên");
      router.back();
    } catch (e) {
      Alert.alert("Lỗi", "Không thêm được nhân viên");
    }
  };

  return <EmployeeForm onSubmit={onSubmit} />;
}
