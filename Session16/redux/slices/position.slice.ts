// src/redux/positionSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Position {
  id: number;
  positionName: string;
  positionStatus: string;
}

export interface PositionState {
  list: Position[];
  loading: boolean;
  error: string | null;
}

const initialState: PositionState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchPositions = createAsyncThunk<
  Position[],
  void,
  { rejectValue: string }
>("positions/fetchPositions", async (_, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    const res = await axios.get(
      "https://nest-api-public.ixe-agent.io.vn/api/v1/positions",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data?.message || "API error");
    }
    return rejectWithValue("An unknown error occurred");
  }
});

const positionSlice = createSlice({
  name: "positions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPositions.pending, (state: PositionState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPositions.fulfilled,
        (state: PositionState, action: PayloadAction<Position[]>) => {
          state.list = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchPositions.rejected,
        (state: PositionState, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? "Unknown error";
        }
      );
  },
});

export default positionSlice.reducer;
export const selectPositions = (state: { positions: PositionState }) =>
  state.positions.list;
export const selectPositionsLoading = (state: { positions: PositionState }) =>
  state.positions.loading;
export const selectPositionsError = (state: { positions: PositionState }) =>
  state.positions.error;
