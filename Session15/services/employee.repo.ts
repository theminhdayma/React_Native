import * as api from "@/apis/employee.apis";
import * as storage from "./employee.service";
import { Employee } from "../data/mockData";

/**
 * Repository façade: try backend API for reads when available,
 * otherwise fall back to local AsyncStorage implementation.
 */

export type { Employee } from "../data/mockData";

export async function getAllEmployees(): Promise<Employee[]> {
  try {
    if (typeof api.getAllEmployee === "function") {
      const res = await api.getAllEmployee();
      // api.getAllEmployee may return { data: [...] } or an array directly
      const list: any[] = Array.isArray(res) ? res : res?.data ?? [];
      // map to Employee shape conservatively
      return list.map(
        (it: any, idx: number) =>
          ({
            id: Number(it.id ?? it.employeeId ?? Date.now() + idx),
            employeeCode: it.employeeCode ?? it.code ?? "",
            employeeName: it.employeeName ?? it.name ?? it.fullName ?? "",
            phoneNumber: it.phoneNumber ?? it.phone ?? "",
            gender: it.gender ?? it.sex ?? "MALE",
            dateBirth: it.dateBirth ?? it.dob ?? "",
            createdAt:
              it.createdAt ?? it.created_at ?? new Date().toISOString(),
            positionId: it.positionId ?? it.position_id ?? 0,
            positionName: it.positionName ?? it.position_name ?? "",
          } as Employee)
      );
    }
  } catch (e) {
    console.warn("API getAllEmployee failed, falling back to storage", e);
  }
  return storage.getAllEmployees();
}

export const seedIfEmpty = storage.seedIfEmpty;
export const getEmployeeById = storage.getEmployeeById;
export const createEmployee = storage.createEmployee;
export const updateEmployee = storage.updateEmployee;
export const deleteEmployee = storage.deleteEmployee;
