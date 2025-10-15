import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { decrease, increase } from "@/redux/slices/counter.slice";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Counter() {
  // Lấy dữ liệu từ trong store
  const { value } = useAppSelector((state) => state.counter);

  // Bắn dispatch
  const dispatch = useAppDispatch();

  const handleIncrease = () => {
    // Bắn dispatch từ component vào trong reducer (slice)
    dispatch(increase());
  };

  const handleDecrease = () => {
    // Bắn dispatch từ component vào trong reducer (slice)
    dispatch(decrease());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Counter: {value}</Text>
      <Button title="Increase" onPress={handleIncrease} />
      <Button title="Decrease" onPress={handleDecrease} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 30,
    fontWeight: 700,
  },
});
