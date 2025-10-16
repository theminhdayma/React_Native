import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { Position, PositionStatus } from "../types";
import { deletePositionById, updatePositionById } from "@/apis/position.api";

const STORAGE_KEY = "@positions";

export const usePositions = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);

  const getPositions = useCallback(async () => {
    try {
      setLoading(true);
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      const positionsFromStorage =
        jsonValue != null ? JSON.parse(jsonValue) : [];
      setPositions(positionsFromStorage);
    } catch (e) {
      console.error("Lỗi khi tải danh sách vị trí:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPositions();
  }, [getPositions]);

  const savePositionsToStorage = async (positionsToSave: Position[]) => {
    try {
      const jsonValue = JSON.stringify(positionsToSave);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error("Lỗi khi lưu danh sách vị trí:", e);
    }
  };

  const addPosition = async (position: Omit<Position, "id" | "createdAt">) => {
    const newPosition: Position = {
      ...position,
      id: Date.now(), // Dùng timestamp làm id duy nhất
      createdAt: new Date().toISOString(),
    };
    const updatedPositions = [...positions, newPosition];
    setPositions(updatedPositions);
    await savePositionsToStorage(updatedPositions);
  };

  // const updatePosition = async (updatedPosition: Position) => {
  //   const updatedPositions = positions.map((p) =>
  //     p.id === updatedPosition.id ? updatedPosition : p
  //   );
  //   setPositions(updatedPositions);
  //   await savePositionsToStorage(updatedPositions);
  // };

  // const deletePosition = async (id: number) => {
  //   const updatedPositions = positions.filter((p) => p.id !== id);
  //   setPositions(updatedPositions);
  //   await savePositionsToStorage(updatedPositions);
  // };

  const getPositionById = (id: number): Position | undefined => {
    return positions.find((p) => p.id === id);
  };

  const togglePositionStatus = async (id: number) => {
    const positionToUpdate = positions.find((p) => p.id === id);
    if (positionToUpdate) {
      const newStatus: PositionStatus =
        positionToUpdate.positionStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      const updatedPosition = {
        ...positionToUpdate,
        positionStatus: newStatus,
      };
      await updatePosition(updatedPosition);
    }
  };

  //  const deletePosition = async (id: number) => {
  //   try {
  //     await deletePositionById(id);
  //     setPositions((prev) => prev.filter((p) => p.id !== id));
  //   } catch (error) {
  //     console.error("Lỗi khi xóa vị trí:", error);
      
  //   }
    
  // };

  // //  Cập nhật trạng thái hoặc sửa
  // const updatePosition = async (updatedPosition: Position) => {
  //   try {
  //     await updatePositionById(updatedPosition, updatedPosition.id);
  //     setPositions((prev) =>
  //       prev.map((p) => (p.id === updatedPosition.id ? updatedPosition : p))
  //     );
  //   } catch (error) {
  //     console.error("Lỗi khi cập nhật vị trí:", error);
  //   }
  // };

  return {
    positions,
    loading,
    addPosition,
    updatePosition,
    deletePosition,
    getPositionById,
    togglePositionStatus,
    refreshPositions: getPositions,
  };
};
