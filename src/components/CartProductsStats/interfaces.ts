import {
  ISelectedProducts,
  ISelectedVariant,
} from "../../features/cart/interfaces";
import { IVariant } from "../../features/products/interfaces";

export interface ICartProductsStatsProps {
  products: ISelectedProducts[];
}

export type ProductInfoVariant = IVariant & ISelectedVariant;

export interface IProductStatsInfo {
  id: string;
  name: string;
  variants: ProductInfoVariant[];
}

export interface IProductPriceListProps {
  products: IProductStatsInfo[];
}

export interface IProductVariantsPriceTable {
  total: number;
  variants: ProductInfoVariant[];
}
