import { PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../products/interfaces";

export interface ISelectedVariant {
  type: string;
  quantity: number;
}

export interface ISelectedProducts extends IProduct {
  selectedVariants: ISelectedVariant[];
}

export interface ICartProduct {
  id: string;
  selectedVariants: ISelectedVariant[];
}

export interface ICartState {
  products: ICartProduct[];
}

// payloads
export type PayloadSelectedVariant = PayloadAction<{
  id: string;
  variant: ISelectedVariant;
}>;

export type RemoveFromCartPayload = PayloadAction<{ id: string }>;

export type RemoveVariantFromCartPayload = PayloadAction<{
  id: string;
  variant: { type: string };
}>;
