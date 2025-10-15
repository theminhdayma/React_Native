import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import PositionForm from "../../../components/PositionForm";
import { usePositions } from "../../../hooks/usePositions";
import { Position } from "../../../types";

export default function AddPositionScreen() {
  const router = useRouter();
  const { addPosition } = usePositions();

  const handleAddPosition = async (
    data: Omit<Position, "id" | "createdAt">
  ) => {
    await addPosition(data);
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <PositionForm
        onSubmit={handleAddPosition}
        submitButtonText="Thêm vị trí"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
});
