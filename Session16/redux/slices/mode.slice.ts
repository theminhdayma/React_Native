import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "grid",
};

const modeSlice = createSlice({
  name: "displayMode",
  initialState,
  reducers: {
    setGridMode: (state) => {
      state.mode = "grid";
    },
    setListMode: (state) => {
      state.mode = "list";
    },
  },
});

export const { setGridMode, setListMode } = modeSlice.actions;
export default modeSlice.reducer;
