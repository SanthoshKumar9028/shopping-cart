import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState = {
  showOutOfStock: true,
  min: 0,
  max: 1_00_000,
};

enum Values {
  MIN = 0,
  MAX = 1_00_000,
}

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setShowOutOfStock(state, { payload }: PayloadAction<boolean>) {
      state.showOutOfStock = payload;
    },
    setMin: {
      reducer(state, { payload }: PayloadAction<number>) {
        state.min = payload;
      },
      prepare(min: number) {
        return {
          payload: min < 0 ? 0 : min % Values.MAX,
        };
      },
    },
    setMax: {
      reducer(state, { payload }: PayloadAction<number>) {
        state.max = payload;
      },
      prepare(max: number) {
        max = Math.abs(max);
        return {
          payload: max > 1_00_000 ? 1_00_000 : max,
        };
      },
    },
  },
});

// actions
export const { setShowOutOfStock, setMax, setMin } = filterSlice.actions;

// selectors
export const selectShowOutOfStock = (state: RootState) =>
  state.filter.showOutOfStock;

export const selectMin = (state: RootState) => state.filter.min;

export const selectMax = (state: RootState) => state.filter.max;

export default filterSlice.reducer;
