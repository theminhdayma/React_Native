import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product, Product2 } from "../types/Product";

const KEY = "products";
export async function getProducts(): Promise<Product2[]> {
  const json = await AsyncStorage.getItem(KEY);
  return json ? JSON.parse(json) : [];
}
export async function saveProducts(items: Product2[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(items));
}
export async function addProduct(p: Omit<Product2, "id">) {
  const list = await getProducts();
  const newP = { ...p, id: Date.now().toString() };
  await saveProducts([newP, ...list]);
  return newP;
}
export async function updateProduct(id: string, patch: Partial<Product>) {
  const list = await getProducts();
  await saveProducts(list.map((i) => (i.id === id ? { ...i, ...patch } : i)));
}
export async function removeProduct(id: string) {
  const list = await getProducts();
  await saveProducts(list.filter((i) => i.id !== id));
}
export async function getProductById(id: string): Promise<Product2 | undefined> {
  const list = await getProducts();
  return list.find((i) => i.id === id);
}
