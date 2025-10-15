import { createSlice } from "@reduxjs/toolkit";

type SetFavoritePayload = { id: number; favorite: boolean };

const initialState = {
  users: [
    { id: 1, name: "Nguyễn Văn A", favorite: true },
    { id: 2, name: "Nguyễn Văn B", favorite: true },
    { id: 3, name: "Nguyễn Văn C", favorite: false },
    { id: 4, name: "Nguyễn Văn D", favorite: false },
    { id: 5, name: "Trần Thị E", favorite: false },
  ],
};

const favoriteSlice = createSlice({
  name: "favoriteUsers",
  initialState,
  reducers: {
    setFavorite: (state, action) => {
      const { id, favorite } = action.payload;
      const target = state.users.find((u) => u.id === id);
      if (target) {
        target.favorite = favorite;
      }
    },
    setFavoritesBatch: (state, action) => {
      action.payload.forEach(({ id, favorite }: SetFavoritePayload) => {
        const target = state.users.find((u) => u.id === id);
        if (target) target.favorite = favorite;
      });
    },
  },
});

export const { setFavorite, setFavoritesBatch } = favoriteSlice.actions;
export default favoriteSlice.reducer;
