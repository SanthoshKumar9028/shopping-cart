import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import productsSlice from "../features/products/productsSlice";
import cartSlice from "../features/cart/cartSlice";
import filterSlice from "../features/filter/filterSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
    filter: filterSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
