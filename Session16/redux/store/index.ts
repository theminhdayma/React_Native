import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../slices/counter.slice";
import randomSlice from "../slices/random.slice";
import modeSlice from "../slices/mode.slice";
import favoriteSlice from "../slices/favorite.slice";
import languageSlice from "../slices/language.slice";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    random: randomSlice,
    mode: modeSlice,
    favorite: favoriteSlice,
    language: languageSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
