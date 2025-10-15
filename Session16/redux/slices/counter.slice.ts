import { createSlice } from "@reduxjs/toolkit";

const initialState: { value: number } = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  // Hàm xử lý các tác vụ đồng bộ (cập nhật lại state -> Không gọi API)
  reducers: {
    // Định nghĩa các phương thức đồng bộ
    increase(state) {
      state.value += 1;
    },

    decrease(state) {
      state.value -= 1;
    },
  },
  // Hàm xử lý các tác vụ bất đồng bộ (cập nhật lại state -> Gọi API)
  extraReducers(builder) {},
});

// Export các thông tin của counterSlice ra bên ngoài
export default counterSlice.reducer; // Làm vậy để bên ngoài hiểu đây là 1 reducer

// Export các phương thức đồng bộ
export const { decrease, increase } = counterSlice.actions;