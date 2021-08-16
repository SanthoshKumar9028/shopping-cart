import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { IProduct } from "./interfaces";

const initialState: IProduct[] = [
  {
    id: nanoid(),
    name: "wooden table",
    prize: 999.0,
    totalQuantity: 15,
    isDivisible: false,
    imageUrl: "/images/wooden-table.jpg",
    description:
      "lorem text for product. lorem text for product. lorem text for product. ",
  },
  {
    id: nanoid(),
    name: "wooden sofa set",
    prize: 3200.0,
    totalQuantity: 30,
    isDivisible: false,
    imageUrl: "/images/wooden-sofa-set.jpg",
    description:
      "lorem text for product. lorem text for product. lorem text for product. ",
  },
  {
    id: nanoid(),
    name: "three door wardrobe",
    prize: 4000.0,
    totalQuantity: 0,
    isDivisible: false,
    imageUrl: "/images/special-three-door-wardrobe.jpg",
    description:
      "lorem text for product. lorem text for product. lorem text for product. ",
  },
  {
    id: nanoid(),
    name: "wooden student chair",
    prize: 500.0,
    totalQuantity: 15,
    isDivisible: false,
    imageUrl: "/images/wooden-student-chair.jpg",
    description:
      "lorem text for product. lorem text for product. lorem text for product. ",
  },
];

type ReduceQuantityPayloadAction = PayloadAction<{
  id: string;
  quantity: number;
}>;

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reduceQuantity(state, action: ReduceQuantityPayloadAction) {
      const { id, quantity } = action.payload;
      let product = state.find((p) => p.id === id);
      if (product) {
        product.totalQuantity -= quantity;
      }
    },
    increaseQuantity(state, action: ReduceQuantityPayloadAction) {
      const { id, quantity } = action.payload;
      let product = state.find((p) => p.id === id);
      if (product) {
        product.totalQuantity += quantity;
      }
    },
  },
});

// actions
export const { increaseQuantity, reduceQuantity } = productsSlice.actions;

// selectors
export const selectAllProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
