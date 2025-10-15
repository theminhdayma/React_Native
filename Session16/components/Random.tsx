import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { random } from "@/redux/slices/random.slice";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Random() {
  // Lấy dữ liệu từ trong store
  const { value } = useAppSelector((state) => state.random);

  // Bắn dispatch
  const dispatch = useAppDispatch();

  const handleRandom = () => {
    // Bắn dispatch từ component vào trong reducer (slice)
    dispatch(random());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Random: {JSON.stringify(value)}</Text>
      <Button title="Random" onPress={handleRandom} />
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
