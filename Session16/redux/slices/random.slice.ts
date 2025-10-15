import { createSlice } from "@reduxjs/toolkit";
import counterSlice from "./counter.slice";

const initialState: { value: number[] } = {
  value: [],
};

const randomSlice = createSlice({
  name: "random",
  initialState,
  // Hàm xử lý các tác vụ đồng bộ (cập nhật lại state -> Không gọi API)
  reducers: {
    // Định nghĩa các phương thức đồng bộ
    random(state) {
        state.value = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));
    },
  },
  // Hàm xử lý các tác vụ bất đồng bộ (cập nhật lại state -> Gọi API)
  extraReducers(builder) {},
});

// Export các thông tin của counterSlice ra bên ngoài
export default randomSlice.reducer; // Làm vậy để bên ngoài hiểu đây là 1 reducer

// Export các phương thức đồng bộ
export const { random } = randomSlice.actions;
