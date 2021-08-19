import { createSelector, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import {
  ICartState,
  PayloadSelectedVariant,
  ISelectedProducts,
  RemoveFromCartPayload,
  RemoveVariantFromCartPayload,
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

    removeFromCart(state, { payload }: RemoveFromCartPayload) {
      let index = state.products.findIndex((p) => p.id === payload.id);
      if (index === -1) return;

      state.products.splice(index, 1);
    },

    removeVariantFromCart(
      { products },
      { payload }: RemoveVariantFromCartPayload
    ) {
      let productIndex = products.findIndex((p) => p.id === payload.id);
      if (productIndex === -1) return;

      const product = products[productIndex];
      let variantIndex = product.selectedVariants.findIndex(
        (variant) => variant.type === payload.variant.type
      );

      if (variantIndex === -1) return;
      product.selectedVariants.splice(variantIndex, 1);

      if (products[productIndex].selectedVariants.length === 0) {
        products.splice(productIndex, 1);
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
export const {
  addToCart,
  removeFromCart,
  removeVariantFromCart,
  setCartQuantity,
} = cartSlice.actions;

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
