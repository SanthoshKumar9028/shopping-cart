import { nanoid } from "@reduxjs/toolkit";
import { IProduct } from "./interfaces";

export const initialState: IProduct[] = [
  {
    id: nanoid(),
    name: "wooden table",
    variants: [
      {
        type: "normal",
        price: 999.0,
        totalQuantity: 10,
        imageUrl: "/images/wooden-table.jpg",
      },
      {
        type: "with scrolling wheel",
        price: 1200.0,
        totalQuantity: 3,
        imageUrl: "/images/wooden-table.jpg",
      },
      {
        type: "with scrolling wheel and varnish",
        price: 1300.0,
        totalQuantity: 1,
        imageUrl: "/images/wooden-table.jpg",
      },
    ],
    isDivisible: false,
    description:
      "lorem text for product. lorem text for product. lorem text for product. ",
  },
  {
    id: nanoid(),
    name: "wooden sofa set",
    variants: [
      {
        type: "normal",
        price: 3200.0,
        totalQuantity: 4,
        imageUrl: "/images/wooden-sofa-set.jpg",
      },
      {
        type: "with billow set",
        price: 3500.0,
        totalQuantity: 2,
        imageUrl: "/images/wooden-sofa-set.jpg",
      },
    ],
    isDivisible: false,
    description:
      "lorem text for product. lorem text for product. lorem text for product. ",
  },
  {
    id: nanoid(),
    name: "three door wardrobe",
    variants: [
      {
        type: "normal",
        price: 4000.0,
        totalQuantity: 4,
        imageUrl: "/images/special-three-door-wardrobe.jpg",
      },
      {
        type: "without glass door",
        price: 3500.0,
        totalQuantity: 2,
        imageUrl: "/images/special-three-door-wardrobe.jpg",
      },
    ],
    isDivisible: false,
    description:
      "lorem text for product. lorem text for product. lorem text for product. ",
  },
  {
    id: nanoid(),
    name: "wooden student chair",
    variants: [
      {
        type: "normal",
        price: 500.0,
        totalQuantity: 15,
        imageUrl: "/images/wooden-student-chair.jpg",
      },
      {
        type: "with cushion",
        price: 600.0,
        totalQuantity: 6,
        imageUrl: "/images/wooden-student-chair.jpg",
      },
      {
        type: "with scrolling wheel",
        price: 650.0,
        totalQuantity: 3,
        imageUrl: "/images/wooden-student-chair.jpg",
      },
      {
        type: "with scrolling wheel and varnish",
        price: 890.0,
        totalQuantity: 1,
        imageUrl: "/images/wooden-student-chair.jpg",
      },
    ],
    isDivisible: false,
    description:
      "lorem text for product. lorem text for product. lorem text for product. ",
  },
];
