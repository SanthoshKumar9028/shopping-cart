import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { initialState } from "./initialState";

type PayloadVariant = PayloadAction<{
  id: string;
  variant: { type: string; quantity: number };
}>;

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reduceQuantity(state, { payload }: PayloadVariant) {
      const {
        id,
        variant: { type, quantity },
      } = payload;

      let product = state.find((p) => p.id === id);
      let variant = product?.variants.find((variant) => variant.type === type);

      if (variant) {
        variant.totalQuantity -= quantity;
      }
    },
    increaseQuantity(state, { payload }: PayloadVariant) {
      const {
        id,
        variant: { type, quantity },
      } = payload;

      let product = state.find((p) => p.id === id);
      let variant = product?.variants.find((variant) => variant.type === type);

      if (variant) {
        variant.totalQuantity += quantity;
      }
    },
  },
});

// actions
export const { increaseQuantity, reduceQuantity } = productsSlice.actions;

// selectors
export const selectAllProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
