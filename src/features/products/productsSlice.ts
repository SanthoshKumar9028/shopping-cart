import { createSlice, nanoid } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { IProduct } from "./interfaces";

const initialState: IProduct[] = [
  {
    id: nanoid(),
    name: "wooden table",
    prize: 123.0,
    totalQuantity: 4,
    isDivisible: false,
    imageUrl: "/images/wooden-table.jpg",
    description:
      "lorem text for product. lorem text for product. lorem text for product. ",
  },
  {
    id: nanoid(),
    name: "wooden sofa set",
    prize: 123.0,
    totalQuantity: 4,
    isDivisible: false,
    imageUrl: "/images/wooden-sofa-set.jpg",
    description:
      "lorem text for product. lorem text for product. lorem text for product. ",
  },
  {
    id: nanoid(),
    name: "three door wardrobe",
    prize: 123.0,
    totalQuantity: 4,
    isDivisible: false,
    imageUrl: "/images/special-three-door-wardrobe.jpg",
    description:
      "lorem text for product. lorem text for product. lorem text for product. ",
  },
  {
    id: nanoid(),
    name: "wooden student chair",
    prize: 123.0,
    totalQuantity: 4,
    isDivisible: false,
    imageUrl: "/images/wooden-student-chair.jpg",
    description:
      "lorem text for product. lorem text for product. lorem text for product. ",
  },
];

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    doNothing(state) {
      return state;
    },
  },
});

// actions
export const { doNothing } = productsSlice.actions;

// selectors
export const selectAllProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
