import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { IProduct } from "../products/interfaces";
import { CartState, CartProduct } from "./interfaces";

const initialState: CartState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, { payload }: PayloadAction<CartProduct>) {
      let product = state.products.find((p) => p.id === payload.id);
      if (product) {
        product.quantity += payload.quantity;
        return;
      }
      state.products.push(payload);
    },
    removeFromCart(state, { payload }: PayloadAction<{ id: string }>) {
      let index = state.products.findIndex((p) => p.id === payload.id);
      if (index !== -1) {
        state.products.splice(index, 1);
      }
    },
    setCartQuantity(state, { payload }: PayloadAction<CartProduct>) {
      let index = state.products.findIndex((p) => p.id === payload.id);
      if (index !== -1) {
        state.products[index].quantity = payload.quantity;
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
    const selectedProducts: (IProduct & { quantity: number })[] = [];

    // looping through the available art product id
    for (let { id, quantity } of cartProducts) {
      // if product id mathches with cart product id push it
      let product = products.find((p) => p.id === id);

      if (product) {
        selectedProducts.push({ ...product, quantity });
      }
    }
    return selectedProducts;
  }
);

export default cartSlice.reducer;
