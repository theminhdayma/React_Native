import AsyncStorage from "@react-native-async-storage/async-storage";
import { Employee, DUMMY_EMPLOYEES } from "../data/mockData";
export type { Employee };

const STORAGE_KEY = "employees_list_v1";

async function readAll(): Promise<Employee[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Employee[];
  } catch {
    return [];
  }
}

async function writeAll(list: Employee[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export async function getAllEmployees(): Promise<Employee[]> {
  const list = await readAll();
  return [...list].sort((a, b) =>
    (b.createdAt ?? "").localeCompare(a.createdAt ?? "")
  );
}

export async function seedIfEmpty(): Promise<void> {
  const list = await readAll();
  if (list.length === 0) {
    await writeAll(DUMMY_EMPLOYEES);
  }
}

export async function getEmployeeById(id: number): Promise<Employee | null> {
  const list = await readAll();
  return list.find((e) => e.id === id) ?? null;
}

export async function createEmployee(
  payload: Omit<Employee, "id" | "createdAt">
): Promise<Employee> {
  const list = await readAll();
  const id = Date.now();
  const createdAt = new Date().toISOString();
  const newEmp: Employee = { id, createdAt, ...payload } as Employee;
  const newList = [newEmp, ...list];
  await writeAll(newList);
  return newEmp;
}

export async function updateEmployee(
  id: number,
  updates: Partial<Employee>
): Promise<Employee | null> {
  const list = await readAll();
  let updated: Employee | null = null;
  const newList = list.map((e) => {
    if (e.id === id) {
      updated = { ...e, ...updates };
      return updated;
    }
    return e;
  });
  if (updated) {
    await writeAll(newList);
    return updated;
  }
  return null;
}

export async function deleteEmployee(id: number): Promise<boolean> {
  const list = await readAll();
  const newList = list.filter((e) => e.id !== id);
  if (newList.length === list.length) return false;
  await writeAll(newList);
  return true;
}
