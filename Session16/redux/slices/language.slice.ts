import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locale: "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setEnglish: (state) => {
      state.locale = "en";
    },
    setVietnamese: (state) => {
      state.locale = "vi";
    },
    toggleLanguage: (state) => {
      state.locale = state.locale === "en" ? "vi" : "en";
    },
  },
});

export const { setEnglish, setVietnamese, toggleLanguage } =
  languageSlice.actions;
export default languageSlice.reducer;
