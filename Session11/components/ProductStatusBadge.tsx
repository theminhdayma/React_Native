import React from "react";
import { Text, StyleSheet } from "react-native";
import { ProductStatus } from "../types/Product";

export const statusConfig: Record<
  ProductStatus,
  { label: string; color: string }
> = {
  draft: { label: "Chưa bán", color: "#374151" },
  active: { label: "Đang bán", color: "#129649" },
  inactive: { label: "Ngừng bán", color: "#e53935" },
};

export default function ProductStatusBadge({
  status,
}: {
  status: ProductStatus;
}) {
  const s = statusConfig[status];
  return (
    <Text style={[styles.badge, { borderColor: s.color, color: s.color }]}>
      {s.label}
    </Text>
  );
}
const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontWeight: "bold",
    marginTop: 4,
    alignSelf: "flex-start",
  },
});
