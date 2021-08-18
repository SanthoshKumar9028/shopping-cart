import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import {
  ICartState,
  PayloadSelectedVariant,
  ISelectedProducts,
} from "./interfaces";

const initialState: ICartState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, { payload }: PayloadSelectedVariant) {
      let product = state.products.find((p) => p.id === payload.id);

      if (!product) {
        state.products.push({
          id: payload.id,
          selectedVariants: [payload.variant],
        });
        return;
      }

      let existingVariant = product.selectedVariants.find(
        ({ type }) => type === payload.variant.type
      );

      if (existingVariant) {
        existingVariant.quantity += payload.variant.quantity;
      } else {
        product.selectedVariants.push(payload.variant);
      }
    },
    removeFromCart(state, { payload }: PayloadAction<{ id: string }>) {
      let index = state.products.findIndex((p) => p.id === payload.id);
      if (index !== -1) {
        state.products.splice(index, 1);
      }
    },

    setCartQuantity(state, { payload }: PayloadSelectedVariant) {
      let product = state.products.find((p) => p.id === payload.id);

      if (!product) {
        state.products.push({
          id: payload.id,
          selectedVariants: [payload.variant],
        });
        return;
      }

      let existingVariant = product.selectedVariants.find(
        ({ type }) => type === payload.variant.type
      );

      if (existingVariant) {
        existingVariant.quantity = payload.variant.quantity;
      } else {
        product.selectedVariants.push(payload.variant);
      }
    },
  },
});

// actions
export const { addToCart, removeFromCart, setCartQuantity } = cartSlice.actions;

//selectors
export const selectCartProducts = createSelector(
  [
    (state) => (state as RootState).products,
    (state) => (state as RootState).cart.products,
  ],
  (products, cartProducts) => {
    const selectedProducts: ISelectedProducts[] = [];

    // looping through the available cart product id
    for (let { id, selectedVariants } of cartProducts) {
      // if product id mathches with cart product id push it
      let product = products.find((p) => p.id === id);

      if (product) {
        selectedProducts.push({ ...product, selectedVariants });
      }
    }
    return selectedProducts;
  }
);

export default cartSlice.reducer;
