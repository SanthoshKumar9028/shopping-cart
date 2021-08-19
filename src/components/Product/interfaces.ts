import { ISelectedProducts } from "../../features/cart/interfaces";
import { IProduct, IVariant } from "../../features/products/interfaces";

export interface IProductProps {
  product: IProduct;
}

export interface ICartProductProps {
  product: IProduct & ISelectedProducts;
}

export interface IProductDetailsProps {
  product: IProduct;
  currentVariant: IVariant;
}

export interface IVariantsSelectProps {
  variants: IVariant[];
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export interface IProductFooterCounterProps {
  min: number;
  max: number;
  value: number;
  onCounterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIncClick: React.MouseEventHandler<HTMLButtonElement>;
  onDecClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface IValidateQuantityOptions {
  value: number;
  min: number;
  max: number;
  next: Function;
}
